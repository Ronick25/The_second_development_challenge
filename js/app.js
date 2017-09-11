/**
 * The script implements 2 algorithms for finding the path in the matrix:
 * Depth-first search and Breadth-first search
 */

//Include modules
window.$ = window.jQuery = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;
require("./bootstrap");
var validateData = require("./validateData.js");
var checkNeighbors = require("./checkNeighbors.js");
var initMatrix = require("./matrix.js");

// This variable is global, because it's used in most of methods
matrix = [];

$(document).ready(function() {
    var current, last, start, stack = [], queue = [];

    $(".start-search").on("click", function() {
        var coordinates = getStartAndEndCells();
        edge = $("#edge").val(); //Var is global, because Breadth-first search doesn't work correct through parameters
                                 //Out of range when performing checkNeighbors(). Failed to fix this.

        if (validateData(coordinates) === true) {
            $(".container").hide();
            $(".table").show();
            initMatrix.create(coordinates);
            initMatrix.fill();
            initMatrix.edit(coordinates);

            $("#" + coordinates.start.i + "_" + coordinates.start.j).css("background-color", "green");
            $("#" + coordinates.end.i + "_" + coordinates.end.j).css("background-color", "blue");
        }
    });

    $(".continue-search").on("click", function() {
        $("td").unbind();
        $(".continue-search").hide();

        var coordinates = getStartAndEndCells(),
            search_algorithm = $("#search_algorithm").val(),
            animation_speed = $("#animation_speed").val();

        start = matrix[coordinates.start.i][coordinates.start.j];
        last = matrix[coordinates.end.i][coordinates.end.j];
        current = start;

        if (search_algorithm === "depth_first_search") {
            drawDepthFirstSearch(current, start, last, stack, animation_speed);
        } else {
            queue.push(current);
            drawBreadthFirstSearch(current, start, last, queue, animation_speed);
        }
    });
});

function drawDepthFirstSearch(current, start, last, stack, animation_speed) {
    setTimeout(function() {
        if (current === last) {
            alert("The end!");
        } else {
            current.visited = true;
            current.changeColor("#c6e0b4");

            var next = checkNeighbors(current.i, current.j);
            if (next) {
                next.changeColor("green");

                stack.push(current);
                next.visited = true;
                current = next;

                drawDepthFirstSearch(current, start, last, stack, animation_speed);
            } else if (stack.length > 0) {
                current = stack.pop();
                current.changeColor("green");

                drawDepthFirstSearch(current, start, last, stack, animation_speed);
            }
        }
    }, animation_speed);
}


function drawBreadthFirstSearch(current, start, last, queue, animation_speed) {
    setTimeout(function() {
        if (queue.length > 0) {
            current = queue.shift();

            if (current === last) {
                queue.forEach(function(child) {
                    child.changeColor("#c6e0b4");
                });
                current.changeColor("green");

                queue.length = 0;
                alert("The end!");
            } else {
                current.changeColor("#c6e0b4");

                var childs = checkNeighbors(current.i, current.j);
                childs.forEach(function (child) {
                    if (child.visited === false) {
                        child.changeColor("green");

                        queue.push(child);
                        child.visited = true;
                        drawBreadthFirstSearch(current, start, last, queue, animation_speed)
                    }
                });
            }
        }
    }, animation_speed);
}


function getStartAndEndCells() {
    var start = $("#start-coordinat").val().split(",", 2),
        end = $("#end-coordinat").val().split(",", 2),
        coordinates = [];

    coordinates.start = [];
    coordinates.end = [];
    coordinates.start.i = start[0];
    coordinates.start.j = start[1];
    coordinates.end.i = end[0];
    coordinates.end.j = end[1];

    return coordinates;
}
