/**
 * The file solely controls the activities of a
 * registered user.
 * Only logged in users have access to the
 * protected route of the API via this controller.
 */


/**
 * The url to the backend API
 * @type {string}
 */
const appUrl ="http://127.0.0.1:8000/api";

/**
 * Verify if the accessor is logged in or not
 */
if(localStorage.getItem('token') === "" || localStorage.getItem('token')=== null){
     window.location.href ='index.php';
}

/**
 * Load the javascript documents when the
 * page consuming it is ready
 */
$(document).ready(function(){
    /**
     * Check the url of the page that is loading
     * and grant access to the required functions
     */
    if($(location).attr('href').endsWith('payment.php')){
        getCreditCard();
        updateCart();
    }
    if($(location).attr('href').endsWith('profile.php')) {
        getCustomerProfile();
        updateCart();
    }if ($(location).attr('href').endsWith('creditcarddetails.php')){
        showCreditardDetial();
        updateCart();
    }if ($(location).attr('href').endsWith('edit-profile.php')){
        getProfileEditableDetails();
        updateCart();
    }if ($(location).attr('href').endsWith('editcreditcard.php')){
        getCreditCardEditableDetails();
        updateCart();
    }
    else {
        //These functions are consumed by the home page only
        updateCart();
        FetchProduct();
        closeModal();
    }
})



function logOut(){
    $.ajax({
        type: 'post',
        url: appUrl + '/user/logout',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data:{},
        success: function (respoonse){
            alert(respoonse.message);
            localStorage.clear();
            window.location.href='../index.php';
        },
        error:function (error){
            console.log(error);
        }

    })
}

    /***************Modal*****************/

    function closeModal(){
        $(".modal").hide();
    }

    function showModal(){
        userCart();
        $(".modal").show();
    }
/******************Home Page******************/

function FetchProduct(){
    $.get(appUrl+'/admin/films',function (data){
        for(let i=0; i<data.length; i++){
            var card = '<div class="film-display-card">';
            card += '<video controls> <source src="'+data[i].location+'/'+data[i].title+'" type="video/*"></video>';
            card += '<div><input type="hidden" id="film_id_'+data[i].id+'" value="'+data[i].id+'" /><span class="title">Title:</span><span class="title"> '+data[i].title+'</span><br><span>Price: </span><span <span class="price">'+data[i].price+'</span><br><button style="cursor: pointer" onclick="addToCart('+data[i].id+')">Add to Cart</button></div>';
            $(".main-display-page").append(card);
        }
    })
}

function updateCart(){
    $.ajax({
        type: 'get',
        url: appUrl + '/user/all-cart/'+localStorage.getItem('user_id'),
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: {},

        success: function (response){
            $("#cart-sum").html(response.cartSum[0].total);
            if(response.cartSum[0].total == 0){
                if (localStorage.getItem('number_items') != null){
                    localStorage.removeItem('number_items');
                    localStorage.removeItem('shoppingID');
                }
            }else{
                localStorage.setItem('number_items',response.cartSum[0].total);
                localStorage.setItem('shoppingID',response.shoppingID[0].shopping_id);
            }
        },
        error:function (error){
            console.log(error);
        }

    })
}
function addToCart(id){
    const cartItem = {
        film_id: $("#film_id_" + id).val(),
        customer_id: localStorage.getItem('user_id'),
    }
    if(localStorage.getItem('shoppingID')==="" || localStorage.getItem('shoppingID') === null) {
        const shoppingID = 'SHP' + Math.floor((Math.random() * 10000000) + 1) + '_' + localStorage.getItem('user_id');
        cartItem.shopping_id = shoppingID
    }else{
        cartItem.shopping_id = localStorage.getItem('shoppingID');
    }
        $.ajax({
            type: 'post',
            url: appUrl + '/user/create/cart',
            datatype:'json',
            beforeSend:function (xhr){
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.setRequestHeader('Accept','application/json');
                xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
            },
            data: JSON.stringify(cartItem),

            success: function (data){
                if(data.status === 200){
                    alert(data.message);
                    updateCart();
                    localStorage.setItem('shoppingID',cartItem.shopping_id);
                    // window.location.href='home.php';
                }
            },
            error:function (error){
                console.log(error);
            }

        })
}

