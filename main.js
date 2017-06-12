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

var lastKnownScrollPosition = 0;
var ticking = false;

function doSomething(scroll_pos) {
    // do something with the scroll position
}

function isScrolledIntoView(element) {
    var elemTop = element.getBoundingClientRect().top;
    var elemBottom = element.getBoundingClientRect().bottom;
    var isVisible = elementTop < window.innerHeight && elementBottom >= 0;
    return isVisible;
}

function handleScroll(event) {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function() {
            doSomething(lastKnownScrollPosition);
            ticking = false;
        });
    }
    ticking = true;
}

window.addEventListener('scroll', handleScroll);