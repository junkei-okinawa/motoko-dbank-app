import { DBank_backend } from "../../declarations/DBank_backend";

async function updateBalance() {
  const currentAmount = await DBank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}

window.addEventListener("load", async function () {
  await updateBalance();
});

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const button = e.target.querySelector("#submit-btn");
  button.setAttribute("disabled", true);

  const target = ["topup-amount", "withdrawal-amount"];
  let element;
  let method;
  let amount;
  target.forEach((async function (elmName) {
    element = document.getElementById(elmName);
    if (element.value) {
      if (elmName === "topup-amount") {
        method = DBank_backend.topUp;
      } else if (elmName === "withdrawal-amount") {
        method = DBank_backend.withdraw;
      };
      amount = parseFloat(element.value)
      // Interact with foo actor, calling method.
      await method(amount);
      await updateBalance();
    };
  }));
  this.reset();
  button.removeAttribute("disabled");
  return false;
});
