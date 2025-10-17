// Questions
const sectionQuestion = document.getElementById("sectionQuestions");
const btnToCart = document.getElementById("toCart");
const userAnswers = {};

sectionQuestion.addEventListener("click", sectionQuestionHandleClick);

function sectionQuestionHandleClick(e) {
  const target = e.target;
  if (target.classList.contains("answers-button")) {
    const questionDiv = target.closest(".question");
    const questionId = questionDiv.id;

    userAnswers[questionId] = target.textContent.trim();
  } else {
    const wrapper = target.closest(".age-wrapper, .answers-button");
    const button = wrapper.querySelector(".answers-button");

    const questionDiv = button.closest(".question");
    const questionId = questionDiv.id;

    userAnswers[questionId] = button.textContent.trim();
  }
}

btnToCart.addEventListener("click", btnToCartHandleClick);

function btnToCartHandleClick() {
  console.log(userAnswers);
}

// Form
const form = document.getElementById("userDataForm");
const submitBtn = document.getElementById("TO_DELIVERY");

submitBtn.addEventListener("click", handleSubmit);

const validators = {
  name: (value) => /^[A-Za-zÀ-ÿ\s'-]{2,}$/.test(value.trim()),
  phone: (value) => /^\+?\d{9,15}$/.test(value.replace(/\s+/g, "")),
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  city: (value) => value.trim().length > 0,
  zip: (value) => /^\d{5}$/.test(value.trim()),
  address: (value) => value.trim().length > 0,
  country: (value) => value.trim().length > 0,
};

// Функція валідації одного поля
function validateField(input) {
  const type = input.dataset.validate;
  const value = input.value;
  const isValid = validators[type] ? validators[type](value) : true;

  const wrapper = document.getElementById(input.id + "Wrapper");
  const invalidMsg = document.getElementById(input.id + "Invalid");

  if (isValid) {
    wrapper.classList.add("valid");
    wrapper.classList.remove("invalid");
    if (invalidMsg) invalidMsg.style.display = "none";
  } else {
    wrapper.classList.add("invalid");
    wrapper.classList.remove("valid");
    if (invalidMsg) invalidMsg.style.display = "block";
  }

  return isValid;
}

// Валідуємо всі поля форми
function validateForm() {
  const inputs = form.querySelectorAll("[data-validate]");
  let isFormValid = true;

  inputs.forEach((input) => {
    const valid = validateField(input);
    if (!valid) isFormValid = false;
  });

  return isFormValid;
}

// Обробник кнопки
function handleSubmit() {
  const isValid = validateForm();

  if (isValid) {
    const formData = {};
    form.querySelectorAll("[data-validate]").forEach((input) => {
      formData[input.name] = input.value.trim();
    });
    console.log(formData);
  }
}
