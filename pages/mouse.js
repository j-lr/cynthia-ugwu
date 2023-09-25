/* eslint-disable no-undef */
import { clamp, calculateAngle } from "../utils.js";

const blendElements = [];
const smallCircle = {
  mouseCircleSize: "0.85rem",
  posXReducer: 8,
  posYReducer: 13.5,
};
const bigCircle = {
  mouseCircleSize: "1.37rem",
  posXReducer: 6.5,
  posYReducer: 14,
};

let circle = smallCircle;

const throttleConfig = {
  minDelta: 8,
};

let prevMoveX = 0;
let prevMoveY = 0;
let scaleX = 1;
const minScaleX = 1.09;
const maxScaleX = 1.17;
let angle = 0;
const maxAngle = 180;
let throttleX = 0;
let throttleY = 0;
let prevThrottleX = 0;
let prevThrottleY = 0;
let insideThrottle = false;

function animateMouseCircleSizeChange(size) {
  // eslint-disable-next-line no-undef
  gsap.to(document.documentElement, {
    "--mouse-circle-size": size,
    duration: 0.37,
  });
}

function getHoveredElement() {
  for (let i = 0; i < blendElements.length; i++) {
    if (blendElements[i].element.matches(":hover")) return blendElements[i];
  }
  return null;
}

function onMouseMove(e) {
  if (!mouseCircleInner) return;

  const hoveredElement = getHoveredElement();

  if (hoveredElement) {
    mouseCircle.style.mixBlendMode = "exclusion";
    circle = hoveredElement.isLarge ? bigCircle : smallCircle;
  } else {
    mouseCircle.style.mixBlendMode = "normal";
    circle = smallCircle;
  }

  animateMouseCircleSizeChange(circle.mouseCircleSize);
  const posX = e.clientX - circle.posXReducer;
  const posY = e.clientY - circle.posYReducer;

  throttleX = Math.abs(e.clientX - prevThrottleX);
  throttleY = Math.abs(e.clientY - prevThrottleY);

  insideThrottle = throttleX < throttleConfig.minDelta && throttleY < throttleConfig.minDelta;

  prevThrottleX = e.clientX;
  prevThrottleY = e.clientY;
  scaleX = window.innerWidth / (posX - prevMoveX);
  scaleX = clamp(scaleX, minScaleX, maxScaleX);

  angle = calculateAngle(posX, posY, posX - prevMoveX, posY - prevMoveY);
  angle = clamp(angle, -90, maxAngle);

  mouseCircleInner.style.display = "block";
  prevMoveX = posX;
  prevMoveY = posY;

  gsap.to(mouseCircleInner, {
    x: posX,
    y: posY,
    scaleX: insideThrottle ? 1 : scaleX,
    scaleY: insideThrottle ? 1 : scaleX - 1,
    rotateY: insideThrottle ? 0 : angle,
    duration: 0.46,
  });

  setTimeout(() => {
    prevMoveX = posX;
    prevMoveY = posY;
    scaleX = 1;

    gsap.to(mouseCircleInner, {
      x: posX,
      y: posY,
      scaleX: 1,
      scaleY: 1,
      rotateY: 0,
      duration: 0.65,
    });
  }, 40);
}

window.addEventListener("mousemove", onMouseMove);
export default function prepareMouseBlendMode() {
  blendElements.length = 0;
  document
    .querySelectorAll(".mouseblend, .mouseblendlarge")
    .forEach((element) => {
      const blendElement = {};
      blendElement.element = element;
      blendElement.isLarge = element.classList.contains("mouseblendlarge");
      blendElements.push(blendElement);
    });
}
