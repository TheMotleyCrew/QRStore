<?php
extract($_POST);

$connect=mysqli_connect('localhost','root','','QRStore');
	if($toggle==1){
		$result=mysqli_query($connect,"UPDATE user set uname='$name' , username='$username' where username='".$user."'");
		
		echo $result;
	}
	else if($toggle==2){
		$result=mysqli_query($connect,"UPDATE user set password='$password' where username='".$user."'");
		echo $result;
	}
	else if($toggle==3){
		$result=mysqli_query($connect,"UPDATE user set email='$email' where username='".$user."'");
		echo $result;
	}
	else if($toggle==4){
		$result=mysqli_query($connect,"UPDATE user set phone='$phone' where username='".$user."'");
		echo $result;
	}
	else if($toggle==5){
		$result=mysqli_query($connect,"UPDATE user set address='$address' where username='".$user."'");
		echo $result;
	}

	
	
?>