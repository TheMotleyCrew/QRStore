<?php
	
	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	
	$bills=mysqli_query($connect,"SELECT bid,pdate,SUM(qty*price) as total from purchase where uid in (SELECT uid FROM user WHERE username='".$user."') group by bid order by pdate desc");
	while($billrow=mysqli_fetch_array($bills)){
		echo "<div class='container well order-container' ><div class='row'><div class='col-md-4 col-xs-6'> <button class='btn btn-info btn-block' type='button'><strong>Order ID ".$billrow['bid']."</strong></button></div></div>";
		echo "<div class='container-fluid well'><table class='table table-hover table-striped table-condensed mobiletable'>";
		echo "<thead><tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            </tr></thead>
            <tbody>";
        $result=mysqli_query($connect,"SELECT p.pname,p.price,pr.qty from products p inner join purchase pr on p.pid=pr.pid where pr.bid=".$billrow['bid']." and pr.uid in (SELECT uid FROM user WHERE username='".$user."')");
        while($row=mysqli_fetch_array($result))
		{
        echo "<tr><td>".$row['pname']."</td><td><i class='fa fa-rupee'></i>".$row['price']."</td><td>".$row['qty']."</td><td><i class='fa fa-rupee'></i>".$row['qty']*$row['price']."</td></tr>";
        	
		}
		echo "</tbody></table></div><hr/>";
		echo "<div class='row'><span  style='font-weight: bold; color:#31708f '><div class='col-md-6 col-xs-6 text-left '>Purchased on : ".$billrow['pdate']."</div><div class='col-md-6 col-xs-6 text-right'>Order total : <span class='total' ><i class='fa fa-rupee'></i>".$billrow['total']."</span></div></div></div>";
	}
	
	// $result=mysqli_query($connect,"SELECT p.pname,p.price,pr.qty from products p inner join purchase pr on p.pid=pr.pid where pr.uid in (SELECT uid FROM user WHERE username='".$user."')");
	
?>