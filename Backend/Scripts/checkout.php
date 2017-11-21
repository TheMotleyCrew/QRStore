<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$data = array();
	if($sid==1)
	{
		$result=mysqli_query($connect,"SELECT p.pname as pname,p.qty as totalqty,c.qty as qty, p.price as price FROM products as p,cart as c WHERE p.pid=c.pid AND c.uid=".$uid." AND p.sid=1");
	}
	else if($sid==2)
	{
		$result=mysqli_query($connect,"SELECT p.pname as pname,p.qty as totalqty,c.qty as qty, p.price as price FROM products as p,cart as c WHERE p.pid=c.pid AND c.uid=".$uid." AND p.sid!=1");
	}
	
	while($row=mysqli_fetch_array($result))
	{
        $data[] = $row;
	}
	echo json_encode($data);
	
?>