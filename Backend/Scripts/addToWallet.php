<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	$res=mysqli_query($connect,"SELECT wallet FROM user WHERE username='".$user."'");
	$row=mysqli_fetch_array($res);
	$balance=$row['wallet'];
	$new_balance=$balance+$amount;
	$result=mysqli_query($connect,"Update user SET wallet=".$new_balance." WHERE username='".$user."'");
	//$row=mysqli_fetch_array($result))
	
?>