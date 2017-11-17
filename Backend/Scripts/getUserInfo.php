<?php
extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	$result=mysqli_query($connect,"SELECT uname,username,password,wallet from user where username='".$user."'");
	while($row=mysqli_fetch_array($result)){
		echo $row['uname']."|".$row['username']."|".$row['password']."|".$row['wallet'];

	}
?>