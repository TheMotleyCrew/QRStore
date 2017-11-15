<?php
	
	extract($_POST);
	
	$connect=mysqli_connect('localhost','root','','QRStore');
	echo "<table class='table table-hover table-striped table-condensed mobiletable'>";
	echo "<thead><tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            </tr></thead>
            <tbody>";
	$result=mysqli_query($connect,"SELECT p.pname,p.price,pr.qty from products p inner join purchase pr on p.pid=pr.pid where pr.uid in (SELECT uid FROM user WHERE username='".$user."')");
	while($row=mysqli_fetch_array($result))
	{
        echo "<tr><td>".$row['pname']."</td><td>".$row['qty']."</td><td><i class='fa fa-rupee'></i>".$row['price']."</td><td><i class='fa fa-rupee'></i>".$row['qty']*$row['price']."</td></tr>";
        	
	}
	echo "</tbody></table>"
?>