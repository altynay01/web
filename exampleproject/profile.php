<?php
	session_start();
	if(!isset($_SESSION['uid'])){
		header("Location: loginpage.php");
	}
	echo "Hello ".$_SESSION['name']." ".$_SESSION['surname'];
?>
<a href="logout.php"> Logout</a>