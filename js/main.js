$(function() {
    var sentence = 'The quick brown fox jumps over the lazy dog';
    var timerStarted = false;
    var timer = 5;
    var charCount = 0;

    $('textarea').on('keydown', function(e) {
        switch (e.keyCode) {
            case 8:  // Backspace
            case 9:  // Tab
            case 13: // Enter
            case 16: // Shift
            case 17: // Ctrl
            case 18: // Alt
            case 20: // Caps Lock
            case 37: // Left
            case 38: // Up
            case 39: // Right
            case 40: // Down
            case 46: // Delete
                break; // do not count above keys in character count

            default:
                charCount++;
        }

        // start countdown timer on initial keypress
        if (!timerStarted) {
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

