<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$result=mysqli_query($connect,"SELECT wallet FROM user WHERE username='".$user."'");
	while($row=mysqli_fetch_array($result))
	{
        echo $row['wallet'];
	}
	
?>