"use strict";

import { clamp } from "../utils.js";
let prevMoveX = 0;
let prevMoveY = 0;
let scaleX = 1;

const minScaleX = 1.09;
const maxScaleX = 1.17;
let angle = 0;
const maxAngle = 180;

const minDelta = 8;
let throttleX = 0;
let throttleY = 0;
let prevThrottleX = 0;
let prevThrottleY = 0;
let insideThrottle = false;

function onMouseMove(e) {
  if (!mouseCircleInner) return;

  const posX = e.clientX + window.scrollX;
  const posY = e.clientY + window.scrollY;
  throttleX = Math.abs(e.clientX - prevThrottleX);
  throttleY = Math.abs(e.clientY - prevThrottleY);

  if (throttleX < minDelta && throttleY < minDelta) {
    insideThrottle = true;
  } else insideThrottle = false;

  prevThrottleX = e.clientX;
  prevThrottleY = e.clientY;
  scaleX = window.innerWidth / (posX - prevMoveX);
  angle = clamp(scaleX / 20, -maxAngle, maxAngle);
  angle = calculateAngle(posX, posY, posX - prevMoveX, posY - prevMoveY);
  angle = clamp(angle, -90, maxAngle);
  scaleX = clamp(scaleX, minScaleX, maxScaleX);

  mouseCircleInner.style.display = "block";
  prevMoveX = posX;
  prevMoveY = posY;

  gsap.to(mouseCircleInner, {
    translateX: posX,
    y: posY,
    duration: 0.46,
    scaleX: insideThrottle ? 1 : scaleX,
    scaleY: insideThrottle ? 1 : scaleX - 1,
    rotateY: insideThrottle ? 0 : angle,
  });

  setTimeout(() => {
    prevMoveX = posX;
    prevMoveY = posY;
    scaleX = 1;

    gsap.to(mouseCircleInner, {
      translateX: posX,
      y: posY,
      duration: 0.65,
      scaleX: 1,
      scaleY: 1,
      rotateY: 0,
    });
  }, 40);
}
window.addEventListener("mousemove", onMouseMove);

function calculateAngle(x1, y1, x2, y2) {
  // Calculate the angle in radians
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const radians = Math.atan2(deltaY, deltaX);

  // Convert radians to degrees
  const degrees = radians * (180 / Math.PI);
  return degrees;
}
