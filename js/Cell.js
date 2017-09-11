require('./node_modules/jquery')

//Putting this object in every cell of matrix
module.exports = function(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    this.changeColor = function(color) {
        this.color = color;
        $("#" + this.i + "_" + this.j).css('background-color', matrix[this.i][this.j].color);
    };
    return this;
};
