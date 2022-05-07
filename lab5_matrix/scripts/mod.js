function doCommit() {
    $.ajax({
        url : "/scripts/mod.php",
        type: "POST",
        data : `graph=${document.getElementById("txtAr").value}&commit=true`,
        success: function(data) {
            document.getElementById("resultView").innerHTML = data;
        },
        error: function(xhr, e) {
        }
    });
}