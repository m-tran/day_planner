$(document).ready(function () {

    var $currentDay = $("#currentDay");
    var $timeblockCtn = $("#timeblockCtn");
    var textInput = "";
    var greetingTime = "";

    // add time-based user greeting (morning, afternoon, evening)
    if (moment().hour() >= 17) {
        greetingTime = "evening";
    } else if (moment().hour() >= 12) {
        greetingTime = "afternoon";
    } else {
        greetingTime = "morning";
    }

    $currentDay.text(`Good ${greetingTime}. Today is ${moment().format("dddd, MMMM Do.")}`);

    // create object for each time block entry
    var myDay = {
        hour: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
        hourInt: [9, 10, 11, 12, 13, 14, 15, 16, 17],
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
                                <div class="col-sm-8" id="textArea">
                                    <textarea data-id="${i}" id="inputEvent" class="form-control" type="text" rows="1"></textarea>
                                </div>
                                <div class="col-sm-2">
                                    <button data-id="${i}" type="submit" class="btn btn-dark mb-2">+</button>
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

    // load saved event if exists on document load
    function checkItemExists (id) {
        if (localStorage.getItem(id) !== null) {
            textInput = localStorage.getItem(`${id}`);
            $(`textarea[data-id="${id}"`).val(textInput);
        }
    }

    if (window.localStorage.length !== 0) {
        for (let i=0; i < myDay.hour.length; i++) {
            checkItemExists(i);
        }
    }

    // save timeblock text input to local storage when clicking submit
    $(document).on("click", ".btn", function(e) {
        e.preventDefault();
        textInput = $(this).parent().siblings("#textArea").find("textarea").val();
        localStorage.setItem(`${$(this).data("id")}`, textInput);

        // once saved, turn '+' into a checkmark, ease transition
    });

    // create function that shows past/present/future
    console.log(moment().hour());
    // console.log($(".card").css());
    var currentHour = myDay.hourInt;
    for (let i=0; i < myDay.hourInt.length; i++) {
        if (moment().hour() > currentHour[i]) {
            $(`.card[data-id="${i}"`).attr("style", "background-color: #BCBCBC !important;");
        } else if (moment().hour() === currentHour[i]) {
            $(`.card[data-id="${i}"`).attr("style", "background-color: #FFFFFF !important; border: 3px solid #000000;");
        };
    };
    
    
});


