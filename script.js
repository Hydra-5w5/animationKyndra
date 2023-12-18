const root = document.querySelector("#app");

const imageUrls = [
  "img/logo001.png",
  "img/logo002.png",
  "img/logo003.png",
  "img/logo004.png",
  "img/logo005.png",
  "img/logo006.png",
  "img/logo007.png",
  "img/logo008.png",
  "img/logo009.png",
  "img/logo010.png",
  "img/logo011.png",
  "img/logo012.png",
  "img/logo013.png",
  "img/logo014.png",
  "img/logo015.png",
];

const maxBubbles = 15; // Set the maximum number of bubbles on the screen
const bubbles = [];

class Bubble {
  constructor(direction) {
    this.bubbleSpan = document.createElement("span");
    this.bubbleSpan.classList.add("bubble");
    root.append(this.bubbleSpan);
    this.imageIndex = this.randomNumber(0, imageUrls.length - 1);
    this.updateImage();
    this.direction = direction;
    this.handlePosition();
    this.bubbleSpan.addEventListener("click", this.bubblePop.bind(this));
    bubbles.push(this);

    this.usedImages = new Set(); // Track used images
    this.chooseUniqueImage();

    this.move();
  }

  chooseUniqueImage() {
    do {
      this.imageIndex = this.randomNumber(0, imageUrls.length - 1);
    } while (this.usedImages.has(this.imageIndex));

    this.usedImages.add(this.imageIndex);
    this.updateImage();
  }

  handlePosition() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const bubbleHeight = 84; // Set the height of the bubble (844px / 10 bubbles)

    this.posY = this.randomNumber(windowHeight - bubbleHeight, 20);

    if (this.direction === "leftToRight") {
      this.posX = windowWidth; // Start from the right edge
      this.moveLeftToRight();
    } else {
      this.posX = 0 - 100; // Start from the left edge
      this.moveRightToLeft();
    }

    this.bubbleSpan.style.height = bubbleHeight + "px";
    this.bubbleSpan.style.width = "100px";

    this.bubbleSpan.style.top = this.posY + "px";
    this.bubbleSpan.style.left = this.posX + "px";
  }

  moveLeftToRight() {
    const speed = 2;
    this.posX -= speed;

    if (this.posX + 100 < 0) {
      this.remove();
    } else if (document.visibilityState === "visible") {
      this.bubbleSpan.style.left = this.posX + "px";
      requestAnimationFrame(() => this.moveLeftToRight());
    }
  }

  moveRightToLeft() {
    const speed = 2;
    this.posX += speed;

    if (this.posX > window.innerWidth) {
      this.remove();
    } else if (document.visibilityState === "visible") {
      this.bubbleSpan.style.left = this.posX + "px";
      requestAnimationFrame(() => this.moveRightToLeft());
    }
  }

  randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  updateImage() {
    this.bubbleSpan.style.backgroundImage = `url(${imageUrls[this.imageIndex]})`;
  }

  bubblePop() {
    this.bubbleSpan.classList.add("bubble--popped");

    setTimeout(() => {
      this.remove(); // Call the removal method after the animation
    }, 2000);
  }

  remove() {
    this.bubbleSpan.remove();
    const index = bubbles.indexOf(this);
    if (index !== -1) {
      bubbles.splice(index, 1);
    }
  }

}

function createNewBubble() {
  if (bubbles.length < maxBubbles && document.visibilityState === "visible") {
    const direction = bubbles.length % 2 === 0 ? "leftToRight" : "rightToLeft";
    new Bubble(direction);
  }
}

setInterval(createNewBubble, 6000);