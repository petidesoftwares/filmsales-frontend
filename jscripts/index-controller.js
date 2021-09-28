
const appUrl ="http://127.0.0.1:8000/api";

$(document).ready(function (){
    FetchProduct();
})

function FetchProduct(){
    $.get(appUrl+'/admin/films',function (data){
        for(let i=0; i<data.length; i++){
            var card = '<div class="film-display-card">';
            card += '<video controls> <source src="'+data[i].location+'/'+data[i].title+'" type="video/*"></video>';
            card += '<div><span class="title">Title:</span><span class="title"> '+data[i].title+'</span><br><span>Price: </span><span <span class="price">'+data[i].price+'</span><br><button onclick="directToSignIn()">Add to Cart</button></div>';
            $(".main-display-page").append(card);
        }
    })
}

function directToSignUp(){
    window.location.href='views/signup.php';
}
function directToSignIn(){
    window.location.href='views/signin.php'
}

/**
 * Validate user signup details before proceeding
 * to the point of sending the request
 * @returns {string}
 */
function validateSignUp(obj){
    $(".signup-errors-pane").html("");

    $("#signup-fname-error").html(obj.firstname);
    $("#signup-surname-error").html(obj.surname);
    $("#signup-gender-error").html(obj.gender);
    $("#signup-email-error").html(obj.email);
    $("#signup-dob-error").html(obj.dob);
    $("#signup-phone-error").html(obj.phone);
    $("#signup-psword-error").html(obj.password);
    $("#signup-c_psword-error").html(obj.confirm_password);
}

/**
 * Validate login input
 * @returns {string}
 */
function validateSignIn(obj){
    $(".signup-errors-pane").html("");

    $("#signin-email-error").html(obj.emailError);
    $("#signin-password-error").html(obj.passwordError);
}

/**
 * Customer signup to create account for transaction
 * to continue
 */
function signUp(){
        const userData ={
            firstname:$("#user_firstname").val(),
            surname: $("#user_surname").val(),
            middle_name: $("#user_middle_name").val(),
            gender: $('input[name="gender"]:checked').val(),
            email: $("#user_email").val(),
            date_of_birth: $("#date_of_birth").val(),
            phone_number: $("#phone_number").val(),
            password: $("#password").val(),
            confirm_password: $("#confirm_password").val()
        };

        const errorLog = {
            firstname:"",
            surname: "",
            middle_name: "",
            gender: "",
            email: "",
            dob:"",
            phone: "",
            password: "",
            confirm_password: ""
        };
        $.ajax({
            type: 'post',
            url: appUrl+'/create-user',
            beforeSend:function (xhr){
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.setRequestHeader('Accept','application/json');
            },
            data: JSON.stringify(userData),
            success: function (data){
                if (data.status = 200){
                    window.location.href ='signin.php';
                }else{
                }
            },
            error: function (xhr, status, error){
                if(xhr.status === 422){
                    let errors = JSON.parse(xhr.responseText).errors;
                    errorLog.firstname = errors.firstname;
                    errorLog.surname = errors.surname;
                    errorLog.gender = errors.gender;
                    errorLog.email = errors.email;
                    errorLog.phone = errors.phone;
                    errorLog.password = errors.password;
                    errorLog.confirm_password = errors.confirm_password;
                    validateSignUp(errorLog);
                }
            },
        })
}

function signIn(){
        const signInData = {
            email: $("#email").val(),
            password: $("#password").val()
        };

        const errorLog = {
            emailError:"",
            passwordError: ""
        };

        $.ajax({
            type:'post',
            url:appUrl+'/login',
            beforeSend:function (xhr){
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.setRequestHeader('Accept','application/json');
            },
            data: JSON.stringify(signInData),
            success: function(data, status) {
                console.log(status);
                if (data.status === 200) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('name', data.user.firstname + " " + data.user.surname);
                    localStorage.setItem('email', data.user.email);
                    localStorage.setItem('user_id', data.user.id);
                    localStorage.setItem('phone', data.user.phone);

                    window.location.href = 'home.php';
                } else {
                    console.log(data);
                }
            },
            error: function (xhr, status, error){
                if (xhr.status === 422){
                    let errors = JSON.parse(xhr.responseText).errors;
                    errorLog.emailError = errors.email;
                    errorLog.passwordError = errors.password;
                    validateSignIn(errorLog);
                }
                if(xhr.status === 403){
                    alert(JSON.parse(xhr.responseText).error);
                }
            }
        })
}