

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
            var temp = _.sortBy(self.todoArray(), 'tags');
            var grouped = [];
            for (var i = 0; i < temp.length; i++) {
                 
                grouped.push({tag: temp[i].tags, descriptions: []});
                var index = grouped.length-1;
                var bool = true;
                for (var j=i; j < temp.length && bool; j++) {
                    if (j === i) {
                        grouped[index].descriptions.push({description:temp[j].description});
                    }else if(temp[j].tags === temp[j-1].tags) {
                        grouped[index].descriptions.push({description:temp[j].description});
                    }
                    
                    if (j < temp.length-1 && temp[j].tags !== temp[j+1].tags){
                        bool = false;
                    }
                    i=j;
                }        
            }
            return grouped;
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
                
            }
        };
    }

    ko.applyBindings(new viewModel());

    $(".tabs a span").on("click", function () {
        $(".tabs a span").removeClass("active");
        $(this).addClass("active");
    });
    
    $("#button").on("click", function () {
        var description = $(".description").val(),
            tags = $(".tags").val().split(","),
            newToDo = {"description":description, "tags":tags};

        $.post("todos", newToDo, function (result) {
            console.log(result);

            //toDoObjects.push(newToDo);
            toDoObjects = result;

            // update toDos
            toDos = toDoObjects.map(function (toDo) {
                return toDo.description;
            });

        });
    });
   
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
