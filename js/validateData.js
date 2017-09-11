var $ = require('jquery');

module.exports = function(coordinates) {
    var R = escapeHtml($("#rarefaction").val()),
        animation_speed = escapeHtml($("#animation_speed").val()),
        start_coordinat = escapeHtml($("#start-coordinat").val()),
        end_coordinat = escapeHtml($("#end-coordinat").val()),
        reg_start = /^\d\d?\d?(,)\d\d?\d?$/g, //Start with every number from 1-100 + necessarily "," +
        reg_end = /^\d\d?\d?(,)\d\d?\d?$/g; // +  ends with every number from 1-100;

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
    } else if (parseInt(coordinates.start.i < 1) || parseInt(coordinates.start.i) > parseInt(edge) ||
        parseInt(coordinates.start.j) < 1 || parseInt(coordinates.start.j) > parseInt(edge) ||
        parseInt(coordinates.end.i) < 1 || parseInt(coordinates.end.i) > parseInt(edge) ||
        parseInt(coordinates.end.j) < 1 || parseInt(coordinates.end.j) > parseInt(edge)) {
        $('#myModal').modal('show')
        document.getElementById('modal-body').innerHTML = "Cтартовая и конечные координаты не должны быть меньше 1" +
            " или больше размерности!";
        return false;
    }

    return true;
};

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