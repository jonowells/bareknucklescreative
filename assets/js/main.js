var body = document.body;
var bgState;
var bg;
var projects;

function setBGState(newState) {
    if (newState === bgState) {
        return;
    }

    body.className = "";
    body.classList.add(newState);
    bgState = newState;
}

var lastKnownScrollPosition = 0;
var ticking = false;

function doScrollActions() {
    if (isOverlap(bg, projects)) {
        setBGState("blurred");
    } else {
        setBGState("default");
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
        window.requestAnimationFrame(function () {
            doScrollActions();
            ticking = false;
        });
    }

    ticking = true;
}

function playVideo(event) {
    event.preventDefault();
    var project = event.target;
    setBGState("playing");
    project.parentElement.classList.add("selected");
}

function pageLoaded() {
    body.classList.add("default");
    bg = document.querySelector(".bg");
    projects = document.querySelector(".projects");
    window.addEventListener("scroll", handleScroll);
    // TODO: Use iScroll for this.
    // https://github.com/cubiq/iscroll
    window.addEventListener("resize", doScrollActions);
    projects.addEventListener("mouseup", playVideo);
    doScrollActions();
}

document.addEventListener("DOMContentLoaded", pageLoaded);