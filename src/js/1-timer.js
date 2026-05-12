let userSelectedDate = null;

const startBTN = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
console.log(inputEl);

startBTN.disabled = true;
startBTN.addEventListener('click', setTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBTN.disabled = true;
      return;
    } else {
      startBTN.disabled = false;
    }

    userSelectedDate = selectedDate;
  },
};

function setTimer() {
  startBTN.disabled = true;
  inputEl.disabled = true;

  const intervalId = setInterval(() => {
    const timeNow = new Date();
    const deltaTime = userSelectedDate - timeNow;
    const time = convertMs(deltaTime);
    secondsEl.textContent = addLeadingZero(time.seconds);
    minutesEl.textContent = addLeadingZero(time.minutes);
    hoursEl.textContent = addLeadingZero(time.hours);
    daysEl.textContent = addLeadingZero(time.days);

    if (deltaTime <= 0) {
      clearInterval(intervalId);

      const time = convertMs(0);
      secondsEl.textContent = addLeadingZero(time.seconds);
      minutesEl.textContent = addLeadingZero(time.minutes);
      hoursEl.textContent = addLeadingZero(time.hours);
      daysEl.textContent = addLeadingZero(time.days);

      inputEl.disabled = false;
      startBTN.disabled = true;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

flatpickr('#datetime-picker', options);

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
