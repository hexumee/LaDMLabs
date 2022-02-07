let s0, s1;
let is_s0_empty, is_s1_empty;

// форматирование в вид {2v45, 4b67, ibij, ...}
function format(v) {
    return `{${v.join(", ")}}`;
}

// конвертация строки в массив
function split(v) {
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

// проверка на пустоту и соответствие маске
function validate(v, s) {
    let flag = true;

    if (v.length === 0 && s === false) {
        alert("Размер множества не должен быть равен нулю");
        flag = false;
    } else if (s) {
        return true;
    } else {
        v.forEach((item, idx) => {
            if (!(((parseInt(item[0]) % 2 === 0) && (parseInt(item[2]) % 2 === 0)) && (parseInt(item[3]) % 2 !== 0) && (item[1] >= "a" && item[1] <= "z"))) {
                alert(`Ошибка в элементе ${idx+1}: ${item} – несоответствие маске (ibij)`);
                flag = false;
            }
        });
    }

    return true === flag;
}

// объединение множеств
function union() {
    if (is_s1_empty && !is_s0_empty) {
        return s0;
    } else if (is_s0_empty && !is_s1_empty) {
        return s1;
    } else if (is_s0_empty && is_s1_empty) {
        return [];
    } else {
        let v = [];

        s0.forEach(item => {
            if (!(v.includes(item))) {
                v.push(item);
            }
        });

        s1.forEach(item => {
            if (!(v.includes(item))) {
                v.push(item);
            }
        });

        return v;
    }
}

// пересечение множеств
function intersection() {
    if (is_s0_empty || is_s1_empty) {
        return [];
    } else {
        let v = [];

        s0.forEach(item => {
            if (s1.includes(item) && !(v.includes(item))) {
                v.push(item);
            }
        });

        return v;
    }
}

// дополнение A к B
function addition_a() {
    if (is_s1_empty && !is_s0_empty) {
        return s0;
    } else if (is_s0_empty && !is_s1_empty) {
        return [];
    } else if (is_s0_empty && is_s1_empty) {
        return [];
    } else {
        let v = [];

        s0.forEach(item => {
            if (!(v.includes(item)) && !(s1.includes(item))) {
                v.push(item);
            }
        });

        return v;
    }
}

// дополнение B к A
function addition_b() {
    if (is_s0_empty && !is_s1_empty) {
        return s1;
    } else if (is_s1_empty && !is_s0_empty) {
        return [];
    } else if (is_s0_empty && is_s1_empty) {
        return [];
    } else {
        let v = [];

        s1.forEach(item => {
            if (!(v.includes(item)) && !(s0.includes(item))) {
                v.push(item);
            }
        });

        return v;
    }
}

// симметрическая разность
function sym_diff() {
    if (is_s0_empty && !is_s1_empty) {
        return s1;
    } else if (is_s1_empty && !is_s0_empty) {
        return s0;
    } else if (is_s0_empty && is_s1_empty) {
        return [];
    } else {
        let v = [];

        s0.forEach(item => {
            if (!(v.includes(item))) {
                v.push(item);
            }
        });

        s1.forEach(item => {
            if (v.includes(item)) {
                v.splice(v.indexOf(item), 1);
            } else {
                v.push(item);
            }
        });

        return v;
    }
}

function commit() {
    s0 = split(document.getElementById("first").value);
    s1 = split(document.getElementById("second").value);
    is_s0_empty = document.getElementById("cb0").checked;
    is_s1_empty = document.getElementById("cb1").checked;
    let bg = document.getElementById("rb").getElementsByTagName("input");

    if (validate(s0, is_s0_empty) && validate(s1, is_s1_empty)) {
        for (let i = 0; i < bg.length; i++) {
            if (bg.item(i).checked) {
                let ir = undefined;
                switch (bg.item(i).value) {
                    case "union":
                        ir = union(s0, s1);
                        break;
                    case "intersection":
                        ir = intersection(s0, s1);
                        break;
                    case "addition_a":
                        ir = addition_a(s0, s1);
                        break;
                    case "addition_b":
                        ir = addition_b(s0, s1);
                        break;
                    case "sym_diff":
                        ir = sym_diff(s0, s1);
                        break;
                }
                document.getElementById("result").innerHTML = format(ir);
                break;
            }
        }
    }
}
