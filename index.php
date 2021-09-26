<html>
    <head>
        <link rel="stylesheet" href="stylecheets/filmsalessheet.css">
        <script type="text/javascript" src="jscripts/jquery.js"></script>
        <script type="text/javascript" src="jscripts/index-controller.js"></script>
    </head>
    <body>
        <div id="user-page-title">
            <h1>Film Sales Services</h1>
            <div id="profile-photo" onclick="toggleDropdown()" class="dp-view"></div>
            <div id="dropdown-menu" class="dp-content profile-dropdown">
                <span>View Profile</span>
                <span>Add Credit Card</span>
                <span>Edit Profile</span>
                <span>Edit Credit Card</span>
            </div>
            <button type="button" class="access-control-btn" id="singnin-btn" onclick="directToSignUp()">SingnUp</button>
            <button type="button" class="access-control-btn" id="logout-btn" onclick="logOut()">Logout</button>
        </div>
        <div class="main-display-page">

        </div>
    </body>
</html>