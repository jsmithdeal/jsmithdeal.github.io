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

function navigateLink(target){
    if (target == "li")
        window.open("https://www.linkedin.com/in/john-paul-smithdeal-b50293102", "_blank").focus();
    else if (target == "gh")
        window.open("https://github.com/jsmithdeal", "_blank").focus();
}

window.onpopstate = function (e) {
    sessionStorage.setItem("refreshUrl", e.state.stateFileUrl);
    $("#wrapper").load(e.state.stateFileUrl);
}