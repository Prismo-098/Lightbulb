document.addEventListener('DOMContentLoaded', () => {

    let btn = document.querySelector('.btn');
    let body = document.body;
    let audio = document.querySelector('#audio');
    let song = document.querySelector('#song');
    let label = document.querySelector('.label');
    let hint = document.querySelector('.hint');
    let steps = document.querySelectorAll('.steps span');
    let screens = document.querySelectorAll('.bg-video');

    let themes = ['gojo', 'sukuna', 'domain'];
    let names = ['Gojo', 'Sukuna', 'Domain Clash'];
    let current = 0;

    btn.addEventListener('click', () => {
        body.classList.toggle("on");

        // click sound
        audio.currentTime = 0;
        audio.play();

        if (body.classList.contains("on")) {
            videoOn();
        } else {
            videoOff();
        }
    });

    function videoOn() {
        let video = screens[current].querySelector('video');

        // song only starts on gojo
        if (current === 0) {
            song.currentTime = 0;
            song.play();
        }

        video.currentTime = 0; // start from the beginning
        video.play();
    }

    function videoOff() {
        let video = screens[current].querySelector('video');

        video.pause();
        video.currentTime = 0;

        // song stops when domain clash is turned off
        if (current === 2) {
            song.pause();
            song.currentTime = 0;
        }

        // go to the next video
        current = current + 1;
        if (current > 2) {
            current = 0;
        }
        showVideo(current);
    }

    function showVideo(n) {
        // only one screen is visible
        for (let i = 0; i < screens.length; i++) {
            screens[i].classList.remove("active");
            steps[i].classList.remove("active");
            body.classList.remove(themes[i]);
        }
        screens[n].classList.add("active");
        steps[n].classList.add("active");
        body.classList.add(themes[n]);

        label.textContent = names[n];

        // next video name
        let next = n + 1;
        if (next > 2) {
            next = 0;
        }
        hint.textContent = "Next: " + names[next];
    }

    // sometimes loop doesn't work so restart it
    screens.forEach((screen) => {
        let video = screen.querySelector('video');
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    });

    showVideo(0);
});
