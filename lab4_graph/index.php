<?php
    include_once 'scripts/mod.php';
?>

<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Лабораторная работа #4</title>
        <link href="styles/style.css" rel="stylesheet">
        <script src="scripts/jquery-3.6.0.min.js"></script>
        <script src="scripts/mod.js"></script>
    </head>
    <body>
        <h1>Лабораторная работа #4</h1>
        <div id="inputView">
            <form action="" method="post" enctype="multipart/form-data" onsubmit="return false;">
                <div id="graphView">
                    <label for="txtAr">Ввод весов орграфа: </label>
                    <textarea id="txtAr" spellcheck="false" placeholder="value0 value1 value2 ... valueN" name="graph"></textarea>
                </div>
                <table id="boundsView">
                    <tr>
                        <td><label for="startElem">Начальный элемент (номер вершины): </label></td>
                        <td><input id="startElem" type="text" placeholder="X" name="start"></td>
                    </tr>
                    <tr>
                        <td><label for="endElem">Конечный элемент (номер вершины): </label></td>
                        <td><input id="endElem" type="text" placeholder="Y" name="end"></td>
                    </tr>
                </table>
                <div id="commitView">
                    <button id="commit" type="submit" name="commit" onclick="doCommit();">Анализ по Флойду</button>
                </div>
            </form>
        </div>
        <div id="resultView"></div>
    </body>
</html>
