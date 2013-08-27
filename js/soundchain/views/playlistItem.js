/**
 * Backbone view for the playlist items
 * Nothing special here... just the functionality for the item buttons
 */
define([
    'player'
], function(Player) {
    var PlaylistItemView = Backbone.View.extend({

        track : {},

        events : {
            'click button.track-remove-from-playlist' : 'removeFromPlaylist',
            'click button.track-play' : 'playTrack',
            'click button.track-view-on-sc' : 'viewOnSoundCloud'
        },

        initialize : function() {
            // Set the track
            this.track = this.options.track;

            // Render
            this.template = _.template($('#playlist-item').html());
            this.render();
        },

        render : function() {
            $(this.el).html(this.template({
                track : this.track
            }));
            return this;
        },

        removeFromPlaylist : function() {
            Player.getPlaylist().remove(this.track);
        },

        playTrack : function() {
            Player.play(this.track.id);
        },

        viewOnSoundCloud : function() {
            window.open(this.track.get('permalink_url'), '_blank');
        }
    });

    return PlaylistItemView;
});