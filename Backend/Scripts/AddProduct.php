<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	$result=mysqli_query($connect,"SELECT * FROM products");
	$count=0;
	while($row=mysqli_fetch_array($result))
	{
        $count++;
	}
	$count++;
	if(mysqli_query($connect,"INSERT INTO products (pid, uid, pname, price, qty, description, sid, category) VALUES (".$count.", ".$uid.", '".$pname."', ".$price.", ".$qty.", '".$description."', ".$sid.", '".$category."')"))
	{
		echo 'True';
	}
	
?>