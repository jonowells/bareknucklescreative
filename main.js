var bgVideo;
var videos;

function setBGVideoState(newState) {
    bgVideo.className = "bgvideo";
    bgVideo.classList.add(newState);
}

function getBGVideoState(newState) {
    if (bgVideo.classList.contains("playing")) {
        return "playing";
    }
    if (bgVideo.classList.contains("blurred")) {
        return "blurred";
    }
    return "default";
}

function cycleState(event) {
    if (bgVideo.classList.contains("default")) {
        setBGVideoState("blurred");
    } else if (bgVideo.classList.contains("blurred")) {
        setBGVideoState("playing");
    } else if (bgVideo.classList.contains("playing")) {
        setBGVideoState("default");
    }
}

var lastKnownScrollPosition = 0;
var ticking = false;

function doScrollActions(scrollPosition) {
    if (isOverlap(bgVideo, videos)) {
        setBGVideoState("blurred");
    }
    else {
        setBGVideoState("default");
    }
}

function isOverlap(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
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
            doScrollActions(lastKnownScrollPosition);
            ticking = false;
        });
    }
    ticking = true;
}

function pageLoaded() {
    bgVideo = document.querySelector(".bgvideo");
    bgVideo.classList.add("default");
    bgVideo.addEventListener("mouseup", cycleState);

    videos = document.querySelector(".videos");
}

document.addEventListener("DOMContentLoaded", pageLoaded);
window.addEventListener('scroll', handleScroll);