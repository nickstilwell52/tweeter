/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const sendTheTweet = () => {
  console.log("You clicked on div 2.");
};

$("#tweet-buttoncounter output").click(sendTheTweet);

/*

// create a function


// put a reference to the "div-two" element in a variable

const theTestTextBox = document.getElementById("texttestarea");


// Many events are fired as you type into a <textarea> input including input, keyup, keypress, and keydown.


// when div2 is clicked, run the function
theTestTextBox.addEventListener('click', (printMessage));
theTestTextBox.addEventListener('input', (printMessage));
theTestTextBox.addEventListener('keyup', (printMessage));
theTestTextBox.addEventListener('keypress', (printMessage));
theTestTextBox.addEventListener('keydown', (printMessage));


*/