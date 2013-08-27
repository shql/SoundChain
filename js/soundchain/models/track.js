/**
 * Backbone model that represents an audio track
 * For size savings I just keep the attributes needed in the model
 */
define(function() {
    var TrackModel = Backbone.Model.extend({
        defaults: {
            id: 293,
            title: 'Unnamed Default Track',
            username: 'Unnamed User',
            duration: 0,
            avatar_url: '',
            permalink_url: ''
        },
        initialize: function(soundObject) {

            var sound = soundObject;

            // "Render" track length string
            var seconds = (Math.floor(sound.duration/1000))%60;
            if(seconds < 10) {
                seconds = '0' + seconds;
            }

            // Set element
            this.set({
                id            : sound.id,
                title         : sound.title,
                username      : sound.user.username,
                duration      : sound.duration,
                duration_h    : Math.floor(sound.duration/1000/60) + ':' + seconds,
                avatar_url    : sound.user.avatar_url,
                permalink_url : sound.permalink_url
            }, { silent : true });

            // Destroy model when it gets removed from collection
            this.bind('remove', function() {
                this.destroy();
            });
        }
    });

    return TrackModel;
});