$(function () {
    $(".progressbarPassword").progressbar({
        value: 0
    });
    
});

function ActivaEventoPassword() {
    $("#txtPwdNew").on("keypress", function () {
        //        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 27 || event.keyCode == 32 || event.keyCode == 164) {
        //            // let it happen, don't do anything
        //        }
        //        else {+
    
        var pass = $(this).val(); //+ String.fromCharCode(event.keyCode);
        var score = EvaluaPassword(pass);
        if (score > 100) {
            score = 100;
        }
        $(".progressbarPassword").progressbar({
            value: score
        });
        $("._porcPass").text(' ' + score + '%');
        //        }
    });
}

function EvaluaPassword(p) {
    var intScore = 0;

    // PASSWORD LENGTH
    intScore += p.length;

    if (p.length > 0 && p.length <= 4) {                    // length 4 or less
        intScore += p.length;
    }
    else if (p.length >= 5 && p.length <= 7) {	// length between 5 and 7
        intScore += 10;
    }
    else if (p.length >= 8 && p.length <= 15) {	// length between 8 and 15
        intScore += 15;
        //alert(intScore);
    }
    else if (p.length >= 16) {               // length 16 or more
        intScore += 20;
        //alert(intScore);
    }

    // LETTERS (Not exactly implemented as dictacted above because of my limited understanding of Regex)
    if (p.match(/[a-z]/)) {              // [verified] at least one lower case letter
        intScore += 1;
    }
    if (p.match(/[A-Z]/)) {              // [verified] at least one upper case letter
        intScore += 10;
    }
    // NUMBERS
    if (p.match(/\d/)) {             	// [verified] at least one number
        intScore += 10;
    }
    if (p.match(/.*\d.*\d/)) {            // [verified] at least two numbers
        intScore += 10;
    }
    if (p.match(/.*\d.*\d.*\d/)) {            // [verified] at least three numbers
        intScore += 15;
    }

    // SPECIAL CHAR
    if (p.match(/[!,@,#,$,%,^,&,*,?,_,~]/)) {           // [verified] at least one special character
        intScore += 10;
    }
    // [verified] at least two special characters
    if (p.match(/.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~]/)) {
        intScore += 15;
    }

    // COMBOS
    if (p.match(/(?=.*[a-z])(?=.*[A-Z])/)) {        // [verified] both upper and lower case
        intScore += 15;
    }
    if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) { // [verified] both letters and numbers
        intScore += 15;
    }
    // [verified] letters, numbers, and special characters
    if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,&,*,?,_,~])/)) {
        intScore += 20;
    }

    return intScore;

}