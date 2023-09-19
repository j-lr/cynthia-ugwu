"use strict";

let lastRunTime = 0;

export function throttle(callback, delay) {
  const currentTime = Date.now();

  if (currentTime - lastRunTime >= delay) {
    callback();
    lastRunTime = currentTime;
  }
}

function mouseThrottle(mousemove, prevX, prevY) {}
