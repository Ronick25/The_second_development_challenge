// This variable is global, because it is used in most methods
matrix = [];

//var previous need for implementation of the current position marker
$(document).ready(function () {
    var previous, current, last, start, stack = [], queue = [];

    $('.start-search').on('click', function () {

        var coordinats = getStartAndEndCells();
        edge = $("#edge").val(); //Var is global, because Breadth-first search doesn't work correct through parameters
                                 //Out of range when checkNeigbors(). Failed to fix this.

        if (validateData() === true) {
            $('.container').hide();
            $('.table').show();
            createMatrix(coordinats);
            fillMatrix();
            editCell(coordinats);

            $("#" + coordinats.start.i + "_" + coordinats.start.j).css("background-color", "green");
            $("#" + coordinats.end.i + "_" + coordinats.end.j).css("background-color", "blue", "!important");
        }
    });

    $('.continue-search').on('click', function () {
        $('.continue-search').hide();
        var coordinats = getStartAndEndCells(),
            search_algorithm = $("#search_algorithm").val(),
            animation_speed = $("#animation_speed").val();

        start = matrix[coordinats.start.i][coordinats.start.j];
        last = matrix[coordinats.end.i][coordinats.end.j];
        current = start;

        if (search_algorithm === "depth_first_search") {
            drawDepthFirstSearch(current, start, last, stack, animation_speed);
        } else {
            queue.push(current)
            drawBreadthFirstSearch(current, start, last, queue, animation_speed);
        }
    });
});

//Putting this object in every cell of matrix
function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    this.changeColor = function () {
        $("#" + this.i + "_" + this.j).css('background-color', matrix[this.i][this.j].color);
    }
    return this;
}

function createMatrix(coordinats) {
    var R = $("#rarefaction").val();
    for (var i = 1; i <= edge; i++) {
        matrix[i] = [];
        for (var j = 1; j <= edge; j++) {
            var cell = new Cell(i, j);
            cell.value = Math.random() * 101;
            if (cell.value > R || (cell.i == coordinats.start.i && cell.j == coordinats.start.j) ||
                (cell.i == coordinats.end.i && cell.j == coordinats.end.j)) {
                cell.value = 0;
            } else {
                cell.value = 1;
                cell.color = "black";
                cell.font_color = "white"
            }
            matrix[i][j] = cell;
        }
    }

    return matrix;
}

function fillMatrix() {
    for (var i = 1; i <= edge; i++) {
        $(".matrix").append("<tr class = tr_" + i + ">");
        for (var j = 1; j <= edge; j++) {
            $(".tr_" + i).append("<td id = " + i + "_" + j + ">");
            document.getElementById("" + i + "_" + j).innerHTML = matrix[i][j].value;
            $("#" + i + "_" + j).css('background-color', matrix[i][j].color);
            $("#" + i + "_" + j).css('color', matrix[i][j].font_color);
        }
    }

    return matrix;
}

//Switching 0 to 1 and back by clicking on cell. (except of start and end cells)
function editCell(coordinats) {
    $('td').click(function () {
        var id = this.id.split("_");
        var selector = $("#" + id[0] + "_" + id[1]);
        if (!(id[0] === coordinats.start.i && id[1] === coordinats.start.j) &&
            !(id[0] === coordinats.end.i && id[1] === coordinats.end.j)) {
            if ($(this).html() == 0) {
                matrix[id[0]][id[1]].value = 1
                selector.css('background-color', "black");
                selector.css('color', "white");
                $(this).text(1);
            } else {
                matrix[id[0]][id[1]].value = 0
                selector.css('background-color', "white");
                selector.css('color', "black");
                $(this).text(0);
            }
        }
    });
}

function drawDepthFirstSearch(current, start, last, stack, animation_speed) {
    setTimeout(function () {
        if (current === last) {
            alert("The end!");
        } else {
            current.visited = true;

            current.color = "#c6e0b4";
            current.changeColor();
            var next = checkNeigbors(current.i, current.j);
            if (next) {
                next.color = "green";
                next.changeColor();

                stack.push(current);
                next.visited = true;
                current = next;

                drawDepthFirstSearch(current, start, last, stack, animation_speed);
            } else if (stack.length > 0) {
                current = stack.pop();
                current.color = "green";
                current.changeColor();

                drawDepthFirstSearch(current, start, last, stack, animation_speed);
            }
        }
    }, animation_speed);
}


