<?php
	$name = $_POST['name'];
	$password = md5($_POST['password']);
	include "connection.php";
	$query = "SELECT * FROM users WHERE name='".$name."' AND password='".$password."'";
	if($row = $con->query($query)->fetch_array()){
		session_start();
		$_SESSION['name'] = $row['name'];
		$_SESSION['uid'] = $row['id'];
		$_SESSION['surname'] = $row['surname'];
		$_SESSION['email'] = $row['email'];
		$_SESSION['admin'] = $row['admin'];
		header("Location: profile.php");	
	}else{
		$con->error;
	}
?>
