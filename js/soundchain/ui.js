/**
 * UI module to handle misc ui related functionality
 */
define([
    'search'
], function(Search) {
    return {
        initialize : function()
        {

            // Perform search via form
            $('form button[type="submit"]').click(function(event) {
                event.preventDefault();

                var query = $('form[role="search"] input').val();
                Search.query(query);
            });

            // Handle SoundCloud user auth
            $('#sign-in-button').click(function(event) {
                event.preventDefault();

                if(typeof SC != 'undefined') {
                    SC.connect(function() {
                        SC.get('/me', function(me) {
                            console.log(me);
                            alert('Hello, ' + me.username);
                        });
                    });
                } else {
                    alert(';(');
                }
            });

            return this;
        }
    };
});