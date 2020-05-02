$(document).ready(function () {

    var $currentDay = $("#currentDay");
    var $timeblockCtn = $("#timeblockCtn");

    // add time-based user greeting (morning, afternoon, evening)

    $currentDay.text(`Today is ${moment().format("dddd, MMMM Do.")}`);

    // create object for each time block entry
    var myDay = {
        hour: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
        event: "",
    };

    // create function that builds timeblocks
    function makeTimeblock () {

        var timeblocks = [];

        for (let i=0; i < myDay.hour.length; i++) {
            timeblocks.push(
                `
                <div data-id="${i}" class="card">
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="inputEvent" class="col-sm-2 col-form-label">${myDay.hour[i]}</label>
                                <div class="col-sm-8">
                                    <textarea id="inputEvent" class="form-control" type="text" rows="1"></textarea>
                                </div>
                                <div class="col-sm-2">
                                    <button type="submit" class="btn btn-dark mb-2">+</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                `
            );
            $timeblockCtn.html(timeblocks.join("<br>"));
        };
    }

    makeTimeblock();

// create something that takes in text input inside time block

// create function that saves timeblock text input to local storage

// once saved, turn '+' into a checkmark, ease transition

// create function that shows past/present/future

});


