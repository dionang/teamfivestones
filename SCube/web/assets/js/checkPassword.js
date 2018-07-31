var myInput = document.getElementById("password");
var confirm = document.getElementById("confirm");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var space = document.getElementById("space");
var match = document.getElementById("match");

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
    
    // Validate special 
    var special = /[^a-zA-Z0-9\-\/]/;
    if (myInput.value.match(special)) {
        space.classList.remove("invalid");
        space.classList.add("valid");
        space.classList.remove("glyphicon-remove");
        space.classList.add("glyphicon-ok");
        space.style.color = "#00A41E";
    } else {
        space.classList.remove("valid");
        space.classList.add("invalid");
        space.classList.remove("glyphicon-ok");
        space.classList.add("glyphicon-remove");
        space.style.color = "#FF0004";
    }
    
    // Validate confirm password
    if (myInput.value === confirm.value) {
        match.classList.remove("invalid");
        match.classList.add("valid");
        match.classList.remove("glyphicon-remove");
        match.classList.add("glyphicon-ok");
        match.style.color = "#00A41E";
        confirm.setCustomValidity("");
    } else {
        match.classList.remove("valid");
        match.classList.add("invalid");
        match.classList.remove("glyphicon-ok");
        match.classList.add("glyphicon-remove");
        match.style.color = "#FF0004";
        confirm.setCustomValidity("Passwords Don't Match");
    }
};

confirm.onkeyup = function () {
    // Validate confirm password
    if (myInput.value === confirm.value) {
        match.classList.remove("invalid");
        match.classList.add("valid");
        match.classList.remove("glyphicon-remove");
        match.classList.add("glyphicon-ok");
        match.style.color = "#00A41E";
        confirm.setCustomValidity("");
    } else {
        match.classList.remove("valid");
        match.classList.add("invalid");
        match.classList.remove("glyphicon-ok");
        match.classList.add("glyphicon-remove");
        match.style.color = "#FF0004";
        confirm.setCustomValidity("Passwords Don't Match");
    }
};

document.getElementById('submitForm').onsubmit = function (e) {
    e.preventDefault();

    swal({
        title: "Confirmation",
        text: "Are you sure you want to create this account?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    })
    .then((confirm) => {
        if(confirm){
            var form = document.getElementById("submitForm");
            $.ajax({
                url: "/createAccount",
                data: {
                    name: form.elements[0].value,
                    username: form.elements[1].value,
                    password: form.elements[2].value,
                    companyId: form.elements[4].value,
                    accountType: form.elements[5].value,
                    operation: form.elements[6].value
                },
                success: function(success){
                    if(success === "true"){
                        swal("Account has been created successfully!", {
                            icon: "success"
                        });
                    } else {
                        swal("Username already exists!", {
                            icon: "error"
                        });
                    }
                }
            });
        }
    });
};
