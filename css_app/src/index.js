import { makePred } from "./classifier.js";
import * as d3 from "d3";

const windowSize = 10;

// initialise the arrays to save the windows
var x_data = new Array(windowSize).fill(0);
var y_data = new Array(windowSize).fill(0);
var z_data = new Array(windowSize).fill(0);

// get the html p element to write in it or to change style of it
var texts = document.getElementsByTagName("p");

window.addEventListener("devicemotion", (event) => {
  try {
    if (
      event.acceleration &&
      event.acceleration.x &&
      event.acceleration.y &&
      event.acceleration.z
    ) {
      x_data.push(event.acceleration.x);
      y_data.push(event.acceleration.y);
      z_data.push(event.acceleration.z);

      x_data.shift();
      y_data.shift();
      z_data.shift();
    }

    predict();
  } catch (e) {
    console.error(`Error adding data point: ${e.message}`);
  }
});

// prepare the window. calculate mean and variance and make prediction
// and then change font size and in run change text
function predict() {
  let x_mean = d3.mean(x_data);
  let x_var = d3.variance(x_data);
  let y_mean = d3.mean(y_data);
  let y_var = d3.variance(y_data);
  let z_mean = d3.mean(z_data);
  let z_var = d3.variance(z_data);
  let pred = makePred([x_mean, x_var, y_mean, y_var, z_mean, z_var]);
  // standing
  if (pred == 1) {
    changeText(
      texts[0],
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    );
    changeFontSize(texts[0], 25);
    // walking
  } else if (pred == 2) {
    changeText(
      texts[0],
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    );
    changeFontSize(texts[0], 50);
    //running
  } else if (pred == 0) {
    changeText(texts[0], "you are running don't read now");
    changeFontSize(texts[0], 75);
  }
}
//change size of text
function changeFontSize(p_element, fontSize) {
  p_element.setAttribute("style", "font-size:" + fontSize + "px");
}

//change text
function changeText(p_element, newText) {
  p_element.innerText = newText;
}
