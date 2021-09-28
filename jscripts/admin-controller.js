const appUrl ="http://127.0.0.1:8000/api";

const filmViewForm = `<div class="search-pane" id="view-film-pane"><input type="text"  name="search-genre" id="search-genre" placeholder="Search film by genre"/><button class="search-btn" onclick="searchByGenre()">Search</button></div>`;
const searchProductForm = `<div class="search-pane" id="view-product-pane"><input type="text" name="search-product" id="search-product" placeholder="Enter phrase or character from product to search"/><button class="search-btn" onclick="searchFilmByProductChar()">Search</button></div>`;
const findCustomer = `<div class="search-pane" id="view-customer-pane"><input type="number" name="search-customer" id="search-customer" placeholder="Enter age range to search for"/><button class="search-btn" onclick="searchCustomerByAge()">Search</button></div>`;
const reportPane = `<div id="view-report-pane"><input type="radio" name="report" value="monthly" onclick="getMonthInputField()"/>Monthly Sales<input type="radio" name="report" value="customer-purchase" onclick="customerPurchase()"/>Films Purchased By A Customer <div class="month-pane"><input type="number" name="month" id="month-field" placeholder="Enter month as digits"/><button class="search-btn" onclick="monthlySales()">Search</button></div></div>`;
// var oldGenre ="";

const months = {
    "01":"January",
    "02":"February",
    "03":"March",
    "04":"April",
    "05":"May",
    "06":"June",
    "07":"July",
    "08":"August",
    "09":"September",
    "10":"October",
    "11":"November",
    "12":"December"
}
$(document).ready(function (){
    // showCreateForm();
})

/*****************Admin Activities***********************/

function showCreateForm(e){
    const createForm = '<form name="film-form" id="film-form" enctype="multipart/form-data" class="form">\n' +
        '                <div class="form-title"><h3>Create Film</h3></div>\n' +
        '                <div class="form-component">\n' +
        '                    <input type="file" name="video"  class="form-element" id="video" accept="video/*" placeholder="Select Film"/><br>\n' +
        '                </div>\n' +
        '                <div class="form-component">\n' +
        '                    <input type="text" class="form-element" name="price" id="price" placeholder="Enter Price"/><br>\n' +
        '                </div>\n' +
        '                <div class="form-component">\n' +
        '                    <input type="number" class="form-element" name="available_cps" id="available_cps" placeholder="Available Copies"/><br>\n' +
        '                </div>\n' +
        '                <div class="form-component">\n' +
        '                    <input type="text" class="form-element" name="product" id="product" placeholder="Enter Film Prodect"/><br>\n' +
        '                </div>\n' +
        '                <div class="form-component-with-checkbox">\n' +
        '                    <span><input type="checkbox" name="genre1" id="genre1" value="Action"/>Action</span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre2" id="genre2" value="Romance"/>Romance</span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre3" id="genre3" value="Epic"/>Epic</span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre4" id="genre4" value="Adventure"/>Adventure </span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre5" id="genre5" value="Education"/>Education </span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre5" id="genre5" value="Dull"/>Dull </span>\n' +
        '                </div>\n' +
        '\n' +
        '                <button type="button" id="save-film-btn" onclick="sendVideo()">Upload</button>\n' +
        '            </form>';
    document.getElementById(e.id).setAttribute('class','active');
    $("#admin-w-logo").remove();
    var content = $(".admin-form-pane").html();
    if(content !== ""){
        $("#film-form").remove();
    }
    $("#edit-form").remove();
    $(".admin-form-pane").html(createForm);

}
function showEditForm(e){
    const editForm = '<div name="film-form" id="edit-form" class="form">\n' +
        '                <div class="form-title"><h3>Edit Film</h3></div>\n' +
        '                <div class="form-component">\n' +
        '                    <input type="number" class="form-element" name="price" id="price" placeholder="Enter Price"/><br>\n' +
        '                </div>\n' +
        '                <div class="form-component">\n' +
        '                    <input type="number" class="form-element" name="available_cps" id="available_cps" placeholder="Available Copies"/><br>\n' +
        '                </div>\n' +
        '                <div class="form-component">\n' +
        '                    <input type="text" class="form-element" name="product" id="product" placeholder="Enter Film Product"/><br>\n' +
        '                </div>\n' +
        '                <div class="form-component-with-checkbox">\n' +
        '                    <span><input type="checkbox" name="genre1" id="genre1" value="Action"/>Action</span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre2" id="genre2" value="Romance"/>Romance</span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre3" id="genre3" value="Epic"/>Epic</span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre4" id="genre4" value="Adventure"/>Adventure </span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre5" id="genre5" value="Education"/>Education </span>\n' +
        '\n' +
        '                    <span><input type="checkbox" name="genre6" id="genre6" value="Dull"/>Dull </span>\n' +
        '                </div>\n' +
        '               <input type="hidden" id="hidden-film-id"/>'+
        '\n' +
        '                <input type="button" id="save-film-btn" onclick="submitEditedFilms()" value="Upload"/>\n' +
        '            </div>';

    $("#admin-w-logo").remove();
    document.getElementById(e.id).setAttribute('class','active');
    var content = $(".admin-form-pane").html();
    if(content !== ""){
        $(".admin-form-pane").html("");
    }
    //Get the editable film attributes
    var filmList = '<div>';
    $.get(appUrl+'/admin/films',function (data){
        var sn =0;
        for (let i=0; i<data.length;i++){
            sn++;
            filmList +='<span style="color: black" onclick="editFilm('+data[i].id+')">'+sn+' '+data[i].title+'</span><br>';
        }
        filmList +='</div>';
        $(".output").html(filmList);
    });
    $(".admin-form-pane").append(editForm);
}

