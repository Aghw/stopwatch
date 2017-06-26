// button controls
const start = document.querySelector('button.start');
const stop = document.querySelector('button.stop');
const lap = document.querySelector('button.lap');
const reset = document.querySelector('button.reset');

// DOM elements that I need to update
const lapList = document.querySelector('#lapList');
const stopwatchTime = document.querySelector('#stopwatchTime');

// constats that shouldn't even chagne
const laps = [];
const intervalRate = 10; // update the stopwatch every 10 milliseconds

// values that will change pretty often
let intervalId = null;
let rawTime = 0;


// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}


// start the stopwatch by creating a new interval
// and we will store the interval id so we can manipulate the
// interval later
function stopwatchStart(event) {
  event.preventDefault();
  // console.log('started!');

  // every 10 millionseconds, update the stopwatch
  intervalId = setInterval(stopwatchUpdate, intervalRate);
}

// adds the interval to the stopwatch time since the last "tick"
// then update the DOM with the new stopwatch time
function stopwatchUpdate(event) {
  rawTime += intervalRate;
  stopwatchTime.innerHTML = formatTime(rawTime);
}


// stops the stopwatch by clearing the interval
function stopwatchStop(event) {
  event.preventDefault();
  // console.log('Stoped!');

  clearInterval(intervalId);
}


function clearLap()
{
    var ul = document.querySelector("#lapList");
    var orderList = document.querySelectorAll("li");

    for(let li of orderList)
      ul.removeChild(li);

}


function cleanLap() {
    //clear lap
    let length = laps.length;
    let i = 0;
    lapCounter = 0; // reset the counting of lapcounter

    while(i++ < length) {
      laps.pop();
    }
}



function drawList() {
  // This func builds a list laps
  // prints to HTML
  // var ul = document.createElement("ul");
  var ul = document.querySelector("#lapList");

  //clear lap
  clearLap()
  let lapCounter = 0;

  for (let laptime of laps) {
    let text = `Lap-${++lapCounter}  ${laptime}`;
    var ltime = document.createTextNode(text);
    var li = document.createElement("li");
    li.appendChild(ltime);
    ul.appendChild(li);
  }
}


// takes laps of the stopwatch by taking snapshot the interval
function stopwatchLap(event) {
  event.preventDefault();
  // console.log('lap!');

  // add the time to array
  let laptime = stopwatchTime.innerText;
  // console.log(laptime);

  // make sure the same time doesn't get laped more than once
  if (!laps.includes(laptime)) {
    // let lapdata = lapCounter++;
    laps.push(laptime);
  }

  //display laptime
  drawList();
}

// resets the stopwatch time
function stopwatchReset(event) {
  event.preventDefault();
  // console.log('Reset!');

  // stop the interval
  clearInterval(intervalId);

  // reset the time to 0
  stopwatchTime.innerText = 0;

  //clear lap
  clearLap()

  //clean lap
  cleanLap()
}


// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}



document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!');

  start.addEventListener("click", stopwatchStart);
  stop.addEventListener("click", stopwatchStop);
  lap.addEventListener("click", stopwatchLap);
  reset.addEventListener("click", stopwatchReset);

})
