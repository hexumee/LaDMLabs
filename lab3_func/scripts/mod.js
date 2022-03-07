////////////////////////////
// Определение переменных //
////////////////////////////
let relMatrix = [];
let elements = [];
let e_set = [];
let restrictedSymbols = ["`", "~", "!", "@", '"', "#", "№", "$", ";", "%", "^", ":", "&", "?", "*", "(", ")", "-",
                         "_", "=", "+", "[", "]", "{", "}", "'", "<", ">", ",", ".", "/", "|", "\\"];


////////////////////////
// Основные алгоритмы //
////////////////////////
// преобразование массива (как строки) в матрицу
function formatView() {
    let s = "";

    for (let i = 0; i < e_set.length; i++) {
        for (let j = 0; j < e_set.length; j++) {
            if (j !== e_set.length-1) {
                s += relMatrix[i][j] + " ";
            } else {
                s += relMatrix[i][j];
            }
        }
        s += "<br>";
    }

    return s;
}

// построение матрицы отношения
function buildRelationMatrix() {
    relMatrix = [];
    e_set = [];

    elements.forEach(v => {
        e_set.push(v[0]);
        e_set.push(v[1]);
    });

    e_set = Array.from(new Set(e_set)).sort();    // а надо ли сортировать?

    for (let i = 0; i < e_set.length; i++) {
        let matrixRow = [];

        for (let j = 0; j < e_set.length; j++) {
            // для всех e в elements проверяем на совпадение всех значений из [_k[i], _v[j]], т.е. if (e == [_k[i], _v[j]])
            if (elements.some(e => [e_set[i], e_set[j]].every((v, idx) => v === e[idx]))) {
                matrixRow.push(1);
            } else {
                matrixRow.push(0);
            }
        }

        relMatrix.push(matrixRow);
    }

    document.getElementById("resultMatrix").innerHTML = formatView();
}

// приведение к виду {(a, b), (x, y)...}
function getHRV() {
    let v0 = "";

    elements.forEach((e, idx) => {
        let t0 = `(${e[0]}, ${e[1]})`;
        if (idx === 0) {
            v0 += t0;
        } else {
            v0 += `, ${t0}`;
        }
    });

    return `{${v0}}`;
}

// удаление лишних пробелов
function strip(v) {
    let r = [];
    let idx = 0;

    if (v.length !== 0) {
        while (idx-1 !== v.length) {
            let s = "";
            while (v[idx] !== " ") {
                s += v[idx];
                idx++;
                if (idx === v.length) {
                    break;
                }
            }
            if (s !== "") {
                r.push(s);
            }
            idx++;
            if (idx === v.length) {
                break;
            }
        }
    }

    return r;
}

// проверка правильности ввода
function validate(v0) {
    let isAlreadyFailed = false;

    restrictedSymbols.some(s => {
        if (v0.includes(s)) {
            alert(`Обнаружен недопустимый символ: ${s}`);
            isAlreadyFailed = true;
        }
    });

    if (!isAlreadyFailed && v0.length > 2) {
        alert(`Слишком много элементов: ${v0.length}`);
        isAlreadyFailed = true;
    }

    if (!isAlreadyFailed && v0.length < 2) {
        alert(`Слишком мало элементов: их должно быть ровно два`);
        isAlreadyFailed = true;
    }

    return isAlreadyFailed === false;
}

// добавление элемента в отношение
function add() {
    let v0 = strip(document.getElementById("rf").value);

    if (validate(v0)) {
        elements.push(v0);
        document.getElementById("pre").innerHTML = getHRV();
    }
}

// удаление всех элементов из отношения
function clearAll() {
    elements = [];
    document.getElementById("pre").innerHTML = "{}";
}

// удаление последнего элемента из отношения
function clearLast() {
    if (elements.length > 0) {
        elements.pop();
        document.getElementById("pre").innerHTML = getHRV();
    }
}

// анализ отношения
function analyze() {
    buildRelationMatrix();

    let functionalR = true;
    let functionalC = true;

    for (let i = 0; i < relMatrix.length; i++) {
        let c = 0;
        for (let j = 0; j < relMatrix[i].length; j++) {
            if (relMatrix[i][j] === 1) {
                c += 1;
            }
            if (c > 1) {
                functionalR = false;
                break;
            }
        }
        if (!functionalR) break;
    }

    for (let i = 0; i < relMatrix.length; i++) {
        let c = 0;
        for (let j = 0; j < relMatrix[i].length; j++) {
            if (relMatrix[j][i] === 1) {
                c += 1;
            }
            if (c > 1) {
                functionalC = false;
                break;
            }
            if (!functionalC) break;
        }
    }

    document.getElementById("result").innerHTML = `Данное отношение ${functionalR ? "" : "не "}является функцией A к B<br>Данное отношение ${functionalC ? "" : "не "}является функцией B к A`;
}


///////////////////////
// Обработка событий //
///////////////////////
document.getElementById("rf").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        document.getElementById("add").click();
    }
});
