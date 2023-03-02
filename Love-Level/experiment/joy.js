let image = document.querySelector('img');
document.body.style.backgroundColor = "black"

window.addEventListener("keydown", (event) => {
    let k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            // left arrow or a
            image.src = './leftstick.png'
        } else if (k == 38 || k == 87) {
            // up arrow or w
            image.src = './topstick.png'
        } else if (k == 39 || k == 68) {
            // right arrow or d
            image.src = './rightstick.png'
        } else if (k == 40 || k == 83) {
            // bottom arrow or s
            image.src = './bottomstick.png'
        }
    }, 0);
});

window.addEventListener("keyup", (event) => {
    let k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            // left arrow or a
            image.src = './middlestick.png'
        } else if (k == 38 || k == 87) {
            // up arrow or w
            image.src = './middlestick.png'
        } else if (k == 39 || k == 68) {
            // right arrow or d
            image.src = './middlestick.png'
        } else if (k == 40 || k == 83) {
            // bottom arrow or s
            image.src = './middlestick.png'
        }
    }, 0);
});
