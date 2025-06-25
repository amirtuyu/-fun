const mar = document.querySelector(".mar");
const target = document.querySelector(".target");
const container = document.querySelector(".container");
let counterY = 10;
let counterX = 10;
randomposition();
let checkedwin = true;
let stopTimer;
let checkLoss = true;
let date1;
document.addEventListener("keydown", (event) => {
  flagTimer = false;
  if (event.code == "ArrowUp" && checkedwin == true && checkLoss == true) {
    counterY -= 10;
    mar.style.top = counterY + "px";
  }
  if (event.code == "ArrowDown" && checkedwin == true && checkLoss == true) {
    event.preventDefault();
    counterY += 10;
    mar.style.top = counterY + "px";
  }
  if (event.code == "ArrowRight" && checkedwin == true && checkLoss == true) {
    counterX += 10;
    mar.style.left = counterX + "px";
  }
  if (event.code == "ArrowLeft" && checkedwin == true && checkLoss == true) {
    counterX -= 10;
    mar.style.left = counterX + "px";
  }
  checkCOllision();
  checkedwins();
});

function randomposition() {
  const randomY = Math.floor(Math.random() * container.offsetHeight);
  const randomX = Math.floor(Math.random() * container.offsetWidth);
  target.style.top = randomY + "px";
  target.style.left = randomX + "px";
}

function checkCOllision() {
  const martop = mar.offsetTop;
  const marleft = mar.offsetLeft;
  const targetTop = target.offsetTop;
  const targetleft = target.offsetLeft;
  const marRight = Math.abs(mar.offsetLeft + 60 - container.offsetWidth);
  const marBottom = Math.abs(mar.offsetTop + 60 - container.offsetHeight);
  const targetRight = Math.abs(target.offsetLeft + 15 - container.offsetWidth);
  const targetBottom = Math.abs(target.offsetTop + 15 - container.offsetHeight);

  let comparison = 60;

  const deltaTop = Math.abs(martop - targetTop);
  const deltaLeft = Math.abs(marleft - targetleft);
  const deltaRight = Math.abs(marRight - targetRight);
  const deltaBottom = Math.abs(marBottom - targetBottom);

  if (
    deltaLeft < comparison &&
    deltaTop < comparison &&
    deltaRight < comparison &&
    deltaBottom < comparison
  ) {
    randomposition();
    const marwhidth = mar.offsetWidth;
    const marheight = mar.offsetHeight;

    comparison += 25;

    mar.style.width = marwhidth + 10 + "px";
    mar.style.height = marheight + 10 + "px";
  }
}
function checkedwins() {
  if (mar.offsetWidth > 150 && mar.offsetHeight > 150) {
    checkedwin = false;  
    container.classList.add("wined");
    clearInterval(stopTimer);
    const date2 = moment();
    const result = date2.diff(date1, "seconds");
    mar.innerHTML =`شما برنده شدید رکورد ${result} ثانیه`;
  }
}
changTimer();
function changTimer() {
  const seconds = document.querySelector(".seconds .s-seconds");
  const minute = document.querySelector(".minute .s-minute");
  const hour = document.querySelector(".hour .s-hour");

  const showZiroSeconds = document.querySelector(".seconds .show-ziro-seconds");
  const showZiroMinute = document.querySelector(".minute .show-ziro-minute");
  const showZiroHour = document.querySelector(".hour .show-ziro-hour");

  const input = document.querySelector("#myinput");
  const buttonEnterNumber = document.querySelector("#buttonEnterNumber");
  let flagTimer = true;
  document.addEventListener("keydown", (event) => {
    if (flagTimer == true) {
      if (
        event.code == "ArrowUp" ||
        event.code == "ArrowDown" ||
        event.code == "ArrowRight" ||
        event.code == "ArrowLeft"
      ) {
        stopTimer = setInterval(timehandler, 1000);
        flagTimer = false;
        date1 = moment();
      }
    }
  });
  function timehandler() {
    let secondss = Number(seconds.innerHTML);
    let minutes = Number(minute.innerHTML);
    let hours = Number(hour.innerHTML);
    if (secondss > 0) {
      seconds.innerHTML = secondss - 1;
    }
    if (secondss == 0 && minutes > 0) {
      seconds.innerHTML = 59;
      minute.innerHTML = minutes - 1;
    }
    if (minutes == 0 && hours > 0) {
      minute.innerHTML = 59;
      hour.innerHTML = hours - 1;
    }
    if (secondss == 0 && minutes == 0 && hours == 0) {
      checkLoss = false;
    }
  }
  setInterval(checkShowZiro, 0.5);
  function checkShowZiro() {
    let secondss = Number(seconds.innerHTML);
    if (secondss < 10) {
      showZiroSeconds.innerHTML = 0;
    } else {
      showZiroSeconds.innerHTML = "";
    }

    let minutes = Number(minute.innerHTML);
    if (minutes < 10) {
      showZiroMinute.innerHTML = 0;
    } else {
      showZiroMinute.innerHTML = "";
    }

    let hours = Number(hour.innerHTML);
    if (hours < 10) {
      showZiroHour.innerHTML = 0;
    } else {
      showZiroHour.innerHTML = "";
    }
  }
  buttonEnterNumber.addEventListener("click", changNumber);
  function changNumber() {
    let enterNumber = input.value;
    let numberHour = Math.floor(enterNumber / 3600);
    hour.innerHTML = numberHour;
    let numberMinute = Math.floor((input.value % 3600) / 60);
    minute.innerHTML = numberMinute;
    let numberSeconds = input.value % 60;
    seconds.innerHTML = numberSeconds;
  }
}
setInterval(checkedLoss, 0.5);
function checkedLoss() {
  if (checkLoss != true) {
    mar.innerHTML = "شما باختید";
    container.classList.add("loss-container");
    mar.classList.add("loss-mar");
  }
}


