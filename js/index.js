//Do these things when the document is ready
$(document).ready(function(){
    try {
        var currPage = sessionStorage.getItem("refreshUrl");

        //If current page hasn't been set, go to home by default
        if (currPage == null || currPage == "")
            navigate("html/home.html");
        else
            navigate(currPage);

        //Change mobile menu button from hamburger to x on menu open
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
    }
    catch (error){
        console.log(error);
    }
});

//Navigate to a new page (i.e. inject new page code into index wrapper)
function navigate(fileUrl) {
    try {
        var nav = $("#navbarNav");
        var fileName = fileUrl.replace("html/", "").replace(".html", "");

        sessionStorage.setItem("refreshUrl", fileUrl);

        //Push current navigation target to state for handling back and forward clicks (in onpopstate)
        if (history.state == null || fileUrl != history.state.stateFileUrl)
            history.pushState({ stateFileUrl: fileUrl }, '', 'index.html');
        
        //Inject new html
        $("#wrapper").html("");
        $("#wrapper").load(history.state.stateFileUrl);

        //Auto-close mobile menu bar on navigate
        if (nav.hasClass("show"))
        {
            nav.removeClass("show");
            $(".navbar-toggler-icon").css("background-image", "url(images/hamburger.svg)");
        }

        track(fileName);
        updateActive(fileName);
    }
    catch (error){
        console.log(error);
    }
}

//Counts unique site/page visits using a counter implemented via cloudflare workers
async function track(fileName){
    try {
        //If cookie doesn't exist then increase counter
        if (fileName != null && fileName != "" && document.cookie.indexOf(`${fileName}=true`) == -1){
            if (fileName == "home")
                await fetch(`https://portfolio.johnpaulsmithdeal.workers.dev?type=total`);

            await fetch(`https://portfolio.johnpaulsmithdeal.workers.dev?type=${fileName}`);

            document.cookie = `${fileName}=true; expires=Fri, 31 Dec 2038 12:00:00 UTC`;
        }
    }
    catch (error){
        console.log(error);
    }
}

//Navigation handling for site links
function navigateLink(target){
    try {
        if (target == "li")
            window.open("https://www.linkedin.com/in/john-paul-smithdeal-b50293102", "_blank").focus();
        else if (target == "gh")
            window.open("https://github.com/jsmithdeal/jsmithdeal.github.io", "_blank").focus();
    }
    catch (error){
        console.log(error);
    }
}

//Updates menu items when one is clicked
function updateActive(fileName) {
    try {
        var targetLink = $(`.nav-item .${fileName}`);

        $(".nav-link").removeClass("active");

        if (targetLink != null){
            targetLink.addClass("active");
        }
    }
    catch (error){
        console.log(error);
    }
}

//Handles loading correct html on back/forward click
window.onpopstate = function (e) {
    try {
        sessionStorage.setItem("refreshUrl", e.state.stateFileUrl);
        $("#wrapper").load(e.state.stateFileUrl);
        updateActive(e.state.stateFileUrl);
    }
    catch (error){
        console.log(error);
    }
}