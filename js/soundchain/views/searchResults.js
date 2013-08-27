/**
 * Backbone View for the search results
 * Nothing fancy
 */
define([
    'search'
], function(Search) {
    var SearchResultsView = Backbone.View.extend({

        el : $('#search-results'),

        events : {
            'click button.audio-toggle' : 'togglePlayback',
            'click button.audio-last' : 'playLast',
            'click button.audio-next' : 'playNext'
        },

        initialize : function() {
            this.render();
        },

        render : function() {
            return this;
        }
    });

    return SearchResultsView;
});