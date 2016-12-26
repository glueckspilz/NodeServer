<html>
<head>
<script>
function processUser(str) {
		var xmlhttp;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("test").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET","input.php?uid="+str,true);
        xmlhttp.send();
}
</script>
</head>
	<form action="input.php" method="POST">	
		<fieldset>
		<legend>Add User</legend>
			<input type='text' name='firstname' placeholder='First Name' /><br/>	
			<input type='text' name='lastname' placeholder='Last Name' /><br/>
			<input type='text' name='emailaddress' placeholder='E-Mail' /><br/>
			<input type='text' name='username' placeholder='Username' /><br/>
			<input type='password' name='password' placeholder='Password' /><br/>
			<input type='password' name='verify_password' placeholder='Verify Password' /><br/><br/>
			<input type="submit" value="Submit" name="go_add" />
		</fieldset>
	</form>
	<p id='test'></p>
<?php
require("secu_pdo.php");
require("helpers.php");

$statement = SecuPDO::GetInstance()->prepare("SELECT * FROM Users;");
$statement->execute();


$table = new HTML_Table($statement->fetchAll(PDO::FETCH_ASSOC));
$table->createTable();




echo"<form action='input.php' method='POST'>	
		<fieldset>
		<legend>Delete User</legend>
		   <select name='users'>";
		  
		    
           $statement = SecuPDO::GetInstance()->prepare("SELECT * FROM Users");
           $statement->execute();
           foreach($statement->fetchAll(PDO::FETCH_ASSOC) as $row)
 				{
	
				foreach($row as $key => $value)
				{
				if($key=="UserName") {
				echo "<option value='".$value."'>".$value."</option>";
				}}
				
				}
echo"		   </select> 
			<input type='submit' value='Submit' name='go_delete' />
		</fieldset>
	</form>";
           
           
           

echo	"<form action='input.php' method='GET'>	
		<fieldset>
		<legend>Get User</legend>
		   <select name='users' onchange='processUser()'>";
		  
		    
           $statement = SecuPDO::GetInstance()->prepare("SELECT * FROM Users");
           $statement->execute();
           foreach($statement->fetchAll(PDO::FETCH_ASSOC) as $row)
 				{
	
				foreach($row as $key => $value)
				{
				if($key=="UserName") {
				echo "<option value='".$value."'>".$value."</option>";
				}}
				
				}
echo	"</select> 
			<input type='submit' value='Submit' name='go_delete' />
		</fieldset>
	</form>";
           
                 
           
           
if (isset($_POST['go_delete'])){
	$statement = SecuPDO::GetInstance()->prepare("DELETE FROM Users WHERE UserName=:un");
	$statement->bindValue(":un",$_POST['users']);
	$statement->execute();
	
	print_r($statement->errorInfo());

}


if(isset($_POST['go_add'])){

		$statement = SecuPDO::GetInstance()->prepare("SELECT * FROM Users WHERE UserName=:un");
		$statement->bindValue(":un",$_POST['username']);
		
		$statement->execute();
		
		if($statement->rowCount() == 0)
		{	
		
	if($_POST['password'] == $_POST['verify_password'] && $_POST['password'] !== ''&& $_POST['username']!=='')
	{
			$statement = SecuPDO::GetInstance()->prepare("INSERT INTO Users VALUES(NULL,:fn,:ln,:email,:un,:pw)");
	
			$statement->bindValue(":fn",$_POST['firstname']);	
			$statement->bindValue(":ln",$_POST['lastname']);
			$statement->bindValue(":email",$_POST['emailaddress']);
			$statement->bindValue(":un",$_POST['username']);
			$statement->bindValue(":pw",password_hash(base64_encode($_POST['password']),PASSWORD_DEFAULT));		
			
			
			$statement->execute();
			
			echo "Added User!";
		}elseif($_POST['password'] == $_POST['verify_password'] && $_POST['password'] === '') 
		{
			$statement = SecuPDO::GetInstance()->prepare("INSERT INTO Users VALUES(NULL,:fn,:ln,:email,NULL,NULL)");
	
			$statement->bindValue(":fn",$_POST['firstname']);	
			$statement->bindValue(":ln",$_POST['lastname']);
			$statement->bindValue(":email",$_POST['emailaddress']);
			
			$statement->execute();
			
			
			echo "Added User! (NO LOGIN)";
		}
		else
		{
			echo "Please verify the password and the username!";
		}
		
		}
		else 
		{
			echo "Username already exists!";
		}
}

?>
</html>