import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const snackbarForm = document.querySelector('.form');
const snackbarButton = document.querySelector('button[type="submit"]');
 
  
snackbarForm.addEventListener('submit', createPromise);
snackbarButton.addEventListener('click', createPromise);

function createPromise(event) {
  event.preventDefault();
 const stateInput = document.querySelector('input[name="state"]:checked');
 const delayInput = document.querySelector('input[name="delay"]');
  const delay = parseInt(delayInput.value);
  const state = stateInput.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
      });
    });
}
