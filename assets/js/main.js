var body = document.body;

axios.get('https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/76979871').then(console.log);
axios.get('https://vimeo.com/api/channels/19429990/videos').then(console.log);

function pageLoaded() {
    body.classList.add("default");

    var options = {
      title: false,
      byline: false,
      portrait: false,
      loop: false
    }

    var videos = [
      { id: 242970664 },
      { id: 239165999 },
      { id: 242970664 },
      { id: 229059335 },
      { id: 228213588 },
      { id: 202099709 },
      { id: 202099574 },
      { id: 202099174 }
    ];

    var players = [];

    players[0] = new Vimeo.Player('video01', Object.assign(options, videos[0]));
    players[1] = new Vimeo.Player('video02', Object.assign(options, videos[1]));
    players[2] = new Vimeo.Player('video03', Object.assign(options, videos[2]));
    players[3] = new Vimeo.Player('video04', Object.assign(options, videos[3]));
    players[4] = new Vimeo.Player('video05', Object.assign(options, videos[4]));
    players[5] = new Vimeo.Player('video06', Object.assign(options, videos[5]));
    players[6] = new Vimeo.Player('video07', Object.assign(options, videos[6]));
    players[7] = new Vimeo.Player('video08', Object.assign(options, videos[7]));

    function played() {
      console.log('played the video!');
    }
    players.forEach(function(player) {
      player.on('play', played);
    });
}

document.addEventListener("DOMContentLoaded", pageLoaded);
