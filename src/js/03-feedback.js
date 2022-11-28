import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');

const FEEDBACK_STATE = 'feedback-form-state';

formEl.addEventListener('input', throttle(onFormValue, 500));
formEl.addEventListener('submit', onFormSubmit);

formSavedData();

function onFormValue(e) {
  localStorage.setItem(
    FEEDBACK_STATE,
    JSON.stringify({ email: inputEl.value, message: textareaEl.value })
  );
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log(
    JSON.parse(`{"email":"${inputEl.value}","message":"${textareaEl.value}"}`)
  );

  e.target.reset();
}

function formSavedData() {
  const savedData = localStorage.getItem(FEEDBACK_STATE);
  const parsedData = JSON.parse(savedData);
  console.log(parsedData);

  if (parsedData) {
    inputEl.value = parsedData.email;
    textareaEl.value = parsedData.message;
  } else {
    return '';
  }
}
