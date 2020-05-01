console.log(moment().format());

var $currentDay = $("#currentDay")
$currentDay.text(`today is ${moment().format("dddd, MMMM Do, YYYY")}`);