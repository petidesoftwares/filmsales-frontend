<html>
    <head>
        <link rel="stylesheet" href="../stylecheets/filmsalessheet.css">
        <script type="text/javascript" src="../jscripts/jquery.js"></script>
        <script type="text/javascript" src="../jscripts/index-controller.js"></script>
    </head>
    <body>
        <div id="page-title"><h1>Film Sales Services</h1>
        </div>
        <div class="page-body">
            <div class="form-pane">
                <div class="form">
                    <div class="form-title"><h3>Registration Form</h3></div>
                    <div class="form-component">
                        <input type="text" name="firstname" class="form-element" id="user_firstname" placeholder="Firstname">
                    </div>
                    <div class="form-component">
                        <input type="text" name="middle_name" class="form-element" id="user_middle_name" placeholder="Middle Name">
                    </div>
                    <div class="form-component">
                        <input type="text" name="surname" class="form-element" id="user_surname" placeholder="Surname">
                    </div>
                    <div class="form-component">
                        <span><input type="radio" name="gender"  value="Male">Male</span>
                        <span id="span2"><input type="radio" name="gender"  value="Female">Female</span>
                    </div>
                    <div class="form-component">
                        <input type="email" name="email" class="form-element" id="user_email" placeholder="Email">
                    </div>
                    <div class="form-component">
                        <input type="date" name="date" class="form-element" id="date_of_birth" placeholder="Date of birth">
                    </div>
                    <div class="form-component">
                        <input type="number" name="phone" class="form-element" id="phone_number" placeholder="Phone Number">
                    </div>
                    <div class="form-component">
                        <input type="password" name="password" class="form-element" id="password" placeholder="Password">
                    </div>
                    <div class="form-component">
                        <input type="password" name="confirm_password" class="form-element" id="confirm_password" placeholder="Confirm Password">
                    </div>

                        <button type="button" id="reg_user_btn" class="btn" onclick="signUp()">Submit</button>


                </div>
            </div>
        </div>
    </body>
</html>