// Client-side code 
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */ 
 
 
// Server-side code 
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

"use strict";

function viewModel () {
    var self = this;
    this.observableComments = ko.observableArray();
    this.commentToAdd = ko.observable("");
    this.addComment = function() {
        if (self.commentToAdd() !== "") {
            self.observableComments.push({ comment: self.commentToAdd() });
            self.commentToAdd("");
        }
    };
}

ko.applyBindings(new viewModel());