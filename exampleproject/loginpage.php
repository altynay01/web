<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
</head>

<body>
	<div><center><h2>Login Form<h2><center></div>
	<div class="col-md-6 col-md-offset-3" style="margin-top: 25px;">
		<form class="form-horizontal" method="POST" action="login.php">
			<div class="from-group">
				<label class="col-md-4">Name</label>
				<input type="text" class="form-control" placeholder="name" name="name">
			</div>
			<div class="from-group">
				<label class="col-md-4">Password</label>
				<input type="password" class="form-control" placeholder="password" name="password">
			</div>
			<div class="checkbox">
				<label><input type="checkbox">Remember me</label>
			</div>
			<div class="from-group has-success">
				<center><input type="submit" class="btn btn-primary"></center>
			</div>
		</form>
</body>