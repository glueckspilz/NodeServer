
var globals = {
    checkedRows: [],
    columns: [
    {
        title: 'Selected',
        checkbox: true            
    },
    {
        field: 'UserID',
        title: 'UserID',
    },
    {
        field: 'FirstName',
        title: 'First'
    },
    {
        field: 'LastName',
        title: 'Last'
    },
    {
        field: 'EmailAddress',
        title: 'E-Mail'
    },
    {
        field: 'Username',
        title: 'Username'
    },
    {
        field: 'Password',
        title: 'Password'
    }]
};


function removeUser(){
    var obj = {
        ids: []
    };

    for(var i = 0; i < globals.checkedRows.length;i++){
        obj.ids.push(globals.checkedRows[i].UserID);
    }
    
    $.post('/admin/removeUser',obj);
    
    disable_delete(true);
    
    update_table();
}

function saveUser(){

    var obj = {
        firstname,
        lastname,
        email,
        username,
        password,
        id
    };

    obj.id = $('input[name=id]').val();
    obj.firstname = $('input[name=firstname]').val();
    obj.lastname = $('input[name=lastname]').val();
    obj.email = $('input[name=email]').val();
    obj.username = $('input[name=username]').val();
    obj.password = $('input[name=password]').val();

    
    console.log(obj); //TODO: Remove Debug Code
    
    $.post('/admin/updateUser',obj);     
    
    update_table(); 
}

function addUser(){
    var obj = {
        firstname,
        lastname,
        email,
        username,
        password
    };

    obj.firstname = $('input[name=firstname_add]').val();
    obj.lastname = $('input[name=lastname_add]').val();
    obj.email = $('input[name=email_add]').val();
    obj.username = $('input[name=username_add]').val();
    obj.password = $('input[name=password_add]').val();

    
    console.log(obj); //TODO: Remove Debug Code
    
    $.post('/admin/addUser',obj);     
    
    update_table();

}

function disable_delete(val){
    if(val){
        $('#delete').prop('disabled',true);
    }else{
            $('#delete').removeAttr('disabled');
    }
}

function update_table(){

    $('#table').bootstrapTable('destroy');

    $.getJSON('/admin/getUsers',function(data){

        console.log(data); //TODO: Remove Debug Code
        
        $('#table').bootstrapTable({
            "columns": globals.columns,
            "data": data,
            "pagination": true,
            "pageSize": 5,
            "search": true,
            onCheck: function(row,element){
                console.log(row);
                globals.checkedRows.push(row);
                disable_delete(false);      
            },
            onCheckAll: function(rows){
                globals.checkedRows = globals.checkedRows.concat(rows);
                disable_delete(false);
            },
            onUncheck: function(row,element){
                var index = globals.checkedRows.indexOf(row);
                globals.checkedRows.splice(index,1);
                if(globals.checkedRows.length < 1){
                    disable_delete(true);
                }
            },
            onUncheckAll: function(rows,element){
                globals.checkedRows = [];
                disable_delete(true);
                
            },
            onClickRow: function(row,element,field){
                $('input[name=id]').val(row.UserID);
                $('input[name=firstname]').val(row.FirstName);
                $('input[name=lastname]').val(row.LastName);
                $('input[name=email]').val(row.EmailAddress);
                $('input[name=username]').val(row.Username);
            }
        });
    });
}

function init_secumod(){
        
        $('button[name=refresh]').click(update_table);
        $('button[name=add]').click(addUser);
        $('button[name=save]').click(saveUser);
        disable_delete(true);
        update_table();
        
}

