/**
 * A Backbone collection to host tracks
 * We keep track of an "active" element to simulate a playlist
 * (next & previous functionality)
 */
define([
    'models/track'
], function(Track){
    var Tracks = Backbone.Collection.extend({
        model: Track,

        initialize: function () {
            this.setElement(this.at(0));
        },
        comparator: function(model) {
            return model.get('cId');
        },
        getElement: function() {
            return this.currentElement;
        },
        setElement: function(model) {
            this.currentElement = model;
        },
        next: function(repeat) {
            // Get the next element
            var element = this.at(this.indexOf(this.getElement()) + 1);

            if(!element && repeat) {
                // If there is no next element take the very first one (if repeat mode is on)
                element = this.at(0);
            } else if(!element && !repeat) {
                // If there is no next element and repeat mode is off: Stick to the current element
                element = this.getElement();
            }

            this.setElement(element);
            return this;
        },
        prev: function(repeat) {
            // Get the previous element
            var element = this.at(this.indexOf(this.getElement()) - 1);

            if(!element && repeat) {
                // If there is no previous element and repeat mode is on: Take the very last one
                element = this.at(this.length - 1);
            } else if(!element && !repeat) {
                // If there is no previous element and repeat mode is off: Stick to the current element
                element = this.get(element);
            }

            this.setElement(element);
            return this;
        }
    });

    return Tracks;
});