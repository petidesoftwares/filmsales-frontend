
const appUrl ="http://127.0.0.1:8000/api";

$(document).ready(function (){
    controlNewUser();
    FetchProduct();
})

// function controlNewUser(){
// }

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
function validateSignUp(){
    var message = "";
    if($("#user_firstname").val() === ""){
        message = "First name is required";
    }else if($("#user_surname").val() === ""){
        message = "Surname is required";
    }else if($('input[name="gender"]:checked').val() === undefined){
        message = "Gender is required";
    }else if($("#user_email").val()===""){
        message = "Email is required";
    }else if($("#date_of_birth").val() === ""){
        message = "Date of birth is required";
    }else if($("#phone_number").val() === ""){
        message = "Phone number is required";
    }else if($("#password").val() === ""){
        message = "Email is required";
    }else if($("#confirm_password").val() !== $("#password").val()){
        message = "Password confirmation mismatch";
    }else {
        message = "ok";
    }
    return message;
}

/**
 * Validate login input
 * @returns {string}
 */
function validateSignIn(){
    var message = "";
    if($("#email").val() === ""){
        message = "Email field is required";
    }else if($("#password").val() ===""){
        message = "Password is required"
    }else{
        message = "ok";
    }
    return message;
}

/**
 * Customer signup to create account for transaction
 * to continue
 */
function signUp(){
    if(validateSignUp()=== "ok"){
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
        }
        $.post(appUrl+'/create-user', userData,function (data){
            if (data.status = 200){
                window.location.href ='signin.php';
            }else{
                console.log(data);
            }
        })
    }
    else{
        alert(validateSignUp());
    }

}

function signIn(){
    if(validateSignIn() === "ok"){
        const signInData = {
            email: $("#email").val(),
            password: $("#password").val()
        }
        $.post(appUrl+'/login',signInData,function (data){
            if(data.status === 200){
                localStorage.setItem('token',data.token);
                localStorage.setItem('name',data.user.firstname +" "+data.user.surname);
                localStorage.setItem('email',data.user.email);
                localStorage.setItem('user_id',data.user.id);
                localStorage.setItem('phone',data.user.phone);

                window.location.href='home.php';
            }
            else{
                console.log(data);
            }
        })
    }
}