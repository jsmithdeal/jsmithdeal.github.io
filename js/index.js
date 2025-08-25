$(document).ready(function(){
    var currPage = sessionStorage.getItem("refreshUrl");

    if (currPage == null || currPage == "")
        navigate("html/home.html");
    else
        navigate(currPage);

    $(".navbar-toggler").on("click", function(){
        var btn = $(this);
        var icon = btn.find(".navbar-toggler-icon");

        if (!btn.hasClass("collapsed"))
            icon.css("background-image", "url(images/close.svg)");
        else
            icon.css("background-image", "url(images/hamburger.svg)");
    });

    if (!$("navbar-toggler").hasClass("collapsed"))
        $("navbar-toggler").addClass("collapsed");
});

function navigate(fileUrl) {
    var nav = $("#navbarNav");
    sessionStorage.setItem("refreshUrl", fileUrl);

    if (history.state == null || fileUrl != history.state.stateFileUrl)
        history.pushState({ stateFileUrl: fileUrl }, '', 'index.html');
    
    $("#wrapper").html("");
    $("#wrapper").load(history.state.stateFileUrl);

    if (nav.hasClass("show"))
    {
        nav.removeClass("show");
        $(".navbar-toggler-icon").css("background-image", "url(images/hamburger.svg)");
    }

    updateActive(fileUrl);
}

function navigateLink(target){
    if (target == "li")
        window.open("https://www.linkedin.com/in/john-paul-smithdeal-b50293102", "_blank").focus();
    else if (target == "gh")
        window.open("https://github.com/jsmithdeal/jsmithdeal.github.io", "_blank").focus();
}

function updateActive(fileUrl) {
    var fileName = fileUrl.replace("html/", "").replace(".html", "");
    var targetLink = $(`.nav-item .${fileName}`);

    $(".nav-link").removeClass("active");

    if (targetLink != null){
        targetLink.addClass("active");
    }
}

window.onpopstate = function (e) {
    sessionStorage.setItem("refreshUrl", e.state.stateFileUrl);
    $("#wrapper").load(e.state.stateFileUrl);
    updateActive(e.state.stateFileUrl);
}