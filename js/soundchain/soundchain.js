var soundCloudApiUrl = 'http://connect.soundcloud.com/sdk.js';
define([
    soundCloudApiUrl
], function(SoundCloud) {

    var initialize = function() {

        // Init SoundCloud (in global scope)
        SC.initialize({
            client_id: '3ecc00515190c6261dfacb79058df97b',
            redirect_uri: 'http://sc.shql.org/callback.html'
        });

        // Init base modules / components
        require(['player', 'search', 'ui'], function(Player, Search, UI) {
            Player.initialize();
            Search.initialize();
            UI.initialize();
        });

        // A few routes (without module because very simple)
        var Router = Backbone.Router.extend({

            routes: {
                '' : 'queue',
                'history' : 'history',
                'search' : 'search'
            },

            queue : function() {
                $('ul.nav.navbar-nav > li').removeClass('active');
                $($('ul.nav.navbar-nav > li').get(0)).addClass('active');
                $('div.section').hide();
                $('#queue-list').show();
            },

            history : function() {
                $('ul.nav.navbar-nav > li').removeClass('active');
                $($('ul.nav.navbar-nav > li').get(1)).addClass('active');
                $('div.section').hide();
                $('#history-list').show();
            },

            search : function() {
                $('ul.nav.navbar-nav > li').removeClass('active');
                $($('ul.nav.navbar-nav > li').get(2)).addClass('active');
                $('div.section').hide();
                $('#search-list').show();
            }

        });

        // Initiate router & track the history (forth & back buttons)
        new Router();
        Backbone.history.start();
    }

    return {
        initialize: initialize
    };
});