$(function(){
    $("#error_first_name").hide();
    $("#error_email").hide();
    $("#error_confirm_email").hide();
    $("#error_gender").hide();
    $("#error_phone_number").hide();


    var $error_in_first_name = false;
    var $error_in_email = false;
    var $error_in_email_confirm = false;
    var $error_in_gender = false;
    var $error_in_phone_number = false;


$("#first_name").focusout(function() {
    check_name_required();
});

$("#email").focusout(function() {
        check_email();
});

$("#confirm_email").focusout(function() {
        confirm_email_address();
    });
$("#phone_number").focusout(function() {
    check_phone_number();
    });

$("#gender-list").focusout(function(){
    console.log("gu");
    check_gender_required();
    });

function check_name_required() {
    var name = $("#first_name").val();
    var error_name = $("#error_first_name");
    if (name === "" ) {
        error_name.html("First Name is required");
        error_name.show();
        $error_in_first_name = true;
    }
    else {
        $("#error_first_name").hide();
        $error_in_first_name = false;
    }
}

function check_email(){
    var email = $("#email").val();
    var regex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var error_email = $("#error_email");
    if(regex.test(email)) {
        error_email.hide();
        $error_in_email = false;
    }
    else {
        error_email.html("Please enter valid email address");
        error_email.show();
        $error_in_email = true;
    }
}

    function confirm_email_address(){
        var email_confirm = $("#confirm_email").val();
        var email = $("#email").val();
        var error_email = $("#error_confirm_email");
        if(email !== email_confirm) {
            error_email.html("Email is not matching.");
            error_email.show();
            $error_in_email_confirm = true;
        }
        else {
            $("#error_confirm_email").hide();
            $error_in_email_confirm = false;
        }
    }
    function check_gender_required() {
    var error_gender = $("#error_gender");
        if ($('input[name=gender][value=male]').is(':checked') || $('input[name=gender][value=female]').is(':checked')
            || $('input[name=gender][value=other]').is(':checked')) {
            $("#error_gender").hide();
            $error_in_gender = false;
        }
        else {
            error_gender.html("Please select gender");
            error_gender.show();
            $error_in_gender = true;
        }
    }
    function check_phone_number(){
        var phone_number = $("#phone_number").val();
        var error_number = $("#error_phone_number");
        var regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
        if(!regex.test(phone_number)) {
            error_number.html("Please enter the correct number.");
            error_number.show();
            $error_in_phone_number = true;
        }
        else {
            error_number.hide();
            $error_in_phone_number = false;
        }
    }

    $("#registration_button").click(function() {
        check_name_required();
        check_email();
        confirm_email_address();
        check_phone_number();
        check_gender_required();

        if($error_in_phone_number === false && $error_in_email_confirm === false &&
            $error_in_email === false && $error_in_gender === false && $error_in_first_name === false ) {
            $.getJSON("https://reqres.in/api/users/10", function(result) {
                $.each(result, function (i, field) {
                    $('#content').append('<li>' + field.id + '</li>');
                    $('#content').append('<li>' + field.first_name + '</li>');
                    $('#content').append('<li>' + field.last_name + '</li>');
                    $('#content').append('<li><img src="' + field.avatar + '"</li>');
                    $('#form-content').hide();
                });
            });
           return true;
        }
        else {
            return false;
        }

    });
});

