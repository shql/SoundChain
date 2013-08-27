/**
 * Backbone view for the playlist
 * The view gets updated everytime the playlist is changed (of course)
 */
define([
    'player',
    'views/playlistItem'
], function(Player, PlaylistItemView) {
    var PlaylistView = Backbone.View.extend({

        el : $('#queue-list div.list-group'),

        events : {
            'click button.audio-toggle' : 'togglePlayback',
            'click button.audio-last' : 'playLast',
            'click button.audio-next' : 'playNext'
        },

        initialize : function() {
            var that = this;

            // Watch playlist track collection for changes to update this view
            Player.getPlaylist().on('add remove', function() {
                that.render();
            });

            this.render();
        },

        render : function() {
            var that     = this;
            var Playlist = Player.getPlaylist();

            // Empty playlist items container
            that.$el.empty();

            // If playlist has elements...
            if(Playlist.length) {
                _.each(Playlist.models, function(track) {
                    // ... loop through the tracks and create a sub view
                    var playlistitem = new PlaylistItemView({
                        track : track
                    });
                    that.$el.append(playlistitem.$el);
                });

                // We enable drag n drop support for rearranging tracks in the playlist
                // We also support touch devices with the "touch punch" plugin!
                that.$el.sortable({
                    handle : 'button.handle',
                    cancel : '',
                    update : function(event, ui) {
                        var i = 0;
                        that.$el.find('a.list-group-item').each(function(key, element) {
                            // We reset the cIds of all tracks in the collection to represent the new playlist order
                            var trackId = $(element).data('track-id');
                            var track = Player.getPlaylist().findWhere({ id : trackId })
                            track.set({
                                cId : i
                            });
                            track.save();
                            i++;
                        });
                        // Update collection
                        Player.getPlaylist().sort();
                    }
                });
                that.$el.disableSelection();
            } else {
                // Show a "no items" item
                this.$el.append($('#empty-playlist > a').clone());
            }

            return this;
        }
    });

    return PlaylistView;
});