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
	if(mysqli_query($connect,"UPDATE products SET pname='".$pname."', price=".$price.", qty=".$qty.", description='".$description."', sid=".$sid.", category='".$category."' WHERE pid=".$pid))
	{
		echo 'True';
	}
	
?>