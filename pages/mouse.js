"use strict";

import { clamp } from "../utils.js";
let prevX = 0,
  prevY = 0,
  deltaX = 0,
  deltaY = 0;

const minScaleX = 1.09;
const maxScaleX = 1.17;
let angle = 0;
const maxAngle = 180;
const winWidth = window.innerWidth / 1;
const minDelta = 8;
let throttleX = 0;
let throttleY = 0;
let prevThrottleX = 0;
let prevThrottleY = 0;
let insideThrottle = false;
window.addEventListener("mousemove", function (e) {
  if (!mouseCircle) return;

  const posX = e.clientX + window.scrollX;
  const posY = e.clientY + window.scrollY;
  throttleX = Math.abs(e.clientX - prevThrottleX);
  throttleY = Math.abs(e.clientY - prevThrottleY);

  if (throttleX < minDelta && throttleY < minDelta) {
    insideThrottle = true;
  } else insideThrottle = false;

  console.log(insideThrottle);
  prevThrottleX = e.clientX;
  prevThrottleY = e.clientY;
  deltaX = winWidth / (posX - prevX);
  angle = clamp(deltaX / 20, -maxAngle, maxAngle);
  angle = calculateAngle(posX, posY, posX - prevX, posY - prevY);
  angle = clamp(angle, -90, maxAngle);
  deltaX = clamp(deltaX, minScaleX, maxScaleX);
  deltaY = posY - prevY;

  mouseCircle.style.display = "block";
  prevX = posX;
  prevY = posY;

  gsap.to(mouseCircle, {
    translateX: posX,
    y: posY,
    duration: 0.46,
    scaleX: insideThrottle ? 1 : deltaX,
    scaleY: insideThrottle ? 1 : deltaX - 1,
    rotateY: insideThrottle ? 0 : angle,
  });

  setTimeout(() => {
    prevX = posX;
    prevY = posY;

    gsap.to(mouseCircle, {
      translateX: posX,
      y: posY,
      duration: 0.65,
      scaleX: 1,
      scaleY: 1,
      rotateY: 0,
    });
  }, 40);
});

function calculateAngle(x1, y1, x2, y2) {
  // Calculate the angle in radians
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const radians = Math.atan2(deltaY, deltaX);

  // Convert radians to degrees
  const degrees = radians * (180 / Math.PI);
  return degrees;
}
