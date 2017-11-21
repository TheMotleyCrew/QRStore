<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	if($sid==1)
	{
		$result=mysqli_query($connect,"SELECT p.pname as pname,p.qty as totalqty,c.qty as qty, p.price as price FROM products as p,cart as c WHERE p.pid=c.pid AND c.uid=".$uid." AND p.sid=1");
	}
	else if($sid==2)
	{
		$result=mysqli_query($connect,"SELECT p.pname as pname,p.qty as totalqty,c.qty as qty, p.price as price FROM products as p,cart as c WHERE p.pid=c.pid AND c.uid=".$uid." AND p.sid!=1");
	}
	
	$total = 0;
	$flag = 0;
	while($row=mysqli_fetch_array($result))
	{
		if(($row['totalqty']-$row['qty'])<=0)
		{
			$flag = 1;
		}
	}
	
	if($flag == 1)
	{
	}
	else
	{
		if($sid==1)
		{
			$result=mysqli_query($connect,"SELECT c.pid as pid, p.pname as pname,p.qty as totalqty,c.qty as qty, p.price as price FROM products as p,cart as c WHERE p.pid=c.pid AND c.uid=".$uid." AND p.sid=1");
		}
		else if($sid==2)
		{
			$result=mysqli_query($connect,"SELECT c.pid as pid, p.pname as pname,p.qty as totalqty,c.qty as qty, p.price as price FROM products as p,cart as c WHERE p.pid=c.pid AND c.uid=".$uid." AND p.sid!=1");
		}
		while($row=mysqli_fetch_array($result))
		{
			if(mysqli_query($connect,"UPDATE products SET qty=".($row['totalqty']-$row['qty'])." WHERE pid=".$row['pid']))
			{
				$temp = $row['price']*$row['qty'];
				$result1 = mysqli_query($connect,"SELECT qty FROM products WHERE pid=".$row['pid']);
				while($row1=mysqli_fetch_array($result1))
				{
					if($row1['qty']>=0)
					{
						if(mysqli_query($connect,"UPDATE user SET wallet=wallet - ".$temp." WHERE uid=".$uid))
						{
							
							$result3 = mysqli_query($connect,"SELECT wallet FROM user WHERE uid=".$uid);
							while($row2=mysqli_fetch_array($result3))
							{
								if($row2['wallet']>=0)
								{
									$result6 = mysqli_query($connect,"DELETE FROM cart WHERE pid=".$row['pid']." AND uid=".$uid);
									$result7 = mysqli_query($connect,"SELECT uid FROM products WHERE pid=".$row['pid']);
									while($row3=mysqli_fetch_array($result7))
									{
										$result8 = mysqli_query($connect,"UPDATE user SET wallet=wallet + ".$temp." WHERE uid=".$row3['uid']);
									}
								}
								else
								{
									$result4 = mysqli_query($connect,"UPDATE user SET wallet=wallet + ".$temp." WHERE uid=".$uid);
									$result5 = mysqli_query($connect,"UPDATE products SET qty=".$row['totalqty']." WHERE pid=".$row['pid']);
									$flag = 5;
								}
							}
						}
						else
						{
							$flag = 2;
						}
					}
					else
					{
						$result2 = mysqli_query($connect,"UPDATE products SET qty=".$row['totalqty']." WHERE pid=".$row['pid']);
						$flag = 3;
					}
				}
			}
			else
			{
				$flag = 4;
			}				
		}
	}
	
	if($flag == 1 || $flag == 2 || $flag == 3 || $flag == 4)
	{
		echo 'False';
	}
	else if($flag == 5)
	{
		echo 'Cash';
	}
	else
	{
		echo 'True';
	}
	
?>