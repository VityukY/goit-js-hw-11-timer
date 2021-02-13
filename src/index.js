/*refs = {
  days: document.querySelector("[data-value='days']"),
  hours: document.querySelector("[data-value='hours']"),
  mins: document.querySelector("[data-value='mins']"),
  secs: document.querySelector("[data-value='secs']"),
};

const targetDate = new Date('Feb 15, 2021');
const targetDateMs = Date.parse(targetDate);
/*const currentDateMs = Date.now();
const differenceInTime = targetDateMs - currentDateMs;*/
/*
function converTimer(differenceInTime) {
  refs.days.textContent = pad(Math.floor(differenceInTime / (1000 * 60 * 60 * 24)));
  refs.hours.textContent = pad(Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  refs.mins.textContent = pad(Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  refs.secs.textContent = pad(Math.floor((differenceInTime % (1000 * 60)) / 1000));
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function countdownTimer() {
  const currentDateMs = Date.now();
  const differenceInTime = targetDateMs - currentDateMs;
  converTimer(differenceInTime);
}

const timerId = setInterval(countdownTimer, 1000);
*/

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.root = document.querySelector(this.selector);
    this.targetDate = targetDate;

    this.refs = {
      days: this.root.querySelector("[data-value='days']"),
      hours: this.root.querySelector("[data-value='hours']"),
      mins: this.root.querySelector("[data-value='mins']"),
      secs: this.root.querySelector("[data-value='secs']"),
    };
    this.intervalId = null;
  }

  updateTime(differenceInTime) {
    this.refs.days.textContent = this.pad(Math.floor(differenceInTime / (1000 * 60 * 60 * 24)));
    this.refs.hours.textContent = this.pad(Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.refs.mins.textContent = this.pad(Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.refs.secs.textContent = this.pad(Math.floor((differenceInTime % (1000 * 60)) / 1000));
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  start() {
    if (this.intervalId != null) {
      return;
    }
    const targetDateInMs = Date.parse(this.targetDate);
    this.intervalId = setInterval(() => {
      const currentDateMs = Date.now();
      const deltaTime = targetDateInMs - currentDateMs;

      if (deltaTime > 0) {
        this.updateTime(deltaTime);
      } else {
        return;
      }
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
  }
  clear() {
    clearInterval(this.intervalId);
    this.refs.days.textContent = this.pad(0);
    this.refs.hours.textContent = this.pad(0);
    this.refs.mins.textContent = this.pad(0);
    this.refs.secs.textContent = this.pad(0);
    this.intervalId = null;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Feb 17, 2021'),
});

timer.start();

const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Mar 17, 2021'),
});

timer2.start();
