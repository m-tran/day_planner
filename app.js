$(document).ready(function () {

    var $currentDay = $("#currentDay");
    var $timeblockCtn = $("#timeblockCtn");
    var $showAlert = $("#showAlert");
    var $dailyQuote = $("#dailyQuote");
    var textInput = "";
    var greetingTime = "";
    var quote = "";

    $showAlert.hide();

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
    function makeTimeblock() {

        var timeblocks = [];

        for (let i = 0; i < myDay.hour.length; i++) {
            timeblocks.push(
                `
                <div data-id="${i}" class="card">
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="inputEvent" class="col-sm-1 col-form-label">${myDay.hour[i]}</label>
                                <div class="col-sm-10" id="textArea">
                                    <textarea data-id="${i}" id="inputEvent" class="form-control" type="text" rows="1"></textarea>
                                </div>
                                <div class="col-sm-1">
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

    // get quote of the day
    $.ajax({
        type: "GET",
        url: "https://quotes.rest/qod.json",
    }).then(function (response) {
        console.log(response.contents.quotes[0].quote);
        quote = response.contents.quotes[0].quote;
        $dailyQuote.html(`<h2><i>"${quote}"</i></h2>`);
    });

    makeTimeblock();

    // load saved event if exists on document load
    function checkItemExists(id) {
        if (localStorage.getItem(id) !== null) {
            textInput = localStorage.getItem(`${id}`);
            $(`textarea[data-id="${id}"`).val(textInput);
        }
    }

    if (window.localStorage.length !== 0) {
        for (let i = 0; i < myDay.hour.length; i++) {
            checkItemExists(i);
        }
    }

    // save timeblock text input to local storage when clicking submit
    $(document).on("click", ".btn", function (e) {
        e.preventDefault();
        textInput = $(this).parent().siblings("#textArea").find("textarea").val();
        localStorage.setItem(`${$(this).data("id")}`, textInput);

        // once saved, show alert
        $showAlert.text("Well done! Your entry has been saved.");
        $showAlert.fadeTo(4000, 500).slideUp(500, function () {
            $showAlert.slideUp(500);
        });
    });

    // create function that shows past/present/future
    var currentHour = myDay.hourInt;
    for (let i = 0; i < myDay.hourInt.length; i++) {
        if (moment().hour() > currentHour[i]) {
            $(`.card[data-id="${i}"`).attr("style", "background-color: #BCBCBC !important;");
        } else if (moment().hour() === currentHour[i]) {
            $(`.card[data-id="${i}"`).attr("style", "background-color: #FFFFFF !important; border: 3px solid #000000;");
        };
    };

});


// cursor fun - view this codepen https://codepen.io/ReGGae/pen/OavayV

const math = {
    lerp: (a, b, n) => {
        return (1 - n) * a + n * b
    }
}

class Cursor {
    constructor() {
        this.el = document.querySelector('[data-cursor]')
        this.stickies = [...document.querySelectorAll('[data-stick-cursor]')]

        this.data = {
            mouse: {
                x: 0,
                y: 0
            },
            current: {
                x: 0,
                y: 0
            },
            last: {
                x: 0,
                y: 0
            },
            ease: 0.15,
            dist: 100,
            fx: {
                diff: 0,
                acc: 0,
                velo: 0,
                scale: 0
            }
        }

        this.bounds = {
            h: 0,
            a: 0
        }

        this.rAF = null
        this.targets = null

        this.run = this.run.bind(this)
        this.mousePos = this.mousePos.bind(this)
        this.stick = this.stick.bind(this)

        this.state = {
            stick: false
        }

        this.init()
    }

    mousePos(e) {
        this.data.mouse.x = e.pageX
        this.data.mouse.y = e.pageY

        this.data.current.x = e.pageX
        this.data.current.y = e.pageY
    }

    getCache() {
        this.targets = []

        this.stickies.forEach((el, index) => {
            const bounds = el.getBoundingClientRect()

            this.targets.push({
                el: el,
                x: bounds.left + bounds.width / 2,
                y: bounds.top + bounds.height / 2
            })
        })
    }

    stick(target) {
        const d = {
            x: target.x - this.data.mouse.x,
            y: target.y - this.data.mouse.y
        }

        const a = Math.atan2(d.x, d.y)
        const h = Math.sqrt(d.x * d.x + d.y * d.y)

        if (h < this.data.dist && !this.state.stick) {

            this.state.stick = true
            this.data.ease = 0.075

            this.data.current.x = target.x - Math.sin(a) * h / 2.5
            this.data.current.y = target.y - Math.cos(a) * h / 2.5

            this.el.classList.add('is-active')
        } else if (this.state.stick) {

            this.state.stick = false
            this.data.ease = 0.15
        } else if (h > this.data.dist) {

            this.el.classList.remove('is-active')
        }
    }

    run() {
        this.targets.forEach(this.stick)

        this.data.last.x = math.lerp(this.data.last.x, this.data.current.x, this.data.ease)
        this.data.last.y = math.lerp(this.data.last.y, this.data.current.y, this.data.ease)

        this.data.fx.diff = this.data.current.x - this.data.last.x
        this.data.fx.acc = this.data.fx.diff / window.innerWidth
        this.data.fx.velo = + this.data.fx.acc
        this.data.fx.scale = 1 - Math.abs(this.data.fx.velo * 5)

        this.el.style.transform = `translate3d(${this.data.last.x}px, ${this.data.last.y}px, 0) scale(${this.data.fx.scale})`

        this.raf()
    }

    raf() {
        this.rAF = requestAnimationFrame(this.run)
    }

    addListeners() {
        window.addEventListener('mousemove', this.mousePos, { passive: true })
    }

    init() {
        this.getCache()
        this.addListeners()
        this.raf()
    }
}

const cursor = new Cursor()


