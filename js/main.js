$(function() {
    var sentence = 'The quick brown fox jumps over the lazy dog';
    var timerStarted = false;
    var timer = 5;
    $('textarea').on('keypress', function(e) {
        // start countdown timer on initial keypress
        if(!timerStarted) {
            timerStarted = true;
            timer--;
            $('#timer').text(timer);
            var intervalID = setInterval(countdownTimer, 1000);
            function countdownTimer() {
                timer--;
                // Countdown timer has expired: disable typing, stop counting down
                if (timer === 0) {
                    $('textarea').prop('disabled', true);    
                    clearInterval(intervalID);
                    $('#timer').text(timer);
                } else if (timer < 10) {
                    $('#timer').text('0' + timer);
                } else {
                    $('#timer').text(timer);
                }
            }
        }

    });
});

