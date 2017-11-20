<?php

	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$result=mysqli_query($connect,"SELECT urole FROM user WHERE username='".$user."' AND password='".$pass."'");
	$count=0;
	while($row=mysqli_fetch_array($result))
	{
        $count++;
	}
	
	$result=mysqli_query($connect,"SELECT uid,urole FROM user WHERE username='".$user."' AND password='".$pass."'");
	if($count==0)
	{
		$result1=mysqli_query($connect,"SELECT uname FROM pending WHERE username='".$user."' AND password='".$pass."'");
		$count=0;
		while($row=mysqli_fetch_array($result1))
		{
			$count++;
		}
		if($count==0)
		{
			echo "False";
		}
		else
		{
			echo "Pending";
		}
	}
	else
	{
		while($row=mysqli_fetch_array($result))
		{
			echo $row['urole'].";".$row['uid'];
		}
	}

?>