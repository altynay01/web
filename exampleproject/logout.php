<?php
	session_start();
	session_unset();
	session_destroy();
	header("Location: http://localhost/ExampleProject/makeup(2).html");
?>