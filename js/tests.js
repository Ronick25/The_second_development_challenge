var edge = 5;

QUnit.test("create Cell object", function () {
    var i = 5;
    var j = 1;
    ok(Cell(i, j), "Cell object is created");
});

QUnit.test("Get start and end cells", function () {

    $('<input id="start-coordinat"/>').appendTo('#qunit-fixture');
    $('<input id="end-coordinat"/>').appendTo('#qunit-fixture_2')
    var result = getStartAndEndCells();
    ok(result, "Push data  to the [coordinats] about start and end cell")
});

QUnit.test("Create matrix", function () {

    var coordinats = [];

    coordinats.start = [];
    coordinats.end = [];

    coordinats.start.i = 5;
    coordinats.start.j = 1;
    coordinats.start.i = 1;
    coordinats.start.j = 5;

    ok(createMatrix(coordinats), "Matrix created");
});

QUnit.test("Escape html", function () {
    var text = "<as&d>";
    equal(escapeHtml(text), "&lt;as&amp;d&gt;", "ok");
});

QUnit.test("Strategy four steps", function () {
    var directions = [1, 2, 3, 4];
    $('<input id="strategy"/>').appendTo('#qunit-fixture_3');
    $('#strategy').attr("value", "clockwise");
    equal(getStrategy(directions), directions, "Sorted Correct");
});

QUnit.test("Choose search algorithm", function () {
    var neigbors = [0, 1, 2];
    $('<input id="search_algorithm"/>').appendTo('#qunit-fixture_4');
    $('#search_algorithm').attr("value", "depth_first_search");
    equal(getSearchAlgorithm(neigbors), 0, "Algorithm chosen Correct");
});

QUnit.test("Get index", function () {
    var i = 2,
        j = 3;

    equal(index(i, j), undefined, "Index returned correct");
});