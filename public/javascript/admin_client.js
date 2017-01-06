var globals = {
    checkedRows: [],
    columns_Users: [{
        title: 'Selected',
        checkbox: true
    }, {
        field: 'UserID',
        title: 'UserID',
    }, {
        field: 'FirstName',
        title: 'First'
    }, {
        field: 'LastName',
        title: 'Last'
    }, {
        field: 'EmailAddress',
        title: 'E-Mail'
    }, {
        field: 'Username',
        title: 'Username'
    }, {
        field: 'Password',
        title: 'Password'
    }],

    columns_Privileges: [{
        title: 'Selected',
        checkbox: true
    }, {
        title: 'PrivilegeID',
        field: 'PrivilegeID'
    }, {
        title: 'PrivilegeName',
        field: 'PrivilegeName'
    }]
};

function removePrivilege() {
    var obj = {
        ids: []
    };
    for (var i = 0; i < globals.checkedRows.length; i++) {
        obj.ids.push(globals.checkedRows[i].PrivilegeID)
    }
}

function removeUser() {
    var obj = {
        ids: []
    };

    for (var i = 0; i < globals.checkedRows.length; i++) {
        obj.ids.push(globals.checkedRows[i].UserID);
    }

    $.post('/admin/removeUser', obj);

    disable_delete(true);

    update_table('/admin/getUsers', globals.columns_Users);
}

function updatePrivilege(id, name) {
    var obj = {
        id,
        name
    };
    obj.id = id;
    obj.name = name;
    console.log(obj); //Rebove debug Code
    $post('/admin/updatePrivilege', obj);
    update_table('/admin/getPrivileges', globals.columns_Privileges);
}

function updateUser(id, firstname, lastname, email, username, password) {

    var obj = {
        firstname,
        lastname,
        email,
        username,
        password,
        id
    };

    obj.id = id;
    obj.firstname = firstname;
    obj.lastname = lastname;
    obj.email = email;
    obj.username = username;
    obj.password = password;

    console.log(obj); //TODO: Remove Debug Code

    $.post('/admin/updateUser', obj);

    update_table('/admin/getUsers', globals.columns_Users);
}

function addPrivilege(privilegeid, privilegename) {
    var obj = {
        id,
        name
    };
    obj.id = privilegeid;
    obj.name = privilegename;
    console.log(obj); // Remove Debug Code
    $.post('/admin/addPrivilege', obj);
    update_table('/admin/getPrivileges', globals.columns_Privileges);
}

function addUser(firstname, lastname, email, username, password) {
    var obj = {
        firstname,
        lastname,
        email,
        username,
        password
    };

    obj.firstname = firstname;
    obj.lastname = lastname;
    obj.email = email;
    obj.username = username;
    obj.password = password;


    console.log(obj); //TODO: Remove Debug Code

    $.post('/admin/addUser', obj);

    update_table('/admin/getUsers', globals.columns_Users);

}

function disable_delete(val) {
    if (val) {
        $('#remove').prop('disabled', true);
    } else {
        $('#remove').removeAttr('disabled');
    }
}

function update_table(route, columns) {

    $('#table').bootstrapTable('destroy');

    $.getJSON(route, function (data) {

        console.log(data); //TODO: Remove Debug Code

        $('#table').bootstrapTable({
            "columns": columns,
            "data": data,
            "pagination": true,
            "pageSize": 10,
            "search": true,
            onCheck: function (row, element) {
                console.log(row);
                globals.checkedRows.push(row);
                disable_delete(false);
            },
            onCheckAll: function (rows) {
                globals.checkedRows = globals.checkedRows.concat(rows);
                disable_delete(false);
            },
            onUncheck: function (row, element) {
                var index = globals.checkedRows.indexOf(row);
                globals.checkedRows.splice(index, 1);
                if (globals.checkedRows.length < 1) {
                    disable_delete(true);
                }
            },
            onUncheckAll: function (rows, element) {
                globals.checkedRows = [];
                disable_delete(true);

            },
            onClickRow: function (row, element, field) {
                $('input[name=id]').val(row.UserID);
                $('input[name=firstname]').val(row.FirstName);
                $('input[name=lastname]').val(row.LastName);
                $('input[name=email]').val(row.EmailAddress);
                $('input[name=username]').val(row.Username);
            }
        });
    });
}

function init_secumod_users() {

    $('button[name=refresh]').click(function () {
        update_table('/admin/getUsers', globals.columns_Users);
    });

    $('button[name=add]').click(function () {
        $('#modal_add').modal();
    });

    $('button[name=update]').click(function () {
        $('#modal_update').modal();
    });

    $('button[name=remove]').click(function () {
        $('#modal_remove').modal();
    });

    $('button[name=add_confirm]').click(function () {
        var firstname = $('input[name=username_add]').val(),
            lastname = $('input[name=lastname_add]').val(),
            email = $('input[name=email_add]').val(),
            username = $('input[name=username_add]').val(),
            password = $('input[name=password_add]').val();



        addUser(firstname, lastname, email, username, password);
        $('#modal_add').modal('hide');
    });

    $('button[name=update_confirm]').click(function () {
        var id = $('input[name=id]').val(),
            firstname = $('input[name=username]').val(),
            lastname = $('input[name=lastname]').val(),
            email = $('input[name=email]').val(),
            username = $('input[name=username]').val(),
            password = $('input[name=password]').val();


        updateUser(id, firstname, lastname, email, username, password);
        $('#modal_update').modal('hide');
    });

    $('button[name=remove_confirm]').click(function () {
        removeUser();
        $('#modal_remove').modal('hide');
    });

    disable_delete(true);
    update_table('/admin/getUsers', globals.columns_Users);

}




function init_secumod_privileges() {
    $('button[name=refresh]').click(function () {
        update_table('/admin/getPrivileges', globals.columns_Privileges);
    });

    $('button[name=addprivbtn]').click(function () {
        $('modal_add').modal();
    });

    $('button[name=add_confirm]').click(function () {
        var id = $('input[name=privilegeid_add]').val(),
            name = $('input[name=privilegename_add]').val();
        addPrivilege(id, name);
        $('modal_update').modal('hide');
    });

    $('button[name=remove]').click(function () {
        $('modal_remove').modal();
    });

    $('button[name=remove_confirm]').click(function () {
        removePrivilege();
        $('#modal_remove').modal('hide');

    })

    $('button[name=update]').click(function () {
        $('#modal_update').modal();
    });

    $('button[name=update_confirm]').click(function () {
        var id = $('input[name=privilegeid_update]').val(),
            name = $('input[name=privilegename_update]').val();
        updatePrivilege(id, name);
        $('modal_remove').modal('hide');

    });


    //$('button[name=add]').click(addUser);
    //$('button[name=save]').click(saveUser);

    disable_delete(true);
    update_table('/admin/getPrivileges', globals.columns_Privileges);
}

function init_secumod_SQL() {

}