import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const startButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const timerInput = document.querySelector('#datetime-picker');

startButton.addEventListener('click', onClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateCheck(selectedDates);
  },
};

let userSelectedDate = null;
let currentDate;

const flatpickrInstance = flatpickr(timerInput, options);

function dateCheck(selectedDates) {
  userSelectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();
  if (!userSelectedDate || userSelectedDate <= currentDate) {
    startButton.disabled = true;
    iziToast.error({
      message: 'Please choose a date in the future',
    });
  } else {
    startButton.disabled = false;
  }
}

startButton.disabled = true; 

function onClick() {
  const userSelectedDate = flatpickrInstance.selectedDates[0].getTime();
  const intervalId = setInterval(() => {
    currentDate = new Date().getTime(); 
    const timeRemaining = userSelectedDate - currentDate; 
    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      timerInput.disabled = false;
      return;
    }
    const time = convertMs(timeRemaining);
    updateTimer(time);
  }, 1000);

  startButton.disabled = true;
  timerInput.disabled = true;
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function updateTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
};