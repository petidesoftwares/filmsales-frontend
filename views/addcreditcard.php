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
<div class="payment-main-display-page">
    <div class="form-pane">
        <div class="payment-form">
            <div class="form-title"><h3>Add Credit Card</h3></div>

            <div class="form-component">
                <label>Bank Name:</label> <input type="text" name="bank-name" class="form-element" id="add_bank_name" required>
            </div>
            <div class="form-component">
                <label>Card Number:</label> <input type="number" name="card-number" class="form-element" id="add_card_number" required>
            </div>
            <div class="form-component">
                <label>Card Type:</label> <input type="text" name="card-type" class="form-element" id="add_card_type" required>
            </div>
            <div class="form-component">
                <label>Security Number (cvv):</label> <input type="number" name="cvv" class="form-element" id="add_cvv" required>
            </div>
            <div class="form-component">
                <label>Expiry Date:</label> <input type="date" name="expiry-date" class="form-element" id="add_expiry_date" required>
            </div>

            <button type="button" id="create-credit-card" class="btn" onclick="creatCreditCardt()">Pay</button>
        </div>
    </div>
</div>
</body>
</html>