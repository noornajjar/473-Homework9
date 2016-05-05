

var main = function (toDoObjects) {
    
    "use strict";
    
    function viewModel() {
        var self = this;
        this.todoArray = ko.observableArray(toDoObjects);
        this.reverseTodos = ko.computed(function() {
            var reversed = Array.prototype.slice.call(self.todoArray());
            reversed.reverse();
            return reversed;
        });
        this.sortByTags = ko.computed(function(){
            return _.sortBy(self.todoArray(), 'tag');
        });
        
        this.description = ko.observable("");   
        this.tag    = ko.observable("");
        
        this.newest = ko.observable(true);
        this.oldest = ko.observable(false);
        this.tags   = ko.observable(false);
        this.add    = ko.observable(false);
        
        this.clickNewest = function () {
            self.newest(true);
            self.oldest(false);
            self.tags(false);
            self.add(false);
        };
        this.clickOldest = function () {
            self.newest(false);
            self.oldest(true);
            self.tags(false);
            self.add(false);
        };
        this.clickTags = function () {
            self.newest(false);
            self.oldest(false);
            self.tags(true);
            self.add(false);
        };
        this.clickAdd = function () {
            self.newest(false);
            self.oldest(false);
            self.tags(false);
            self.add(true);
        };
        
        this.addTodo = function () {
            if (self.description() !== "" && self.tag() !== "") {
                self.todoArray.push({ description: self.description(), tags: self.tag() });
                self.description("");
                self.tag("");
                
                var newToDo = {"description":self.description(), "tags":self.tag()};

                $.post("todos", newToDo, function (result) {
                    console.log(result);
                });
            }
        };
    }

    ko.applyBindings(new viewModel());

    $(".tabs a span").on("click", function () {
        $(".tabs a span").removeClass("active");
        $(this).addClass("active");
    });
   /* console.log("SANITY CHECK");
    var toDos = toDoObjects.map(function (toDo) {
          // we'll just return the description
          // of this toDoObject
          return toDo.description;
    });

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });

            } else if ($element.parent().is(":nth-child(3)")) {
                var tags = [];

                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });
                console.log(tags);

                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return { "name": tag, "toDos": toDosWithTag };
                });

                console.log(tagObjects);

                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });

            } else if ($element.parent().is(":nth-child(4)")) {
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: "),
                    $button = $("<span>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        newToDo = {"description":description, "tags":tags};

                    $.post("todos", newToDo, function (result) {
                        console.log(result);

                        //toDoObjects.push(newToDo);
                        toDoObjects = result;

                        // update toDos
                        toDos = toDoObjects.map(function (toDo) {
                            return toDo.description;
                        });

                        $input.val("");
                        $tagInput.val("");
                    });
                });

                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");*/
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});