const formEl = document.querySelector('.form');
const delayEl = formEl.elements.delay;

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = formEl.elements.state.value === 'fulfilled';

      if (isSuccess) {
        resolve(`✅ Fulfilled promise in ${delayEl.value}ms`);
      } else {
        reject(`❌ Rejected promise in ${delayEl.value}ms`);
      }
    }, Number(delayEl.value));
  });

  promise
    .then(value => {
      iziToast.success({
        message: value,
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
      });
    });
}

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
