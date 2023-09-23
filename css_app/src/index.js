import { makePred } from "./classifier.js";
import * as d3 from "d3";

const windowSize = 10;

//const deviceApiKey = "d2a13a746cf437a91ddaba8eed70788e"; // Set your API key here
var x_data = new Array(windowSize).fill(0);
var y_data = new Array(windowSize).fill(0);
var z_data = new Array(windowSize).fill(0);
// Reference to the toggle switch
var texts = document.getElementsByTagName("p");

for (let i = 0; i < texts.length; i++) {
  texts[i].setAttribute("style", "font-size:" + 50 + "px");
}

// Add an event listener to the toggle switch

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

function predict() {
  let x_mean = d3.mean(x_data);
  let x_var = d3.variance(x_data);
  let y_mean = d3.mean(y_data);
  let y_var = d3.variance(y_data);
  let z_mean = d3.mean(z_data);
  let z_var = d3.variance(z_data);
  let pred = makePred([x_mean, x_var, y_mean, y_var, z_mean, z_var]);
  var activity = "";
  if (pred == 1) {
    changeText(
      texts[0],
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    );
    changeFontSize(texts[0], 25);
  } else if (pred == 2) {
    changeText(
      texts[0],
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    );
    changeFontSize(texts[0], 50);
  } else if (pred == 0) {
    changeText(texts[0], "you are running don't read now");
    changeFontSize(texts[0], 75);
  }
}

function changeFontSize(p_element, fontSize) {
  p_element.setAttribute("style", "font-size:" + fontSize + "px");
}

function changeText(p_element, newText) {
  p_element.innerText = newText;
}
