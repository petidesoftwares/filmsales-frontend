<html>
<head>
    <link rel="stylesheet" href="../stylecheets/filmsalessheet.css">
    <script type="text/javascript" src="../jscripts/jquery.js"></script>
    <script type="text/javascript" src="../jscripts/controller.js"></script>
</head>
<body>
<div id="user-page-title">
    <h1>Film Sales Services</h1>
    <div class="loggedin-nav">
        <div id="shopping-cart" onclick="showModal()">Cart:<span id="cart-sum"></span></div>
        <div id="profile-photo" onclick="toggleDropdown()" class="dp-view"></div>
        <div id="dropdown-menu" class="dp-content profile-dropdown">
            <span onclick="directToProfile()">View Profile</span>
            <span onclick="directToViewCredit()">View Credit Card</span>
            <span onclick="directToAddCreditCard()">Add Credit Card</span>
            <span onclick="directToEditProfile()">Edit Profile</span>
            <span onclick="directToEditCreditCard()">Edit Credit Card</span>
        </div>
        <button type="button" class="access-control-btn" id="logout-btn" onclick="logOut()">Logout</button>
    </div>
</div>
<div class="editprofile-main-display-page">
    <div class="form-pane">
        <div class="form">
            <div class="form-title"><h3>Make Payment</h3></div>
            <div class="form-component">
                <input type="text" name="firstname" class="form-element" id="edit_user_firstname" placeholder="Firstname">
            </div>
            <div class="form-component">
                <input type="text" name="middle_name" class="form-element" id="edit_user_middle_name" placeholder="Middle Name">
            </div>
            <div class="form-component">
                <input type="text" name="surname" class="form-element" id="edit_user_surname" placeholder="Surname">
            </div>
            <div class="form-component">
                <label>Gender: </label><span><input type="radio" name="edit_gender"  value="Male">Male</span>
                <span id="span2"><input type="radio" name="edit_gender"  value="Female">Female</span>
            </div>
            <div class="form-component">
                <input type="date" name="date" class="form-element" id="edit_date_of_birth" placeholder="Date of birth">
            </div>
            <div class="form-component">
                <input type="number" name="phone" class="form-element" id="edit_phone_number" placeholder="Phone Number">
            </div>
            <button type="button" id="make-payment" class="btn" onclick="editProfile()">Pay</button>
        </div>
    </div>
</div>
</body>
</html>