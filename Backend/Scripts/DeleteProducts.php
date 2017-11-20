<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$result=mysqli_query($connect,"INSERT INTO deleted (pid) VALUES (".$pid.")");
	$result=mysqli_query($connect,"DELETE FROM cart WHERE pid=".$pid);
	echo 'Done';
?>