function drawBreadthFirstSearch(current, start, last, queue, animation_speed) {
    setTimeout(function () {
        if (queue.length > 0) {
            current = queue.shift();

            if (current === last) {
                queue.forEach(function (child) {
                    child.color = "#c6e0b4";
                    child.changeColor();
                })
                current.color = "green";
                current.changeColor();

                queue.length = 0;
                alert('The end!');
            } else {
                current.color = "#c6e0b4";
                current.changeColor();

                var childs = checkNeigbors(current.i, current.j);
                childs.forEach(function (child) {
                    if (child.visited === false) {
                        child.color = "green";
                        child.changeColor();

                        queue.push(child);
                        child.visited = true;
                        drawBreadthFirstSearch(current, start, last, queue, animation_speed)
                    }
                });
            }
        }
    }, animation_speed);
}

//Return next neigbor (or array of neigbors) for current cell
function checkNeigbors(i, j) {
    var transition_method = $("#transition_method").val(),
        neigbors = [],
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

    directions.forEach(function (direction) {
        if (direction && direction.value === 0 && !direction.visited) {
            neigbors.push(direction);
        }
    });

    return getSearchAlgorithm(neigbors);
}

//Counter_clock is reverse to clockwise without first element
function getStrategy(directions) {
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
}

function getSearchAlgorithm(neigbors) {
    var algorithm = $("#search_algorithm").val();
    if (algorithm === "depth_first_search") {
        return neigbors[0];
    } else {
        return neigbors;
    }
}

function index(i, j) {
    if (!(i < 1 || j < 1 || i > edge || j > edge)) {
        return matrix[i][j];
    }
}

function getStartAndEndCells() {
    var start = $("#start-coordinat").val().split(",", 2),
        end = $("#end-coordinat").val().split(",", 2),
        coordinats = [];

    coordinats.start = [];
    coordinats.end = [];
    coordinats.start.i = start[0];
    coordinats.start.j = start[1];
    coordinats.end.i = end[0];
    coordinats.end.j = end[1];

    return coordinats;
}

//Random array sorting
Array.prototype.shuffle = function (b) {
    var i = this.length, j, t;

    while (i) {
        j = Math.floor(( i-- ) * Math.random());
        t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }

    return this;
};

function validateData() {
    var R = escapeHtml($("#rarefaction").val()),
        animation_speed = escapeHtml($("#animation_speed").val()),
        start_coordinat = escapeHtml($("#start-coordinat").val()),
        end_coordinat = escapeHtml($("#end-coordinat").val()),
        coordinats = getStartAndEndCells(),
        reg_start = /^\d\d?\d?(,)\d\d?\d?$/g,
        reg_end = /^\d\d?\d?(,)\d\d?\d?$/g;

    start_coordinat = reg_start.exec(start_coordinat);
    end_coordinat = reg_end.exec(end_coordinat);

    if (edge === "" || R === "" || animation_speed === "" || start_coordinat === "" || end_coordinat === "") {
        $('#myModal').modal('show');
        document.getElementById('modal-body').innerHTML = "Вы ввели не всю информацию, вернитесь назад и заполните все поля!";
        return false;
    } else if (edge < 1 || edge > 100) {
        $('#myModal').modal('show');
        document.getElementById('modal-body').innerHTML = "Размер матрицы должен быть в диапазоне от 1 до 100!";
        return false;
    } else if (R < 1 || R > 100) {
        $('#myModal').modal('show');
        document.getElementById('modal-body').innerHTML = "Разряжонность должна быть в диапазоне от 1 до 100!";
        return false;
    } else if (animation_speed < 100 || animation_speed > 1000) {
        $('#myModal').modal('show');
        document.getElementById('modal-body').innerHTML = "Скорость анимации должна быть в диапазоне от 100 до 1000!";
        return false;
    } else if (start_coordinat === null || end_coordinat === null) {
        $('#myModal').modal('show');
        document.getElementById('modal-body').innerHTML = "Введите стартовую координату и конечную правильно!" +
            "(2 числа через запятую)";
        return false;
    } else if (parseInt(coordinats.start.i < 1) || parseInt(coordinats.start.i) > parseInt(edge) ||
        parseInt(coordinats.start.j) < 1 || parseInt(coordinats.start.j) > parseInt(edge) ||
        parseInt(coordinats.end.i) < 1 || parseInt(coordinats.end.i) > parseInt(edge) ||
        parseInt(coordinats.end.j) < 1 || parseInt(coordinats.end.j) > parseInt(edge)) {
        $('#myModal').modal('show')
        document.getElementById('modal-body').innerHTML = "Cтартовая и конечные координаты не должны быть меньше 1" +
            " или больше размерности!";
        return false;
    }

    return true;
}

//Defense from sql injections
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.toString().replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}
