$(function() {
    var sentence = 'The quick brown fox jumps over the lazy dog';
    var timerStarted = false;
    var timer = 5;
    $('textarea').on('keypress', function(e) {
        // start countdown timer on initial keypress
        if(!timerStarted) {
            timerStarted = true;

            // reduce countdown timer by 1 second
            timer--;
            // update timer on web page
            $('#timer').text(timer);
            // invoke the countdown timer every second
            var intervalID = setInterval(countdownTimer, 1000);

            function countdownTimer() {
                // reduce countdown timer by 1 second
                timer--;
                if (timer === 0) {
                    // Countdown timer has expired: disable typing, stop counting down
                    $('textarea').prop('disabled', true);    
                    clearInterval(intervalID);
                    $('#timer').text(timer);
                } else if (timer < 10) {
                    // prefix times less than ten seconds with 0
                    // update timer on web page
                    $('#timer').text('0' + timer);
                } else {
                    // update timer on web page
                    $('#timer').text(timer);
                }
            }
        }

    });
});

