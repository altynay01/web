<?php
	$name = $_REQUEST['name'];
	$surname = $_REQUEST['surname'];
	$email = $_REQUEST['email'];
	$password = md5($_REQUEST['password']);
	require("connection.php");
	$query = "INSERT INTO users VALUES(null,'$name','$surname','$email','$password',1)";
	if(!$con->query($query)){
		echo $con->error;
	}
	header("Location: http://localhost/ExampleProject/loginpage.php");
	
?>