function userCart(){
    $("#cart-modal").html("");
    $("#cart-modal").append('<div class="cart-section"><h4>Your Cart</h4></div>');
    $.ajax({
        type: 'get',
        url: appUrl + '/user/show/cart/'+localStorage.getItem('user_id'),
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: {},

        success: function (data){
            var sn = 0;
            var totalAmount = 0;
            for (let i=0;i<data.cart.length; i++){
                sn++;
                const cartSection = '<div class="cart-section"><span>'+sn+'.</span><br><span>'+data.cart[i].film.title+'</span><br><span>'+data.cart[i].film.price+'</span></div>';
                totalAmount += Number(data.cart[i].film.price);
                $("#cart-modal").append(cartSection);
            }
            $("#cart-modal").append("Total: "+totalAmount+'<input type="hidden", id="totalAmount" value="'+totalAmount+'"/>');
            $("#cart-modal").append('<br><br><button onclick="order()">Order</button>');
        },
        error:function (error){
            console.log(error);
        },

    })
}

function order(){
    const order = {
        customer_id:localStorage.getItem('user_id'),
        shopping_id: localStorage.getItem('shoppingID'),
        payment_status:"Pending",
        number_items:localStorage.getItem('number_items'),
        amount:$("#totalAmount").val()
    }
    $.ajax({
        type: 'post',
        url: appUrl + '/user/order',
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: JSON.stringify(order),

        success: function (data){
            if(data.status === 200){
                closeModal();
                alert(data.message);
                localStorage.setItem('orderAmount',data.order.amount);
                window.location.href='payment.php';
            }
        },
        error:function (error){
            console.log(error);
        },

    })
}

function getCreditCard(){

    $.ajax({
        type: 'get',
        url: appUrl+'/user/verifycard/'+localStorage.getItem('user_id'),
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data:{},
        success: function (data) {
            if(data.cardState == true ){
                $.ajax({
                    type:'get',
                    url: appUrl+'/user/show/card/'+localStorage.getItem('user_id'),
                    datatype:'json',
                    beforeSend:function (xhr){
                        xhr.setRequestHeader('Content-Type','application/json');
                        xhr.setRequestHeader('Accept','application/json');
                        xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
                    },
                    data: {},

                    success: function (data){
                        if(data.status === 200){
                            $("#acc-holder").val(localStorage.getItem('name'));
                            $("#bank_name").val(data.cardDetails[0].bank_name);
                            $("#card_number").val(data.cardDetails[0].card_number);
                            $("#card_type").val(data.cardDetails[0].card_type);
                            $("#cvv").val(data.cardDetails[0].cvv);
                            $("#expiry_date").val(data.cardDetails[0].expiry_date);
                            $("#amount").val(localStorage.getItem('orderAmount'));
                        }

                    },
                    error:function (error){
                        console.log(error);
                    },
                })
            }else{
                window.location.href='addcreditcard.php';
            }
        },
        error:function (xhr, status, error){
            alert(error);
            console.log(error);
        },
    });
}


/*****************Create credit card ***************/
function creatCreditCardt(){
    const creditCard = {
        customer_id: localStorage.getItem('user_id'),
        bank_name: $("#add_bank_name").val(),
        card_number: $("#add_card_number").val(),
        card_type: $("#add_card_type").val(),
        cvv: $("#add_cvv").val(),
        expiry_date: $("#add_expiry_date").val()
    }
    $.ajax({
        type:'post',
        url: appUrl+'/user/create/card',
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: JSON.stringify(creditCard),

        success: function (data){
            if(data.status === 200){
                alert(data.message);
                window.location.href ='payment.php';
            }

        },
        error:function (error){
            console.log(error);
        },
    })
}

/**
 * Clear the cart after every payment.
 */
