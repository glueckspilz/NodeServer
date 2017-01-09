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
    },{
        field: 'Privileges',
        title: 'Privileges'
    },{
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

    $.post('/admin/removePrivilege', obj);

    disable_delete(true);

    update_table('/admin/getPrivileges');
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

    update_table('/admin/getUsers');
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
    update_table('/admin/getPrivileges');
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

    update_table('/admin/getUsers');
}

function addPrivilege(/*privilegeid,*/ privilegename) {
    var obj = {
        //id: Number,
        name : String
    };
  //  obj.id = privilegeid;
    obj.name = privilegename;
    console.log(obj); // Remove Debug Code
    $.post('/admin/addPrivilege', obj);
    update_table('/admin/getPrivileges');
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

    update_table('/admin/getUsers');

}

function disable_delete(val) {
    if (val) {
        $('#remove').prop('disabled', true);
    } else {
        $('#remove').removeAttr('disabled');
    }
}

function update_table(route) {

    $('#table').bootstrapTable('destroy');

    $.getJSON(route, function (data) {


        var cols = [];
<<<<<<< HEAD
        cols.push({
        title: 'Selected',
        checkbox: true
        });
        for(var key in data[0]){
=======
	cols.push({
	    title: 'Selected',
            checkbox: true
	});

	for(var key in data[0]){
>>>>>>> upstream/master
            cols.push({
                title:key.toString(),
                field:key.toString()
            });
        } 
        console.log(data); //TODO: Remove Debug Code

        $('#table').bootstrapTable({
            "columns": cols,
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
        update_table('/admin/getUsers');
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
        var firstname = $('input[name=firstname_add]').val(),
            lastname = $('input[name=lastname_add]').val(),
            email = $('input[name=email_add]').val(),
            username = $('input[name=username_add]').val(),
            password = $('input[name=password_add]').val();



        addUser(firstname, lastname, email, username, password);
        $('#modal_add').modal('hide');
    });

    $('button[name=update_confirm]').click(function () {
        var id = $('input[name=id]').val(),
            firstname = $('input[name=firstname]').val(),
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
    update_table('/admin/getUsers');

}




function init_secumod_privileges() {

    $('button[name=refresh]').click(function () {
        update_table('/admin/getPrivileges');
    });

    $('button[name=add_privileges]').click(function () {
        $('#modal_add_privileges').modal();
    });

    $('button[name=add_confirm]').click(function () {
            var  name = $('input[name=privilegename_add]').val();
            //console.log(id);
            console.log(name);
        addPrivilege(name);
        $('#modal_add_privileges').modal('hide');
        update_table('/admin/getPrivileges');
    });

    $('button[name=remove_privileges]').click(function () {
        $('#modal_remove_privileges').modal();
    });

    $('button[name=remove_confirm]').click(function () {
        removePrivilege();
        $('#modal_remove_privileges').modal('hide');
        //disable_delete(true);
    })

    $('button[name=update_privileges]').click(function () {
        $('#modal_update_privileges').modal();
    });

    $('button[name=update_confirm]').click(function () {
        var id = $('input[name=privilegeid_update]').val(),
            name = $('input[name=privilegename_update]').val();
        updatePrivilege(id, name);
        $('#modal_update_privileges').modal('hide');

    });


    //$('button[name=add]').click(addUser);
    //$('button[name=save]').click(saveUser);

    disable_delete(true);
    update_table('/admin/getPrivileges');
}
function init_secumod_SQL() {
    $('button[name=sql_send]').click(function () {
        var obj = new Object();
        obj.query = $('textarea[name=query_input]').val();
        check_drop(obj.query, function (contains) {
            if (contains) {
                $("#drop_modal").modal();
            } else {
                execute_query(obj);
            }
        });
    });

    $('button[name=drop_confirm]').click(function () {
        var obj = new Object();
        obj.query = $('textarea[name=query_input]').val();
        execute_query(obj);
        $("#drop_modal").modal('hide');
        
    });
    
}

function execute_query(obj){
            console.log(obj);
                $.post('/admin/sendSql', obj).done(function (data) {
                    console.log('DATA: ' + data);
                    show_table(data);
                    //$('#sql_resp').html(JSON.stringify(data));
                });
    
}

function show_table(data){
        $('#table').bootstrapTable('destroy');
        var cols = [];

        for(var key in data[0]){
            cols.push({
                title: key.toString(),
                field : key.toString()
            });
        }

        $('#table').bootstrapTable({
            "data": data,
            "columns": cols,
            "pagination": true,
            "pageSize": 10,
            "search": true
        });
}

function check_drop(input,cb){
    var drop_check= input.includes("drop");
    cb(drop_check);
}