function showDeleteForm(e){
    $("#admin-w-logo").remove();
    document.getElementById(e.id).setAttribute('class','active');

    $.get(appUrl+'/admin/films',function (data){
        console.log(data);
        var filmList ='<select id="film-to-delete">'
        for (let i=0; i<data.length;i++){
            filmList +='<option name="film_'+data[i].id+'" value="'+data[i].id+'">'+data[i].title+'</option>';
        }
        filmList +='</select><br><button id="delete-btn" onclick="deleteFilm()">Delete</button>';
        $(".admin-form-pane").append(filmList);
    });
}

function deleteFilm(){
    const film_id = $("#film-to-delete").val();
    $.get(appUrl+'/admin/delete/film/'+film_id, function (data){
        alert(data.message);
        window.location.href = 'admin.php';
    })
}

function editFilm($id){
    $.get(appUrl+'/admin/film/edit/'+$id, function (data){
        $("#price").val(data.data[0].price);
        $("#available_cps").val(data.data[0].available_cps);
        $("#product").val(data.data[0].product);
        $("#hidden-film-id").val($id);
        for(let i =0; i<data.data[0].genre.length;i++){
            oldGenre +=data.data[0].genre[i].genre+'/';
        }
    });
}

function submitEditedFilms(){
    var genres = "";
    for(let i=1; i<=6;i++){
        if($("#genre"+i).prop('checked')==true){
            genres +=$("#genre"+i).val()+"/";
        }
    }
    const editedData = {
        price: $("#price").val(),
        available_cps: $("#available_cps").val(),
        product: $("#product").val(),
        genre: genres
    }
    var id = $("#hidden-film-id").val();
    $.post(appUrl+'/admin/edit-film/'+id, editedData,function (data){
        if (data.status === 200){
            alert(data.message);
        }else{
            console.log(data);
        }
    })
}

function getFilmView(e){
    $("#admin-w-logo").remove();
    var content = $(".admin-form-pane").html();
    if(content !== ""){
        $(".admin-form-pane").html("");
    }
    $(".admin-form-pane").append(filmViewForm)
}

function getProductView(){
    $("#admin-w-logo").remove();
    var content = $(".admin-form-pane").html();
    if(content !== ""){
        $(".admin-form-pane").html("");
    }
    $(".admin-form-pane").append(searchProductForm);
}

function getFindCustomerView(){
    $("#admin-w-logo").remove();
    var content = $(".admin-form-pane").html();
    if(content !== ""){
        $(".admin-form-pane").html("");
    }
    $(".admin-form-pane").append(findCustomer);
}

function getReportView(){
    $("#admin-w-logo").remove();
    var content = $(".admin-form-pane").html();
    if(content !== ""){
        $(".admin-form-pane").html("");
    }
    $(".admin-form-pane").append(reportPane)
    $(".month-pane").hide();
}

function getMonthInputField(){
    $(".month-pane").show();
}

function customerPurchase(){
    $.get(appUrl+'/admin/customers', function (data){
        $(".output").html("")
        for(let i=0; i<data.length;i++){
            $(".output").append('<input type="hidden" id="id_'+data[i].id+'" value="'+data[i].id+'"/><span onclick="getCustomerID('+data[i].id+')">'+data[i].firstname+' '+data[i].surname+'</span><br>');
        }
    });
}

