$(document).ready(function(){
    if($("#stat").text() === "Hash Verification Error")
    {
        $("#form").remove();
    }
    else
    {
        setTimeout(function(){
            $("#form").remove();
        }, 30000);

        $("#form").on("submit", function(){
            $("#form").hide();
        });
    }

});
