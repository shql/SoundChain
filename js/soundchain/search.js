define([
    'views/searchResults',
    'views/searchResultsItem',
    'models/track'
], function(SearchResultsView, SearchResultsItemView, TrackModel) {
    return {
        resultsView : null,

        initialize : function()
        {
            this.resultsView = new SearchResultsView();
            return this;
        },
        /**
         * Run a SoundCloud API search for a query string
         * @param q
         */
        query : function(q)
        {
            var that = this;
            require(['player'], function(Player) {
                SC.get('/tracks', { q: q }, function(tracks) {
                    // Empty result list
                    that.resultsView.$el.empty();

                    // Loop through results and create result views (take only streamable tracks)
                    $.each(tracks, function(key, track) {

                        if(track.streamable) {
                            var track = new TrackModel(track);

                            var itemTemplate = new SearchResultsItemView({
                                track : track
                            });
                            that.resultsView.$el.append(itemTemplate.$el);
                        }
                    });
                });
            });
        }
    };
});