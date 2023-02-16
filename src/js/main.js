const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const slider = document.querySelector(".slider-input");
const sliderValueOutput = document.getElementById("slider-value");
const sliderButtons = document.querySelectorAll(".slider-button");
const complexityCheckboxes = document.querySelectorAll(".option-input");
const passwordText = document.getElementById("password");
const copyButton = document.getElementById("copy");
const modalOverlay = document.querySelector(".modal-overlay");
const closeModalBtn = document.getElementById("btn-close-modal");
const badge = document.getElementById("badge");
const strengthImage = document.querySelector(".strength");

const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const special = "!\"#$%&'()*+,-.:;<=>?@[]^_`{|}~";
const allСharacters = [upperLetters, lowerLetters, numbers, special];

let passwordStrength = "veryReliable";
generatePassword();
imageAppearance();

function imageAppearance() {
  setTimeout(() => {
    strengthImage.classList.add("strength--appearance");
  });
}

function generatePassword() {
  let selectedSymbols = "";
  for (let i = 0; i < complexityCheckboxes.length; i++) {
    if (complexityCheckboxes[i].checked) {
      selectedSymbols += allСharacters[i];
    }
  }
  let password = "";
  for (let i = 0; i < slider.value; i++) {
    password +=
      selectedSymbols[Math.floor(Math.random() * selectedSymbols.length)];
  }
  passwordText.innerText = password;

  let passwordStrengthNew = "";
  badge.classList.remove("unreliable", "good", "reliable", "veryReliable");
  if (password.length < 5) {
    badge.innerText = "ОЧЕНЬ НЕНАДЕЖНЫЙ";
    badge.classList.add("unreliable");
    strengthImage.setAttribute("src", "../img/very-unreliable.svg");
    passwordStrengthNew = "veryUnreliable";
  } else if (5 <= password.length && password.length <= 7) {
    badge.innerText = "НЕНАДЕЖНЫЙ";
    badge.classList.add("unreliable");
    strengthImage.setAttribute("src", "../img/unreliable.svg");
    passwordStrengthNew = "unreliable";
  } else if (8 <= password.length && password.length <= 9) {
    badge.innerText = "ХОРОШИЙ  ";
    badge.classList.add("good");
    strengthImage.setAttribute("src", "../img/good.svg");
    passwordStrengthNew = "good";
  } else if (10 <= password.length && password.length <= 11) {
    badge.innerText = "НАДЕЖНЫЙ";
    badge.classList.add("reliable");
    strengthImage.setAttribute("src", "../img/reliable.svg");
    passwordStrengthNew = "reliable";
  } else {
    badge.innerText = "ОЧЕНЬ НАДЕЖНЫЙ";
    badge.classList.add("veryReliable");
    strengthImage.setAttribute("src", "../img/very-reliable.svg");
    passwordStrengthNew = "veryReliable";
  }

  if (passwordStrength !== passwordStrengthNew) {
    strengthImage.classList.remove("strength--appearance");
    passwordStrength = passwordStrengthNew;
    imageAppearance();
  }
}

slider.addEventListener("input", () => {
  sliderValueOutput.innerText = slider.value;
  sliderButtons[0].disabled = false;
  sliderButtons[1].disabled = false;
  generatePassword();
});

sliderButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target === document.getElementById("minus")) {
      e.preventDefault();
      if (slider.value === slider.min) {
        sliderButtons[0].disabled = true;
        return;
      } else {
        sliderButtons[0].disabled = false;
        sliderButtons[1].disabled = false;
      }
      slider.value = +slider.value - 1;
      sliderValueOutput.innerText = slider.value;
      generatePassword();
    }
    if (e.target === document.getElementById("plus")) {
      e.preventDefault();
      if (slider.value === slider.max) {
        sliderButtons[1].disabled = true;
        return;
      } else {
        sliderButtons[0].disabled = false;
        sliderButtons[1].disabled = false;
      }
      slider.value = +slider.value + 1;
      sliderValueOutput.innerText = slider.value;
      generatePassword();
    }
  });
});

closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("modal-overlay--visible");
});

modalOverlay.addEventListener("click", (e) => {
  if (
    e.target === modalOverlay ||
    e.target === document.querySelector(".modal-container")
  ) {
    modalOverlay.classList.remove("modal-overlay--visible");
  }
});

copyButton.addEventListener("click", () => {
  // navigator.clipboard.writeText(passwordText.textContent);

  const textArea = document.createElement("textarea");
  textArea.value = passwordText.textContent;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);

  modalOverlay.classList.add("modal-overlay--visible");
});

complexityCheckboxes.forEach((element) => {
  element.addEventListener("change", () => {
    generatePassword();
    let counterChecked = 0;
    complexityCheckboxes.forEach((checkBox) => {
      counterChecked += +checkBox.checked;
    });
    if (counterChecked === 1) {
      complexityCheckboxes.forEach((checkBox) => {
        if (checkBox.checked) {
          checkBox.disabled = true;
        }
      });
    } else {
      complexityCheckboxes.forEach((checkBox) => {
        checkBox.disabled = false;
      });
    }
  });
});
