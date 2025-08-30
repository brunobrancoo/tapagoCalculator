// import { calcTimeLeft } from "./time-utils.js"
//
// const inputs = document.querySelectorAll("input")
// const button = document.querySelector("button")
// const result = document.querySelector(".result")
// button.addEventListener("click", () => {
//   result.innerHTML = taPago(inputs[0].value, `${inputs[1].value}:00`)
//   result.innerHTML === "Mamou" ? result.classList.add("red") : result.classList.remove("red")
// })
//
// inputs.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     result.innerHTML = taPago(inputs[0].value, `${inputs[1].value}:00`)
//     result.innerHTML === "Mamou" ? result.classList.add("red") : result.classList.remove("red")
//   } else null
// })
//
// function taPago(inFront, goal) {
//   function isPaid() {
//     const left = calcTimeLeft(goal)
//     let sum = Math.floor(Math.random() * 25)
//     for (let x = 0; x < inFront; x++) {
//       const mediaLigacao = Math.floor(Math.random() * 25)
//       sum += mediaLigacao
//     }
//     return sum > left ? true : false
//   }
//   let pagoCount = 0
//   let naoPagoCount = 0
//   for (let i = 0; i < 10000; i++) {
//     isPaid() ? pagoCount++ : naoPagoCount++
//   }
//   console.log("pago count" + pagoCount)
//   const result = (pagoCount / 10000) * 100
//   console.log(result)
//
//   if (result == 0) {
//     return "Mamou"
//   } else if (result == 100) {
//     return "Tá pago!"
//   } else if (result == 69) {
//     return "Nice"
//   } else {
//     return "Você tem " + result + "% de chance de estar pago."
//   }
// }
