/**
 * View for the main play controls
 * - Starts and stops playback
 * - Toggles shuffle and repeat options and visuals
 *
 * Functionality should be self explanatory. Therefore no detailed comments.
 */
define([
    'player'
], function(Player) {
    var PlayControlsView = Backbone.View.extend({

        el : $('#play-controls'),

        events : {
            'click a.audio-toggle'  : 'togglePlayback',
            'click a.audio-last'    : 'playLast',
            'click a.audio-next'    : 'playNext',
            'click a.audio-shuffle' : 'toggleShuffle',
            'click a.audio-repeat'  : 'toggleRepeat'
        },

        initialize : function() {
            this.render();
        },

        render : function() {
            return this;
        },

        togglePlayback : function() {
            Player.toggle();
        },

        playLast : function() {
            Player.playLast();
        },

        playNext : function() {
            Player.playNext();
        },

        toggleShuffle : function() {
            Player.setShuffle(!Player.getShuffle());

            if(Player.getShuffle()) {
                this.$el.find('a.audio-shuffle').parent().addClass('active');
            } else {
                this.$el.find('a.audio-shuffle').parent().removeClass('active');
            }
        },

        toggleRepeat : function() {
            Player.setRepeat(!Player.getRepeat());

            if(Player.getRepeat()) {
                this.$el.find('a.audio-repeat').parent().addClass('active');
            } else {
                this.$el.find('a.audio-repeat').parent().removeClass('active');
            }
        }

    });
    // Our module now returns our view
    return PlayControlsView;
});