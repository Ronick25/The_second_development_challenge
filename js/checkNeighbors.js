//Return next neighbor (or array of neighbors) for current cell
module.exports = function(i, j) {
    var transition_method = $("#transition_method").val(),
        neighbors = [],
        directions = [],
        top = index(i - 1, j),
        right = index(i, j + 1),
        bottom = index(i + 1, j),
        left = index(i, j - 1);

    if (transition_method === "four_steps") {
        directions = [top, right, bottom, left];
        getStrategy(directions);
    } else {
        var top_right = index(i - 1, j + 1),
            bottom_right = index(i + 1, j + 1),
            bottom_left = index(i + 1, j - 1),
            top_left = index(i - 1, j - 1);

        directions = [top, top_right, right, bottom_right, bottom, bottom_left, left, top_left];
        getStrategy(directions);
    }

    directions.forEach(function(direction) {
        if (direction && direction.value === 0 && !direction.visited) {
            neighbors.push(direction);
        }
    });

    return getSearchAlgorithm(neighbors);
};

//Counter_clock is reverse to clockwise without first element
var getStrategy = function(directions) {
    var strategy = $("#strategy").val()

    if (strategy === "clockwise") {
        return directions;
    } else if (strategy === "counter_clock") {
        var top = directions.shift();
        directions.reverse();
        directions.unshift(top)
        return directions;
    } else {
        return directions.shuffle();
    }
};

var getSearchAlgorithm = function(neighbors) {
    var algorithm = $("#search_algorithm").val();
    if (algorithm === "depth_first_search") {
        return neighbors[0];
    } else {
        return neighbors;
    }
};

//Validate index
var index = function(i, j) {
    if (!(i < 1 || j < 1 || i > edge || j > edge)) {
        return matrix[i][j];
    }
};

//Random array sorting
Array.prototype.shuffle = function(b) {
    var i = this.length, j, t;

    while (i) {
        j = Math.floor(( i-- ) * Math.random());
        t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }

    return this;
};

