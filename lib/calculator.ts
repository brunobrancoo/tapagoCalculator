import { calcTimeLeft } from "./time-utils";

export function taPago(inFront: string, goal: string) {
  function isPaid() {
    const left = calcTimeLeft(goal);
    let sum = Math.floor(Math.random() * 25);
    for (let x = 0; x < Number.parseInt(inFront); x++) {
      const mediaLigacao = Math.floor(Math.random() * 25);
      sum += mediaLigacao;
    }
    return sum > left ? true : false;
  }

  let pagoCount = 0;
  let naoPagoCount = 0;

  for (let i = 0; i < 10000; i++) {
    isPaid() ? pagoCount++ : naoPagoCount++;
  }

  console.log("[v0] pago count: " + pagoCount);
  const result = (pagoCount / 10000) * 100;
  console.log("[v0] result percentage: " + result);

  if (result == 0) {
    return "Mamou";
  } else if (result == 100) {
    return "Tá pago!";
  } else if (result == 69) {
    return "Nice";
  } else {
    return "Você tem " + result + "% de chance de estar pago.";
  }
}
