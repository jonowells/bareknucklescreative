var body = document.body;
var bgState;
var bgVideo;
var videos;

function setBGVideoState(newState) {
    if (newState === bgState) {
        return;
    }
    body.className = "";
    body.classList.add(newState);
    bgState = newState;
}

function cycleState(event) {
    if (body.classList.contains("default")) {
        setBGVideoState("blurred");
    } else if (body.classList.contains("blurred")) {
        setBGVideoState("playing");
    } else if (body.classList.contains("playing")) {
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
    body.classList.add("default");
    bgVideo = document.querySelector(".bgvideo");
    bgVideo.addEventListener("mouseup", cycleState);
    videos = document.querySelector(".videos");
    handleScroll();
}

document.addEventListener("DOMContentLoaded", pageLoaded);
window.addEventListener('scroll', handleScroll);