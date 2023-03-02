let image = document.querySelector('img');

window.addEventListener("keydown", (event) => {
    let k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            // left arrow or a
            image.src = './e4.png'
        } else if (k == 38 || k == 87) {
            // up arrow or w
            image.src = './e2.png'
        } else if (k == 39 || k == 68) {
            // right arrow or d
            image.src = './e3.png'
        } else if (k == 40 || k == 83) {
            // bottom arrow or s
            image.src = './e5.png'
        }
    }, 0);
});

window.addEventListener("keyup", (event) => {
    let k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            // left arrow or a
            image.src = './e1.png'
        } else if (k == 38 || k == 87) {
            // up arrow or w
            image.src = './e1.png'
        } else if (k == 39 || k == 68) {
            // right arrow or d
            image.src = './e1.png'
        } else if (k == 40 || k == 83) {
            // bottom arrow or s
            image.src = './e1.png'
        }
    }, 0);
});
