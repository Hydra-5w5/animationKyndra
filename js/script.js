(function() {
  const root = document.querySelector(".app");

  const imageUrls = [
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo001.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo002.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo003.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo004.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo005.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo006.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo007.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo008.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo009.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo010.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo011.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo012.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo013.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo014.png",
    "http://cidweb37.sg-host.com/wp-content/uploads/2023/12/logo015.png",
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

      if (this.direction === "leftToRight") {
        this.moveLeftToRight();
      } else {
        this.moveRightToLeft();
      }
    }

    chooseUniqueImage() {
      do {
        this.imageIndex = this.randomNumber(0, imageUrls.length - 1);
      } while (this.usedImages.has(this.imageIndex));

      this.usedImages.add(this.imageIndex);
      this.updateImage();
    }

    handlePosition() {
      const windowHeight = window.innerHeight * 0.8;
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
})();