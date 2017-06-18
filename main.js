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

var lastKnownScrollPosition = 0;
var ticking = false;

function doScrollActions() {
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
      doScrollActions();
      ticking = false;
    });
  }
  ticking = true;
}

function playVideo(event) {
  var video = event.target;
  setBGVideoState("playing");
  video.parentElement.classList.add("selected")
}

function pageLoaded() {
  body.classList.add("default");
  bgVideo = document.querySelector(".bgvideo");
  videos = document.querySelector(".videos");
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", doScrollActions);
  videos.addEventListener("mouseup", playVideo);
  doScrollActions();
}

document.addEventListener("DOMContentLoaded", pageLoaded);


