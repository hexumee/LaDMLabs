////////////////////////////
// Определение переменных //
////////////////////////////
let relMatrix = [];
let elements_a = [];
let elements_b = [];
let elements_r = [];
let restrictedSymbols = ["`", "~", "!", "@", '"', "#", "№", "$", ";", "%", "^", ":", "&", "?", "*", "(", ")", "-",
                         "_", "=", "+", "[", "]", "{", "}", "'", "<", ">", ",", ".", "/", "|", "\\"];


////////////////////////
// Основные алгоритмы //
////////////////////////
// преобразование массива (как строки) в матрицу
function formatView() {
    let s = "";

    for (let i = 0; i < elements_a.length; i++) {
        for (let j = 0; j < elements_b.length; j++) {
            if (j !== elements_b.length-1) {
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
    initMatrix();

    elements_r.forEach(val => {
        let pair = val.replace(/ +/g, ' ').trim().split(" ");
        relMatrix[elements_a.indexOf(pair[0])][elements_b.indexOf(pair[1])] = 1;
    });

    document.getElementById("resultMatrix").innerHTML = formatView();
}

// проверка правильности ввода
function validate(v0, v1, v2) {
    let isAlreadyFailed = false;

    restrictedSymbols.some(s => {
        if (v0.includes(s) || v1.includes(s)) {
            alert(`Обнаружен недопустимый символ: ${s}`);
            isAlreadyFailed = true;
        }
    });

    if (!isAlreadyFailed && (v0[0] === "" || v1[0] === "")) {
        alert(`Длина множества не должна быть равна нулю`);
        isAlreadyFailed = true;
    }

    if (!isAlreadyFailed) {
        let f = false;
        v2.forEach(v => {
            if (v.replace(/ +/g, ' ').trim().split(" ").length !== 2) {
                isAlreadyFailed = true;
                f = true;
            }
        });
        if (f) {
            alert(`В отношении указаны не пары элементов`);
        }
    }

    return isAlreadyFailed === false;
}

// инициализация матрицы
function initMatrix() {
    relMatrix = [];
    for (let i = 0; i < elements_a.length; i++) {
        let row = [];
        for (let j = 0; j < elements_b.length; j++) {
            row.push(0);
        }
        relMatrix.push(row);
    }
}

// анализ отношения
function analyze() {
    elements_a = Array.from(new Set(document.getElementById("rf").value.replace(/ +/g, ' ').trim().split(" "))).sort();
    elements_b = Array.from(new Set(document.getElementById("sf").value.replace(/ +/g, ' ').trim().split(" "))).sort();
    elements_r = Array.from(new Set(document.getElementById("tf").value.replace(/ +/g, ' ').trim().split(";")));

    if (!(validate(elements_a, elements_b, elements_r))) {
        return;
    }

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
        if (c === 0) functionalR = false;
    }

    for (let i = 0; i < relMatrix[0].length; i++) {
        let c = 0;
        for (let j = 0; j < relMatrix.length; j++) {
            if (relMatrix[j][i] === 1) {
                c += 1;
            }
            if (c > 1) {
                functionalC = false;
                break;
            }
        }
        if (!functionalC) break;
        if (c === 0) functionalC = false;
    }

    document.getElementById("result").innerHTML = `Данное отношение ${functionalR ? "" : "не "}является функцией A к B<br>Данное отношение ${functionalC ? "" : "не "}является функцией B к A`;
}

///////////////////////
// Обработка событий //
///////////////////////
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("commit").click();
    }
});
