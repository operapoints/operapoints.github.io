

const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext('2d');

const m = 200;  // Height (rows)
const n = 200;  // Width (columns)

var pixelData = new Uint8Array(m * n * 4); // RGBA for each pixel

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

    // Adjust the canvas size in pixels based on m and n
    canvas.width = n;
    canvas.height = m;
}

function update(pixelData) {
    for (let i = 0; i < m * n * 4; i += 4) {
        let rand = Math.random() * 255;
        pixelData[i] = rand;         // Red
        pixelData[i + 1] = rand;       // Green
        pixelData[i + 2] = rand;       // Blue
        pixelData[i + 3] = 255;        // Alpha (opaque)
    }
}

function draw(context, pixelData) {
    const imageData = context.createImageData(n, m);
    for (let i = 0; i < pixelData.length; i++) {
        imageData.data[i] = pixelData[i];
    }
    context.putImageData(imageData, 0, 0);
}

function animate() {
    update(pixelData);
    draw(ctx, pixelData);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();
