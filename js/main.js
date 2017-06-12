var bgVideo;

function cycleState(event) {
    var video = event.target;

    function replaceVideoClass(oldClass, newClass) {
        video.classList.remove(oldClass);
        video.classList.add(newClass);
    }

    if (video.classList.contains("default")) {
        replaceVideoClass("default", "blurred");
    } else if (video.classList.contains("blurred")) {
        replaceVideoClass("blurred", "playing");
    } else if (video.classList.contains("playing")) {
        replaceVideoClass("playing", "default");
    }
}

function pageLoaded() {
    bgVideo = document.querySelector(".bgvideo");
    bgVideo.classList.add("default");
    bgVideo.addEventListener("mouseup", cycleState);
}

document.addEventListener("DOMContentLoaded", pageLoaded);

var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
    // do something with the scroll position
}

function handleScroll(event) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function() {
            doSomething(last_known_scroll_position);
            ticking = false;
        });
    }
    ticking = true;
}

window.addEventListener('scroll', handleScroll);