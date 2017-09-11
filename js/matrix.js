require('./node_modules/jquery')
var Cell = require('./Cell.js');

var create = function(coordinates) {
    var R = $("#rarefaction").val();
    for (var i = 1; i <= edge; i++) {
        matrix[i] = [];
        for (var j = 1; j <= edge; j++) {
            var cell = new Cell(i, j);
            cell.value = Math.random() * 101; // 101 to be sure that we have at least one 0 or 1
            if (cell.value > R || (cell.i == coordinates.start.i && cell.j == coordinates.start.j) ||
                (cell.i == coordinates.end.i && cell.j == coordinates.end.j)) {
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
};

var fill = function() {
    for (var i = 1; i <= edge; i++) {
        $(".matrix").append("<tr class = tr_" + i + ">");
        for (var j = 1; j <= edge; j++) {
            $(".tr_" + i).append("<td id = " + i + "_" + j + ">");
            document.getElementById("" + i + "_" + j).innerHTML = matrix[i][j].value;
            $("#" + i + "_" + j).css({
                'background-color': matrix[i][j].color,
                'color': matrix[i][j].font_color
            })
        }
    }
    return matrix;
};

//Edit matrix before starting the search
var edit = function(coordinats) {
    $('td').click(function() {
        var id = this.id.split("_");
        var selector = $("#" + id[0] + "_" + id[1]);
        if (!(id[0] === coordinats.start.i && id[1] === coordinats.start.j) &&
            !(id[0] === coordinats.end.i && id[1] === coordinats.end.j)) {
            if ($(this).html() == 0) {
                matrix[id[0]][id[1]].value = 1;
                selector.css('background-color', "black");
                selector.css('color', "white");
                $(this).text(1);
            } else {
                matrix[id[0]][id[1]].value = 0;
                selector.css('background-color', "white");
                selector.css('color', "black");
                $(this).text(0);
            }
        }
    });
};

exports.create = create;
exports.fill = fill;
exports.edit = edit;