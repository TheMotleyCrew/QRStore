<?php
extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	$result=mysqli_query($connect,"SELECT uname,password,email,address,phone from user where username='".$user."'");
	while($row=mysqli_fetch_array($result)){
		echo $row['uname']."|".$row['password']."|".$row['email']."|".$row['address']."|".$row['phone'];

	}
?>