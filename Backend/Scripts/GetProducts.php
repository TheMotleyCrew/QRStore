<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$data = array();
	$result=mysqli_query($connect,"SELECT pid,sname,pname,qty,category,price FROM products,stores WHERE products.uid=".$uid." AND products.sid=stores.sid and products.pid NOT IN (SELECT * FROM deleted) ORDER BY qty");
	while($row=mysqli_fetch_array($result))
	{
        $data[] = $row;
	}
	echo json_encode($data);
	
?>