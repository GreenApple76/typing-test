$(function() {
    var sentence = 'The quick brown fox jumps over the lazy dog';
    var timerStarted = false;
    var timer = 30;
    var charCount = 0;
    var intervalID;

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

                // typing test has finished when user types the same amount
                // of characters contained in the test sentence
                if (charCount === sentence.length) {
                    endTest();
                }
        }

        // start countdown timer on initial keypress
        if (!timerStarted) {
            timerStarted = true;

            // reduce countdown timer by 1 second
            timer--;
            // update timer on web page
            $('#timer').text(timer);
            // invoke the countdown timer every second
            intervalID = setInterval(countdownTimer, 1000);

            function countdownTimer() {
                // reduce countdown timer by 1 second
                timer--;
                if (timer === 0) {
                    // timer expired
                    endTest();
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

    // timer expired or user completed typing entire sentence
    // disable typing, stop countdown timer, update timer on web page
    function endTest() {
        $('textarea').prop('disabled', true);    
        clearInterval(intervalID);
        $('#timer').text('0');
    }
});

