<html>
<head>
    <link rel="stylesheet" href="../stylecheets/filmsalessheet.css">
    <script type="text/javascript" src="../jscripts/jquery.js"></script>
    <script type="text/javascript" src="../jscripts/index-controller.js"></script>
</head>
<body>
<div>
    <div class="page-body">
        <div class="form-pane">
            <div class="form">
                <div class="form-title"><h3>Sign</h3></div>
                <div class="form-component">
                    <input type="email" name="email" class="form-element" id="email" placeholder="Enter Email">
                </div>
                <div class="form-component">
                    <input type="password" name="password" class="form-element" id="password" placeholder="Enter Password">
                </div>
                <button type="button" id="reg_user_btn" class="btn" onclick="signIn()">Login</button>
            </div>
        </div>
        <div>
            <span id="signup-note">I don't have an account <a href="signup.php">Signup here</a></span>
        </div>
    </div>
</div>
</body>
</html>