const bgCanvas = document.getElementById('bgCanvas');
const ctx = bgCanvas.getContext('2d');

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

let particles = [];

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = (Math.random() * 2 - 1) * 2;
    this.speedY = (Math.random() * 2 - 1) * 2;
}

Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1; 
};

Particle.prototype.draw = function () {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

function init() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(Math.random() * bgCanvas.width, Math.random() * bgCanvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.size <= 0.2) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

bgCanvas.addEventListener('mousemove', function(e) {
    for(let i = 0; i < 5; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

let percentage = 0;

function loadPercentage() {
    if (percentage <= 100) {
        document.getElementById('loadingBar').style.width = percentage + '%'; 

        percentage++;
        setTimeout(loadPercentage, 100); 
    }
}

window.onload = function () {
    init();
    animate();
    loadPercentage();
};

const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const volumeControl = document.getElementById('volumeControl');

audioPlayer.volume = volumeControl.value;

playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerText = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseButton.innerText = 'Play';
    }
});

volumeControl.addEventListener('input', function() {
    audioPlayer.volume = this.value;
});