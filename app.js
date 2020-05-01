var $currentDay = $("#currentDay");

$currentDay.text(`today is ${moment().format("dddd, MMMM Do, YYYY")}`);

// create object for each time block entry
var myDay = {
    hour: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"],
    event: "",
};

// create function that builds timeblocks

// create something that takes in text input inside time block

// create function that saves timeblock text input to local storage

// create function that shows past/present/future
