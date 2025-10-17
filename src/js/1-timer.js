import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;
startBtn.disabled = true;
startBtn.style.backgroundColor = '#808080';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chooseDate = selectedDates[0];
    if (chooseDate <= Date.now()) {
      iziToast.show({
        close: false,
        progressBar: false,
        timeout: 3000,
        pauseOnHover: false,
        position: 'topCenter',
        color: 'red',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
      startBtn.style.backgroundColor = '#808080';
    } else {
      startBtn.disabled = false;
      startBtn.style.backgroundColor = '#4e75ff';
      userSelectedDate = chooseDate;
    }
  },
};

flatpickr(inputDate, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  startBtn.style.backgroundColor = '#808080';
  inputDate.disabled = true;

  timerId = setInterval(() => {
    const now = Date.now();
    const diff = userSelectedDate - now;
    if (diff <= 0) {
      clearInterval(timerId);
      addLeadingZero(0);
      inputDate.disabled = false;
      startBtn.style.backgroundColor = '#4e75ff';
      iziToast.show({
        close: false,
        progressBar: false,
        timeout: 3000,
        pauseOnHover: false,
        position: 'topCenter',
        color: 'green',
        message: 'Таймер оновлено',
      });
      return;
    }
    addLeadingZero(diff);
  }, 100);
});

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

function addLeadingZero(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysEl.textContent = days.toString().padStart(2, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
}
