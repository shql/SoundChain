var soundCloudApiUrl = 'http://connect.soundcloud.com/sdk.js';
define([
    soundCloudApiUrl,
    'player', 'search', 'ui'
], function(SoundCloud, Player, Search, UI) {

    var initialize = function() {

        // Init SoundCloud (in global scope)
        SC.initialize({
            client_id: '3ecc00515190c6261dfacb79058df97b',
            redirect_uri: 'http://sc.shql.org/callback.html'
        });

        // Init base modules / components
        Player.initialize();
        Search.initialize();
        UI.initialize();

        // A few routes (without router module because very simple)
        var Router = Backbone.Router.extend({

            routes: {
                '' : 'queue',
                'search' : 'search',
                'queue/clear' : 'clearQueue',
                'bookmarklet/:scURL' : 'bookmarklet'
            },

            queue : function() {
                $('ul.nav.navbar-nav > li').removeClass('active');
                $($('ul.nav.navbar-nav > li').get(0)).addClass('active');
                $('div.section').hide();
                $('#queue-list').show();
            },

            search : function() {
                $('ul.nav.navbar-nav > li').removeClass('active');
                $($('ul.nav.navbar-nav > li').get(1)).addClass('active');
                $('div.section').hide();
                $('#search-list').show();
            },

            clearQueue : function() {
                Player.getPlaylist().each(function(track) {
                    Player.getPlaylist().remove(track);
                });
                window.location.href = "#";
            },

            bookmarklet : function(scURL) {
                var scURL = decodeURIComponent(scURL);

                SC.get('/resolve', { url: scURL }, function(track) {
                    var scTrack = track;
                    if(typeof scTrack.errors == 'undefined') {
                        require(['models/track'], function(TrackModel) {
                            var track = new TrackModel(scTrack);
                            Player.getPlaylist().add(track);
                            window.location.href = "#";
                        });
                    } else {
                        alert('An error occured');
                        window.location.href = "#";
                    }
                });
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