<?php
	
	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$bills=mysqli_query($connect,"SELECT bid,pdate,SUM(qty*price) as total from purchase where uid in (SELECT uid FROM user WHERE username='".$user."') group by bid order by pdate desc");
	while($billrow=mysqli_fetch_array($bills)){
		echo "<div class='container well order-container' ><div class='row'><div style='width:75%' class='col-md-4 col-xs-4'> <button class='btn btn-info btn-block' type='button'><strong>Order ID ".$billrow['bid']."</strong></button></div></div>";
		echo "<div class='container well'><table class='table table-hover table-striped table-condensed mobiletable'>";
        $result=mysqli_query($connect,"SELECT p.pname,pr.price,pr.qty from products p inner join purchase pr on p.pid=pr.pid where pr.bid=".$billrow['bid']." and pr.uid in (SELECT uid FROM user WHERE username='".$user."')");
        while($row=mysqli_fetch_array($result))
		{
        echo "<tr><td>".$row['pname']."<br><b>Price: </b><i class='fa fa-rupee'></i>".$row['price']."<br><b>Qty: </b>".$row['qty']."<br><b>Total: </b><i class='fa fa-rupee'></i>".$row['qty']*$row['price']."</td></tr>";
        	
		}
		echo "</tbody></table></div><hr/>";
		echo "<div class='row'><span  style='font-weight: bold; color:#31708f '><div style='width:100%' class='col-md-6 col-xs-6 text-left '>Purchased: ".$billrow['pdate']."<br>Amount: <span style='font-weight: bold; font-size:20;'><i class='fa fa-rupee'></i>".$billrow['total']."</span></div></div></div>";
	}
	
	// $result=mysqli_query($connect,"SELECT p.pname,p.price,pr.qty from products p inner join purchase pr on p.pid=pr.pid where pr.uid in (SELECT uid FROM user WHERE username='".$user."')");
	
?>