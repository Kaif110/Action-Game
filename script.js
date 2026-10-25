let score = 0;
cross = true;

let audio = new Audio("music.mp3");
let audiogo = new Audio("gameover.mp3");
setInterval(() => {
  audio.play();
}, 1000);

document.onkeydown = function (e) {
  console.log("Key code is: ", e.keyCode);
  if (e.keyCode == 38) {
    dino = document.querySelector(".dino");
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }
if (e.key === "ArrowRight") {
    dino = document.querySelector(".dino");

    let dinoX = parseInt(
        window.getComputedStyle(dino).getPropertyValue("left")
    );

    let container = document.querySelector(".gameContainer");
    let maxLeft = container.clientWidth - dino.offsetWidth;

    dino.style.left = Math.min(dinoX + 120, maxLeft) + "px";
}
if (e.key === "ArrowLeft") {
    dino = document.querySelector(".dino");

    let dinoX = parseInt(
        window.getComputedStyle(dino).getPropertyValue("left")
    );
    dino.style.left = Math.max(dinoX - 112, 0) + "px";
}
};

setInterval(() => {
  dino = document.querySelector(".dino");
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");

  dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left"),
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top"),
  );

  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);
  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerHTML = "Game Over";
    obstacle.classList.remove("obstacleAni");
    audiogo.play();
    setTimeout(() => {
      audiogo.pause();
      audio.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      let aniDuration = parseFloat(
        window.getComputedStyle(obstacle).animationDuration,
      );

      let minDuration = 4.5;

      if (aniDuration > minDuration) {
        let newDuration = Math.max(minDuration, aniDuration - 0.1);
        obstacle.style.animationDuration = newDuration + "s";
      }
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}
