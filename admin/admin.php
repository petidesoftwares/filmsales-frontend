<html>
<head>
    <link rel="stylesheet" href="../stylecheets/filmsalessheet.css">
    <script type="text/javascript" src="../jscripts/jquery.js"></script>
    <script type="text/javascript" src="../jscripts/controller.js"></script>
</head>
<body>
<div>
    <div id="page-title">
        <h1>Film Sales Services</h1>
        <div id="navlink">
            <li class="active" id="create" onclick="showCreateForm()">Create</li>
            <li id="edit" onclick="showEditForm()">Edit</li>
            <li onclick="toggleDropdown()" class="dp-view">View</li>
            <div id="dropdown-menu" class="dp-content">
                <span onclick="getFilmView()">Film</span>
                <span onclick="getProductView()">Product</span>
                <span onclick="getFindCustomerView()">Custmer</span>
                <span onclick="getReportView()">Report</span>
            </div>
            <li>Delete</li>
        </div>
    </div>
    <div class="page-body">
        <div class="admin-form-pane" id="create-film-form">

        </div>
<!--        <div class="editorPane admin-form-pane" id="edit-film-form">editor</div>-->
        <div class="output-pane">
            <div class="output-pane-title"><h3>Result</h3></div>
            <div class="output">

            </div>
        </div>

    </div>
</div>
</body>
</html>