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
        <span class="access-control-btn">Home</span>
        <div id="shopping-cart" onclick="showModal()">Cart:<span id="cart-sum"></span></div>
        <div id="profile-photo" onclick="toggleDropdown()" class="dp-view">User</div>
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
    <div id="profile-pane">
        <h3>Customer Profile</h3>
        <div id="profile"></div>
    </div>
</div>
</body>
</html>