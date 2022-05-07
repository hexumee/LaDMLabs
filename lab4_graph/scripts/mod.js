function doCommit() {
    $.ajax({
        url : "/scripts/mod.php",
        type: "POST",
        data : `commit=true&graph=${document.getElementById("txtAr").value}&start=${document.getElementById("startElem").value}&end=${document.getElementById("endElem").value}`,
        success: function(data) {
            console.log('adasdas');
            document.getElementById("resultView").innerHTML = data;
        },
        error: function(xhr, e) {
            console.log('adasdasdas');
        }
    });
}
