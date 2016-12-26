<?php 

echo 	"<form action='" . $_SERVER['PHP_SELF'] . "' method='POST'> 
		<input type='text' name='input' > 
		<input type='submit' value='submit' >
	</form> <br>";
	if(isset($_POST['input'])){
		echo password_hash(base64_encode($_POST['input']),PASSWORD_DEFAULT);
	}
	
?>