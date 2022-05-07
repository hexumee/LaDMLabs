<?php
    $adjMatrix = [];
    $accMatrix = [];

    if (isset($_POST['commit'])) {
        $graph = $_POST['graph'];
        analyze();
    }

    function tableFormat($array, $id) {
        $s = "";

        for ($i = 0; $i < count($array); $i++) {
            $p = '';
            for ($j = 0; $j < count($array[$i]); $j++) {
                $p = $p.'<td>'.$array[$i][$j].'</td>';
            }
            $s = $s.'<tr>'.$p.'</tr>';
        }

        return '<table id="'.$id.'">'.$s.'</table>';
    }

    function warshall() {
        global $adjMatrix, $accMatrix;

        $accMatrix = $adjMatrix;

        // алгоритм Уоршелла
        for ($k = 0; $k < count($accMatrix); $k++) {
            for ($i = 0; $i < count($accMatrix); $i++) {
                for ($j = 0; $j < count($accMatrix); $j++) {
                    $accMatrix[$i][$j] = ($accMatrix[$i][$j] || ($accMatrix[$i][$k] && $accMatrix[$k][$j]));
                    if (empty($accMatrix[$i][$j])) {
                        $accMatrix[$i][$j] = 0;
                    }
                }
            }
        }
        
        // из вершины A всегда можно попасть в A, просто оставшись на месте (заполняем главную диагональ единицами)
        for ($i = 0; $i < count($accMatrix); $i++) {
            for ($j = 0; $j < count($accMatrix); $j++) {
                if ($i == $j) {
                    $accMatrix[$i][$j] = 1;
                }
            }
        }
    }

    function validate() {
        global $adjMatrix;

        foreach ($adjMatrix as $row) {
            if (count($adjMatrix) != count(array_diff($row, array('NAN')))) {
                echo '<p id="smthWrong">' . "Матрица смежности не является квадратной!" . '</p>';
                die();
            }
        }

    }

    function analyze() {
        global $adjMatrix, $accMatrix, $graph;

        $rows = explode("\n", $graph);
        for ($i = 0; $i < count($rows); $i++) {
            $cols = explode(" ", $rows[$i]);
            $array_row = [];

            for ($j = 0; $j < count($cols); $j++) {
                array_push($array_row, $cols[$j] != "" ? (int)$cols[$j] : NAN);
            }

            array_push($adjMatrix, $array_row);
        }

        validate();
        warshall();

        echo '<div id="matrixView">' .
                '<label class="header">Результат</label>'.
                tableFormat($accMatrix, "accMtx").
            '</div>';
    }

/*
Тест #1:
0 1 1 0 0 0
0 0 0 0 0 0
0 1 0 0 0 1
0 1 1 0 1 0
0 0 0 0 0 0
1 0 0 0 1 0

Результат:
1 1 1 0 1 1
0 1 0 0 0 0
1 1 1 0 1 1
1 1 1 1 1 1
0 0 0 0 1 0
1 1 1 0 1 1


Тест #2:
0 1 1 0 1
0 0 1 0 0
0 0 0 0 1
0 1 1 0 1
0 0 0 0 0

Результат:
1 1 1 0 1
0 1 1 0 1
0 0 1 0 1
0 1 1 1 1
0 0 0 0 1
*/
?>
