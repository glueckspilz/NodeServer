<?php

require("secu_pdo.php");

$pdo = SecuPDO::GetInstance();

/*preparing statement*/
$statement = $pdo->prepare("SELECT * FROM Users WHERE UserName=:un");
$statement->bindValue(":un",$_POST['username']);



/*executing statement*/
$statement->execute();

/*check if password and username are correct*/
if($statement->rowCount() > 0)
{
	$res = $statement->fetch(PDO::FETCH_ASSOC);
	if(password_verify(base64_encode($_POST['password']),$res['Password'])){
		echo"Sucess \o/";
	}
	else {
		echo "Wrong Username or Password __PW"; //TODO: remove Debug String
	}
}
else 
{
		echo "Wrong Username or Password! __UNAME"; //TODO: remove Debug String
}	
?>