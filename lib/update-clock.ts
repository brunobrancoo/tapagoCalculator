// function updateClock() {
//   const now = new Date()
//
//   const hours = now.getHours()
//   const minutes = now.getMinutes()
//   const seconds = now.getSeconds()
//
//   const currentTime = `${hours}:${minutes}:${seconds}`
//
//   return currentTime
// }
//
// function showClock() {
//   const showClock = updateClock().split(":")
//   showClock[0] < 10 ? (showClock[0] = "0" + showClock[0]) : showClock[0]
//   showClock[1] < 10 ? (showClock[1] = "0" + showClock[1]) : showClock[1]
//   showClock[2] < 10 ? (showClock[2] = "0" + showClock[2]) : showClock[2]
//
//   const showHours = showClock[0]
//   const showMinutes = showClock[1]
//   const showSeconds = showClock[2]
//
//   const showTime = `${showHours}:${showMinutes}:${showSeconds}`
//
//   return showTime
// }
//
// function setClock() {
//   document.querySelector(".clock").innerHTML = showClock()
// }
// setClock()
// setInterval(updateClock, 1000)
// setInterval(setClock, 1000)
//
// function calcTimeLeft(timeToGo) {
//   const currentTimeArray = updateClock().split(":")
//   const timeToGoArray = timeToGo.split(":")
//
//   if (currentTimeArray[2] < 10) {
//     currentTimeArray[2] = "0" + currentTimeArray[2]
//   } else {
//   }
//   const currentHourInSeconds = (currentTimeArray[0] * 3600 + currentTimeArray[1] * 60 + currentTimeArray[2]) / 100
//
//   const timeToGoInSeconds = (timeToGoArray[0] * 3600 + timeToGoArray[1] * 60 + timeToGoArray[2]) / 100
//
//   const difference = timeToGoInSeconds - currentHourInSeconds
//
//   const result = difference / 60
//   return Math.round(result)
// }
//
// setInterval(() => {
//   calcTimeLeft("14:00:00")
// }, 1000)
//
// export { calcTimeLeft, showClock }