function clearCart(){
    const clearKey ={
        shopping_id: localStorage.getItem('shoppingID'),
        customer_id: localStorage.getItem('user_id')
    };

    $.ajax({
        type:'post',
        url: appUrl+'/user/cart/delete',
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: JSON.stringify(clearKey),

        success: function (data){
            if(data.status === 200){
                if(data.deleted === 1 || data.deleted === true){
                    alert('Your cart has been cleared');
                    updateCart();
                    window.location.href ='home.php';
                }

            }

        },
        error:function (error){
            console.log(error);
        },
    })

}

/******************make Payment ********************/
function makePayment(){
    const pay={
        customer_id: localStorage.getItem('user_id'),
        card_number: $("#card_number").val(),
        amount: $("#amount").val(),
        shopping_id: localStorage.getItem('shoppingID')
    };
    $.ajax({
        type:'post',
        url: appUrl+'/user/payment',
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: JSON.stringify(pay),

        success: function (data){
            if(data.status === 200){
                var pos = data.message.search("unsuccessful");

                if(pos === -1){
                    alert(data.message);
                    clearCart();
                    // localStorage.removeItem('shoppingID');
                    // localStorage.removeItem('number_items');
                    // localStorage.removeItem('orderAmount');
                    // window.location.href ='home.php';
                }
                else{
                    alert(data.message);
                    console.log(data.card);
                }

            }

        },
        error:function (error){
            console.log(error);
        },
    })

}

/***********************Edit customer details *******************/
/**
 * Validate user signup details before proceeding
 * to the point of sending the request
 * @returns {string}
 */
function validateSignUp(){
    var message = "";
    if($("#edit_user_firstname").val() === ""){
        message = "First name is required";
    }else if($("#edit_user_surname").val() === ""){
        message = "Surname is required";
    }else if($('input[name="edit_gender"]:checked').val() === undefined){
        message = "Gender is required";
    }else if($("#edit_date_of_birth").val() === ""){
        message = "Date of birth is required";
    }else if($("#edit_phone_number").val() === ""){
        message = "Phone number is required";
    }else {
        message = "ok";
    }
    return message;
}


function editProfile(){
    if(validateSignUp()=== "ok"){
        const userData ={
                firstname:$("#edit_user_firstname").val(),
                surname: $("#edit_user_surname").val(),
                middle_name: $("#edit_user_middle_name").val(),
                gender: $('input[name="edit_gender"]:checked').val(),
                date_of_birth: $("#edit_date_of_birth").val(),
                phone_number: $("#edit_phone_number").val()
            }
            $.ajax({
                type:'post',
                url: appUrl+'/user/edit/'+localStorage.getItem('user_id'),
                datatype:'json',
                beforeSend:function (xhr){
                    xhr.setRequestHeader('Content-Type','application/json');
                    xhr.setRequestHeader('Accept','application/json');
                    xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
                },
                data: JSON.stringify(userData),

                success: function (data){
                    if(data.status === 200){
                        alert(data.message);
                        window.location.href ='profile.php';
                    }

                },
                error:function (error){
                    console.log(error);
                },
            })
        }
        else{
            alert(validateSignUp());
        }
}

/****************Profile********************/
function getCustomerProfile(){
    $.ajax({
        type:'get',

        url: appUrl+'/user/edit/data/'+localStorage.getItem('user_id'),
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: {},

        success: function (data){
            if(data.status === 200){
                var profile = '<span>Name: </span><span>'+data.data[0].firstname+' '+data.data[0].middle_name+' '+data.data[0].surname+'</span><br>' +
                '<span>Gender: </span><span>'+data.data[0].gender+'</span><br><span>phone: </span><span>'+data.data[0].phone+'</span><br>' +
                    '<span>Email: </span><span>'+data.data[0].email+'</span>';
                $("#profile").append(profile);
            }

        },
        error:function (error){
            console.log(error);
        },
    })
}

