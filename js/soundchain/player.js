/**
 * Main player widget hosting tracks, playlist and options
 */
define([
    'collections/tracks'
], function(TracksCollection) {
    return {
        playing : false,
        currentTrack : null,
        playlist : null,
        history : null,
        shuffle : false,
        repeat : false,

        /**
         * Constructor
         * @returns {*}
         */
        initialize : function()
        {
            var Playlist = new TracksCollection();                         // There's just one Playlist right now
            Playlist.localStorage = new Backbone.LocalStorage("Playlist"); // We'll save it to local storage
            Playlist.fetch();                                              // Get existing data

            // The playlist should be saved automagically
            Playlist.on('add remove', function(item, playlist, event) {
                playlist.each(function(track) {
                    track.save();
                });
            });

            // For later use move it to the module scope
            this.playlist = Playlist;

            // There is one tracks collection for the history
            var History = new TracksCollection();
            this.history = History;

            // Setup related views
            require(['views/playlist', 'views/playControls'], function(PlaylistView, PlayControlsView) {
                var Playlist = new PlaylistView();
                var PlayControls = new PlayControlsView();
            });

            return this;
        },

        /**
         * Playing mechanics
         * @param trackId
         * @returns {boolean}
         */
        play : function(trackId)
        {
            var that    = this;

            // Which track to play: Get a track id
            if(trackId) {
                var trackId = trackId;                                      // Specific track is given
            } else if(this.getPlaylist().getElement()) {
                var trackId = this.getPlaylist().getElement().get('id');    // If not check for current PL item
            } else {
                var trackId = 293;                                          // Play SoundCloud API example :)
            }

            // Do not play current track again if already playing
            if(this.playing && this.currentTrackId == trackId) {
                return false;
            }

            // If track id is in playlist mark it as the current item
            this.getPlaylist().each(function(track) {
                if(trackId == track.get('id')) {
                    that.getPlaylist().setElement(track);

                    // Mark current playlist item as active
                    // @TODO Should be using/moved to a view
                    $('#queue-list a.list-group-item').removeClass('active');
                    $('#queue-list a.list-group-item.track-id-' + track.get('id')).addClass('active');
                }
            });

            // Stop everything before a new track is played
            this.stop();

            // SC stream api
            SC.stream("/tracks/" + trackId, function(sound) {
                that.currentTrack = sound;
                that.currentTrackId = trackId;
                that.currentTrack.play({
                    onfinish : function() {
                        that.playNext();
                    }
                });
            });

            // Toggle play button
            $('a.audio-toggle')
                .find('span.glyphicon')
                .removeClass('glyphicon-play')
                .addClass('glyphicon-stop');

            this.playing = true;
        },

        /**
         * Stopping mechanics
         */
        stop : function()
        {
            $('a.audio-toggle')
                .find('span.glyphicon')
                .removeClass('glyphicon-stop')
                .addClass('glyphicon-play');

            SC.streamStopAll();

            this.playing = false;
            this.currentTrack = null;
            this.currentTrackId = null;
        },

        /**
         * Support to pause playback
         */
        pause : function()
        {
            if(this.currentTrack) {
                this.currentTrack.pause();
            }
        },

        /**
         * Resume playback if it was paused
         */
        resume : function()
        {
            if(this.currentTrack && !this.currentTrack.paused) {
                this.currentTrack.play();
            }
        },

        /**
         * Toggle playback depending on current state
         */
        toggle : function()
        {
            if(this.playing) {
                this.stop();
            } else {
                this.play();
            }
        },

        /**
         * Fast backward to previous song in playlist
         * If shuffle is enabled a random item will be picked except the one currently playing
         */
        playLast : function()
        {
            if(this.getPlaylist().length > 1) {
                if(this.getShuffle()) {
                    var random = this.getPlaylist().indexOf(this.getPlaylist().getElement());
                    while(this.getPlaylist().at(random).get('id') == this.currentTrackId) {
                        random = _.random(0, this.getPlaylist().length - 1);
                    }
                    this.play(this.getPlaylist().setElement(this.getPlaylist().at(random)));
                } else {
                    this.play(this.getPlaylist().prev(this.getRepeat()).getElement().get('id'));
                }
            }
        },

        /**
         * Fast forward to next song in playlist
         * If shuffle is enabled a random item will be picked except the one currently playing
         */
        playNext : function()
        {
            if(this.getPlaylist().length > 1) {
                if(this.getShuffle()) {
                    var random = this.getPlaylist().indexOf(this.getPlaylist().getElement());
                    while(this.getPlaylist().at(random).get('id') == this.currentTrackId) {
                        random = _.random(0, this.getPlaylist().length - 1);
                    }
                    this.play(this.getPlaylist().setElement(this.getPlaylist().at(random)));
                } else {
                    this.play(this.getPlaylist().next(this.getRepeat()).getElement().get('id'));
                }
            }
        },

        /**
         * Get playlist singleton
         * @returns collection
         */
        getPlaylist : function()
        {
            return this.playlist;
        },

        /**
         * Get history singleton
         * @returns collection
         */
        getHistory : function()
        {
            return this.history;
        },

        /**
         * Toggle shuffle playback
         * @param onOrOff
         * @returns {*}
         */
        setShuffle : function(onOrOff)
        {
            this.shuffle = onOrOff;
            return this;
        },

        /**
         * Shuffle enabled?
         * @returns {boolean}
         */
        getShuffle : function()
        {
            return this.shuffle;
        },

        /**
         * Toggle repeat mode
         * @param onOrOff
         * @returns {*}
         */
        setRepeat : function(onOrOff)
        {
            this.repeat = onOrOff;
            return this;
        },

        /**
         * Repeat mode enabled?
         * @returns {boolean}
         */
        getRepeat : function()
        {
            return this.repeat;
        }
    };
});