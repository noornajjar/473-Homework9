function viewModel () {
    var self = this;
    this.observableComments = ko.observableArray();
    this.commentToAdd = ko.observable("");
    this.addComment = function() {
        if (self.commentToAdd() != "") {
            self.observableComments.push({ comment: self.commentToAdd() });
            self.commentToAdd("");
        }
    };
}

ko.applyBindings(new viewModel());
