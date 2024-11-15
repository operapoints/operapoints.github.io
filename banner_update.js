const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');

const m = 200;
const n = 200;

var pixelData = new Uint8Array(m * n * 4);

function resizeCanvas() {
    const aspectRatio = n / m;
    const screenRatio = window.innerWidth / window.innerHeight;

    if (screenRatio > aspectRatio) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerHeight * aspectRatio;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / aspectRatio;
    }
    //canvas.width = n;
    //canvas.height = m;
}


function update(pixelData) {
    for (let i = 0; i < m * n * 4; i += 4) {
        let rand = Math.random() * 255;
        pixelData[i] = rand;
        pixelData[i + 1] = rand;
        pixelData[i + 2] = rand;
        pixelData[i + 3] = 255;
    }
}

function draw(context, pixelData) {
    const imageData = context.createImageData(n, m);
    for (let i = 0; i < pixelData.length; i++) {
        imageData.data[i] = pixelData[i];
    }
    ctx.putImageData(imageData, 0, 0);
}

function animate() {
    update(pixelData);
    draw(ctx, pixelData);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();