function getCreditCardEditableDetails(){
    alert(localStorage.getItem('user_id'));
    $.ajax({
        type:'get',
        url: appUrl+'/user/show/card/'+localStorage.getItem('user_id'),
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: {},

        success: function (data){
            if(data.status === 200){

                $("#edit_add_bank_name").val(data.cardDetails[0].bank_name);
                $("#edit_add_card_number").val(data.cardDetails[0].card_number);
                $("#edit_add_card_type").val(data.cardDetails[0].card_type);
                $("#edit_add_cvv").val(data.cardDetails[0].cvv);
                $("#edit_add_expiry_date").val(data.cardDetails[0].expiry_date);
            }
        },
        error:function (error){
            console.log(error);
        },
    })
}

function editCreditCard(){
    const creditCard = {
        customer_id: localStorage.getItem('user_id'),
        bank_name: $("#edit_add_bank_name").val(),
        card_number: $("#edit_add_card_number").val(),
        card_type: $("#edit_add_card_type").val(),
        cvv: $("#edit_add_cvv").val(),
        expiry_date: $("#edit_add_expiry_date").val()
    };
    $.ajax({
        type:'post',
        url: appUrl+'/user/update/card/'+localStorage.getItem('user_id'),
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: JSON.stringify(creditCard),

        success: function (data){
            if(data.status === 200){
                alert(data.message);
                // window.location.href ='payment.php';
            }

        },
        error:function (error){
            console.log(error);
        },
    })
}

function showCreditardDetial(){
    $.ajax({
        type:'get',
        url: appUrl+'/user/show/card/'+localStorage.getItem('user_id'),
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: {},

        success: function (data){
            if(data.status === 200){
            var cardProfil = '<span>Bank Name:</span><span>'+data.cardDetails[0].bank_name+'</span><br>' +
                '<span>Card Number:</span><span>'+data.cardDetails[0].card_number+'</span><br>' +
                '<span>Card Type:</span><span>'+data.cardDetails[0].card_type+'</span><br>' +
                '<span>Expiry_date:</span><span>'+data.cardDetails[0].expiry_date+'</span><br>';
            $("#credit-card-profile").append(cardProfil);

            }

        },
        error:function (error){
            console.log(error);
        },
    })
}

function getProfileEditableDetails(){
    $.ajax({
        type:'get',
        url: appUrl+'/user/edit/data/'+localStorage.getItem('user_id'),
        datatype:'json',
        beforeSend:function (xhr){
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader('Accept','application/json');
            xhr.setRequestHeader('Authorization','Bearer '+localStorage.getItem('token'));
        },
        data: {},

        success: function (data){
            if(data.status === 200){
                console.log(data.data[0].firstname);
                $("#edit_user_firstname").val(data.data[0].firstname);
                $("#edit_user_surname").val(data.data[0].surname);
                $("#edit_user_middle_name").val(data.data[0].middle_name);
                $("input[name='edit_gender']")
                $("#edit_date_of_birth").val(data.data[0].dob);
                $("#edit_phone_number").val(data.data[0].phone);
                if($("#gender_female").val() ===data.data[0].gender){
                    $("#gender_female").attr('checked',true);
                }else{
                    $("#gender_male").attr('checked',true);
                }
            }

        },
        error:function (error){
            console.log(error);
        },
    })
}

function directToProfile(){
    window.location.href = 'profile.php';
}
function directToAddCreditCard(){
    window.location.href = 'addcreditcard.php';
}
function directToViewCredit(){
    window.location.href = 'creditcarddetails.php';
}
function directToEditProfile(){
    window.location.href = 'edit-profile.php';
}
function directToEditCreditCard(){
    window.location.href = 'editcreditcard.php';
}

/*****************Drop down automation**************/

/**
 * toggle between hiding and showing the dropdown content
 * */
function toggleDropdown(){
    document.getElementById("dropdown-menu").classList.toggle("show");
}

/**
 * Close the dropdown menu if the user clicks outside of it
  */
window.onclick = function(event) {
    if (!event.target.matches('.dp-view')) {
        var dropdowns = document.getElementsByClassName("dp-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}