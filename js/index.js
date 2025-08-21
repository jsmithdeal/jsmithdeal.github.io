$(document).ready(function(){
    $(".navbar-toggler").on("click", function(){
        var btn = $(this);
        var icon = $(".navbar-toggler-icon");

        if (!btn.hasClass("collapsed"))
            icon.css("background-image", "url(images/close.svg)");
        else
            icon.css("background-image", "url(images/hamburger.svg)");
    });
});