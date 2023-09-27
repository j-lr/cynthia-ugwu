function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Convert to 12-hour clock
  const formattedHours = hours % 12 || 12;

  // Format minutes with leading zero if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Combine the formatted time components
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return formattedTime;
}

function updateTime() {
  const currentTime = getCurrentTime();
  // eslint-disable-next-line no-undef
  time.textContent = `${currentTime} IST`;
}
// const intervalID = setInterval(updateTime(), 30000);
let intervalID;
export function stopTimeComputation() {
  clearInterval(intervalID);
  console.log("time interval cleared");
}
export function beginTimeComputation() {
  const istTime = getCurrentTime();
  // eslint-disable-next-line no-undef
  time.textContent = `${istTime} IST`;

  intervalID = setInterval(updateTime, 30000);
}