function getCustomerID(id){
    const userid = $("#id_"+id).val();
    $.get(appUrl+'/admin/purchase/'+userid, function (data){
        $(".output").append('<span>Total: '+data.films+'</span>');
    });
}

function searchByGenre() {
    const genre = $("#search-genre").val();
    if(genre === ""){
        alert('Search item is required');
    }else{
        $.get(appUrl+'/admin/view/film/'+genre, function (data){
            $(".output").html("");
            var film = '<div>';
            var sn = 0;
            for (let i=0; i<data.film.length; i++){
                sn++;
                film +='<span>'+sn+'. '+data.film[i].film.title+'</span><br>';
                film +='<span>'+'   Price:. '+data.film[i].film.price+'</span><br>';
                film +='<span>'+'   Copies. '+data.film[i].film.available_cps+'</span><br>';
                film +='<span>'+'   Product. '+data.film[i].film.product+'</span><br>';
                film +='<span>'+'   genre. '+data.film[i].genre+'</span><br><br>';
            }
            film +="</div>";
            $(".output").html(film);
        });
    }
}

function searchFilmByProductChar(){
    const productChar = $("#search-product").val();
    if(productChar === ""){
        alert('Search field required');
    }else{
        $.get(appUrl+'/admin/product/'+productChar, function (data){
            var product = '<div>';
            var sn = 0;
            for (let i=0; i<data.product.length;i++){
                sn++;
                product += '<span>'+sn+'. '+data.product[i].product+'</span><br>';
            }
            product += '</div>';
            $(".output").html(product);
        })
    }
}

function searchCustomerByAge(){
    const age = $('#search-customer').val();
    if(age === ""){
        alert('Search field required');
    }else{
        $.get(appUrl+'/admin/customer/'+age, function (data){
            if(data.status == 200){
                if(data.customer.length == 0){
                    $(".output").html('Customer with age above '+age+' not found');
                }else{
                    var customers ='<div>';
                    var sn=0;
                    for (let i=0; data.customer.length;i++){
                        // $(".output").append(data.customer[i]['firstname']);
                        // console.log(data.customer[i]['firstname']);
                        sn++;
                        customers +='<span>'+sn+' '+data.customer[i].firstname+' '+data.customer[i].middle_name+' '+data.customer[i].surname+'</span>';
                    }
                    customers += '</div>';
                    $(".output").html(customers);
                }

            }
        });
    }
}

function monthlySales(){
    const month = $("#month-field").val();
    if(month === ""){
        alert('Search field required');
    }
    else if(month.length !== 2){
        alert('Month must be 2 digits');
    }else{
        $.get(appUrl+'/admin/sales/'+month, function (data){
            if (data.sales.status === 200){
                if(data.sales.films === 0 && data.sales.amount === 0){
                    $(".output").html('There are no sales for the month of '+months[month]);
                }else{
                    $(".output").html('<table><thead><tr><th>Films</th><th>Amount</th></tr></thead><tr><td>'+data.sales.films+'</td><td>'+data.sales.amount+'</td></tr></table>')
                }
            }
        });
    }
}
function clearForm(){
        $("#film-form")[0].reset();
}

function sendVideo(){
    if ($(".output").html() !== "" || $(".output").html() !==null){
        $(".output").html("");
    }
        const inputFile = $("input[type='file']").val();
        if(inputFile === ""){
            console.log("empty");
        }else {
            let myForm = document.getElementById('film-form');
            let data =  new FormData(myForm);

            $.ajax({
                type: 'post',
                enctype: 'multipart/form-data',
                url: appUrl + '/admin/create-film',
                data : data,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function(){
                    // $('#uploadStudent_btn').attr('disable', 'disable');
                },
                success: function(response){
                    if(response.status == 200){
                        $(".output").html(response.message);
                        clearForm();
                    }
                    this.refresh(true);
                },
                error: function(e){
                    if(e.response.status == 422){
                        alert(e.response.data.errors);
                    }
                    else{
                        console.log(e);
                    }
                },
            });
        }
}

/******************Home Page******************/

function FetchProduct(){
    $.get(appUrl+'/admin/films',function (data){
        for(let i=0; i<data.length; i++){
            var card = '<div class="film-display-card">';
            card += '<video controls> <source src="'+data[i].location+'/'+data[i].title+'" type="video/*"></video>';
            card += '<div><span class="title">Title:</span><span class="title"> '+data[i].title+'</span><br><span>Price: </span><span <span class="price">'+data[i].price+'</span><br><button>Add to Cart</button></div>';
            $(".main-display-page").append(card);
        }
    })
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