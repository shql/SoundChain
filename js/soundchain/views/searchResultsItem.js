/**
 * Backbone sub view for the search result items
 * Nothing fancy here either
 */
define([
    'player'
], function(Player) {
    var SearchResultsItemView = Backbone.View.extend({

        track : {},

        events : {
            'click button.track-add-to-playlist' : 'addToPlaylist',
            'click button.track-play' : 'playTrack'
        },

        initialize : function() {
            this.track = this.options.track;
            this.template = _.template($('#search-results-item').html());
            this.render();
        },

        render : function() {
            $(this.el).html(this.template({
                track : this.track
            }));
            return this;
        },

        addToPlaylist : function() {
            Player.getPlaylist().add(this.track);
        },

        playTrack : function() {
            Player.play(this.track.get('id'));
        }
    });

    return SearchResultsItemView;
});