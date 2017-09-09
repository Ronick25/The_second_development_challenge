<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div class="container">
    <div class="row">
        <h1>Параметры задачи</h1>
    </div>
    <div class="form-group">
        <h5>Размер матрицы(X)</h5>
        <input type="number" class="form-control" id="edge" placeholder="number from 1 to 100" value="25">
    </div>
    <div class="form-group" class="form-control">
        <h5>Разраженность матрицы(R)</h5>
        <input type="number" class="form-control" id="rarefaction" placeholder="number from 1 to 100" value="30">
    </div>
    <div class="form-group">
        <h5>Алгоритм поиска</h5>
        <select name="search_algorithm" class="form-control" id="search_algorithm">
            <option value="depth_first_search">Depth-first search</option>
            <option value="breadth_first_search">Breadth-first search</option>
        </select>
    </div>
    <div class="form-group">
        <h5>Скорость анаманции(А)</h5>
        <input type="number" class="form-control" placeholder="number from 100 to 1000(milliseconds)" value="100"
               id="animation_speed">
    </div>
    <div class="form-group">
        <h5>Координата начальной позиции маркера в матрице (START)</h5>
        <input type="text" class="form-control" id="start-coordinat" placeholder="Row, Col" value="25,1">
    </div>
    <div class="form-group">
        <h5>Координата конечной позиции маркера в матрице (END)</h5>
        <input type="text" class="form-control" id="end-coordinat" placeholder="Row, Col" value="1,25">
    </div>
    <div class="form-group">
        <h5>Метод перехода(М)</h5>
        <select name="transition_method" class="form-control" id="transition_method">
            <option value="four_steps">4 steps</option>
            <option value="eight_steps">8 steps</option>
        </select>
    </div>
    <div class="form-group">
        <h5>Стратегия перехода(STRATEGY)</h5>
        <select name="strategy" class="form-control" id="strategy">
            <option value="clockwise">Clockwise starting from top</option>
            <option value="counter_clock">Counterclock-wise from top</option>
            <option value="randomly">Randomly</option>
        </select>
    </div>
    <button class="button start-search">Начать поиск</button>
</div>
<div class="table">
    <table class="matrix"></table>
    <button class="button continue-search">Продолжить поиск</button>
</div>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Ошибка</h4>
            </div>
            <div class="modal-body" id="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
            </div>
        </div>
    </div>
</div>
<script src="../js/bootstrap.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>
