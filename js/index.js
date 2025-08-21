$(document).ready(function(){
    var currPage = sessionStorage.getItem("refreshUrl");

    if (currPage == null || currPage == "")
        navigate("html/home.html");
    else
        navigate(currPage);

    $(".navbar-toggler").on("click", function(){
        var btn = $(this);
        var icon = $(".navbar-toggler-icon");

        if (!btn.hasClass("collapsed"))
            icon.css("background-image", "url(images/close.svg)");
        else
            icon.css("background-image", "url(images/hamburger.svg)");
    });
});

function navigate(fileUrl) {
    sessionStorage.setItem("refreshUrl", fileUrl);

    if (history.state == null || fileUrl != history.state.stateFileUrl)
        history.pushState({ stateFileUrl: fileUrl }, '', 'index.html');
    
    $("#wrapper").html("");
    $("#wrapper").load(history.state.stateFileUrl);
}

window.onpopstate = function (e) {
    sessionStorage.setItem("refreshUrl", e.state.stateFileUrl);
    $("#wrapper").load(e.state.stateFileUrl);
}