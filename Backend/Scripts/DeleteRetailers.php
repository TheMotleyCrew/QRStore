<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$result=mysqli_query($connect,"SELECT uid FROM user WHERE username='".$username."'");
	while($row=mysqli_fetch_array($result))
	{
		$result1=mysqli_query($connect,"SELECT pid FROM products WHERE uid='".$row['uid']."'");
		while($row1=mysqli_fetch_array($result1))
		{
			$result2=mysqli_query($connect,"DELETE FROM cart WHERE pid='".$row1['pid']."'");
			$result3=mysqli_query($connect,"INSERT INTO deleted (pid) VALUES ('".$row1['pid']."')");
		}
	}
	
	$result=mysqli_query($connect,"DELETE FROM user WHERE username='".$username."'");
	echo 'Done';
?>