import { animate } from 'motion'
import { lerp, getMousePos } from "./utils";

// Grab the mouse position and set it to mouse state
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

export default class Cursor {
  constructor(el) {
    // Varibles
    this.Cursor = el;
    this.Cursor.style.opacity = 0;
    this.hoverAreas = document.querySelectorAll(".hover-area");
    this.cursorText = document.getElementById('cursor-text')
    this.bounds = this.Cursor.getBoundingClientRect();
    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.2 },
      y: { previous: 0, current: 0, amt: 0.2 },
    };
    this.onMouseMoveEv = () => {
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x;
      this.cursorConfigs.y.previous = this.cursorConfigs.y.previous = mouse.y;

      // Set cursor opacity to 1 when hovered on screen
      animate(this.Cursor, {
        opacity: 1
      })
      // Execute scale function
      this.onScaleMouse();

      // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
      requestAnimationFrame(() => this.render());
      // Clean up function
      window.removeEventListener("mousemove", this.onMouseMoveEv);
    };
    // Scale cursor animation
    window.addEventListener("mousemove", this.onMouseMoveEv);
  }

  onScaleMouse() {
    // Loop through all items
    this.hoverAreas.forEach((hoverItem) => {
      // If I am hovering on the item for on page load I want to scale the cursor media
      if (hoverItem.matches(":hover")) {
        this.setInnerText(hoverItem)
        this.ScaleCursor(this.Cursor.children[0], 1, true);
      }
      //On mouse enter scale the media-cursor to .8
      hoverItem.addEventListener("mouseenter", () => {
        // re: episodePlayer, if the player is clicked, the hover-area class is removed to hide the cursor effect.
        if (hoverItem.classList.contains('hover-area')) {
          this.setInnerText(hoverItem)
          this.ScaleCursor(this.Cursor.children[0], 1, true);
        } else {
          this.ScaleCursor(this.Cursor.children[0], 0, false);
        }
      });
      hoverItem.addEventListener('mousedown', () => {
        this.ScaleCursor(this.Cursor.children[0], .8, true);
      })
      //On mouse enter scale the media-cursor to 0
      hoverItem.addEventListener("mouseleave", () => {
        this.ScaleCursor(this.Cursor.children[0], 0, false);
      });

      // //Hover on a tag to expand to 1.2
      // hoverItem.children[1].addEventListener("mouseenter", () => {
      //   this.Cursor.classList.add("media-blend");
      //   this.ScaleCursor(this.Cursor.children[0], 1.2);
      // });
      // // Bring scale back down .8
      // hoverItem.children[1].addEventListener("mouseleave", () => {
      //   this.Cursor.classList.remove("media-blend");
      //   this.ScaleCursor(this.Cursor.children[0], 0.8);
      // });
      const nextButton = document.querySelector('.embla__button--next');
      const prevButton = document.querySelector('.embla__button--prev');

      if (nextButton) {
        nextButton.addEventListener("mouseenter", () => {
          this.setSvg();
          this.ScaleCursor(this.Cursor.children[0], 1, true);
        });
        nextButton.addEventListener("mouseleave", () => {
          this.cursorText.innerHTML = ''; // Clear the SVG
          this.ScaleCursor(this.Cursor.children[0], 0, false);
        });
      }

      if (prevButton) {
        prevButton.addEventListener("mouseenter", () => {
          this.setPrevSvg();
          this.ScaleCursor(this.Cursor.children[0], 1, true);
        });
        prevButton.addEventListener("mouseleave", () => {
          this.cursorText.innerHTML = ''; // Clear the SVG
          this.ScaleCursor(this.Cursor.children[0], 0, false);
        });
      }
    });
  }


  ScaleCursor(el, amount, hideBrowserCursor) {
    document.body.style.cursor = hideBrowserCursor ? "none" : "";
    animate(el, {
      scale: amount
    }, {
      duration: .36
    })
  }

  setInnerText(el) {
    let innerText = el.getAttribute('data-hover-text');
    if (innerText) {
      this.cursorText.innerText = innerText  
    }
  }

  setSvg() {
    const svg = `<svg viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-2.34919e-07 8.41833L18.1319 8.41833M18.1319 8.41833L11.9506 15.4238M18.1319 8.41833L11.9505 1.00075" stroke="#EFEDED" stroke-width="2"/>
    </svg>`;
    this.cursorText.innerHTML = svg;
  }

  setPrevSvg() {
    const svg = `<svg viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8.58167L1.86814 8.58167M1.86814 8.58167L8.04944 1.57624M1.86814 8.58167L8.04951 15.9993" stroke="#EFEDED" stroke-width="2"/>
    </svg>`;
    this.cursorText.innerHTML = svg;
  }

  render() {
    this.cursorConfigs.x.current = mouse.x;
    this.cursorConfigs.y.current = mouse.y;

    // lerp
    for (const key in this.cursorConfigs) {
      // key will be x & y
      this.cursorConfigs[key].previous = lerp(
        this.cursorConfigs[key].previous,
        this.cursorConfigs[key].current,
        this.cursorConfigs[key].amt
      );
    }
    // Setting the cursor x and y to our cursoer html element
    this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`;
    // RAF
    requestAnimationFrame(() => this.render());
  }
}

// if (window.innerWidth > 992) {
//   new Cursor(document.querySelector(".cursor-follower"));
// }