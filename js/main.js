$(function() {
    var testText = 'The quick brown fox jumps over the lazy dog';
    var timerStarted = false;
    var timer = 60;
    var charCount = 0;
    var intervalID;

    $('textarea').on('focus', function() {
        $(this).prop('placeholder', '');
    });

    $('textarea').on('keydown', function(e) {
        switch (e.keyCode) {
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
                break; // do not count above keys in character count
            case 46: // Delete
            case 8:  // Backspace
                // remove deleted characters from character count if
                // 1 or more characters were deleted
                if (charCount > 0) {
                    charCount--;
                }
                break;

            default:
                charCount++;
                $('#wpm').text(calcSpeed);
                // typing test has finished when user types the same amount
                // of characters contained in the testText 
                if (charCount === testText.length) {
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
        }
    });

    // a 60 second countdown timer that gets invoked every second
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

    // timer expired or user completed typing entire sentence
    // disable typing, stop countdown timer, update timer on web page
    function endTest() {
        // wrap textarea disabling in setTimeout to provide slight
        // delay, allowing keyup/change event(?) time to display final character
        // in textarea before being disabled
        setTimeout(function() {$('textarea').prop('disabled', true);}, 0);
        clearInterval(intervalID);
        $('#timer').text('0');
        $('#wpm').text(calcSpeed);
        $('#adjusted-wpm').text(calcAdjustedSpeed);
    }

    // calculate typing speed
    function calcSpeed() {
        return Math.round((charCount / 5) / ((60 - timer) / 60));
    }

    // calculated adjusted typing speed
    function calcAdjustedSpeed() {
        var inputText = $('textarea').val();
        var inputWords = inputText.split(' ');
        var testWords = testText.split(' ');
        var errorWordCount = 0;

        // determine number of uncorrected typed words
        for (var i = 0; i < inputWords.length; i++) {
            if (inputWords[i] !== testWords[i]) {
                errorWordCount++;
            }
        }

        return calcSpeed() - errorWordCount;
    }
});

