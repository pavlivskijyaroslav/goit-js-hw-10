import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector("input[name='delay']");
const submitBtn = document.querySelector("button[type='submit']");

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = input.value;
  const state = form.querySelector("input[name='state']:checked").value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(value => {
      iziToast.show({
        close: false,
        progressBar: false,
        timeout: 3000,
        pauseOnHover: false,
        position: 'topRight',
        color: 'green',
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    })
    .catch(error => {
      iziToast.show({
        close: false,
        progressBar: false,
        timeout: 3000,
        pauseOnHover: false,
        position: 'topRight',
        color: 'red',
        message: `❌ Rejected promise in ${error}ms`,
      });
    });
});
