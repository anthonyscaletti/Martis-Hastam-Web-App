$(document).ready(function(){
    $("#form").on("submit", function(){
        var isComplete = true;

        $(".fileInp").each(function(){
            if($(this).val() === "")
            {
                isComplete = false;
            }
        });
        if(!isComplete)
            return false;
        else
            return true;
    });
});
