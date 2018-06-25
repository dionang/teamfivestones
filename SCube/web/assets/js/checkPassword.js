var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = "[a-z]";
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
        letter.classList.remove("glyphicon-remove");
        letter.classList.add("glyphicon-ok");
        letter.style.color = "#00A41E";
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
        letter.classList.remove("glyphicon-ok");
        letter.classList.add("glyphicon-remove");
        letter.style.color = "#FF0004";
    }

    // Validate capital letters
    var upperCaseLetters = "[A-Z]";
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        capital.classList.remove("glyphicon-remove");
        capital.classList.add("glyphicon-ok");
        capital.style.color = "#00A41E";
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
        capital.classList.remove("glyphicon-ok");
        capital.classList.add("glyphicon-remove");
        capital.style.color = "#FF0004";
    }

// Validate numbers
    var numbers = "[0-9]";
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
        number.classList.remove("glyphicon-remove");
        number.classList.add("glyphicon-ok");
        number.style.color = "#00A41E";
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
        number.classList.remove("glyphicon-ok");
        number.classList.add("glyphicon-remove");
        number.style.color = "#FF0004";
    }

    // Validate length
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        length.classList.remove("glyphicon-remove");
        length.classList.add("glyphicon-ok");
        length.style.color = "#00A41E";
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        length.classList.remove("glyphicon-ok");
        length.classList.add("glyphicon-remove");
        length.style.color = "#FF0004";
    }
}