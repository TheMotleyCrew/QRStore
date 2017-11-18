<?php

header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "QRStore";

/// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
extract($_GET);

//$uid = $_GET["uid"];
 //Here it is done for uid = 6 as uid will be extracted from previous page which was not known.Uncomment above line to get uid.  
    $uid = 6;
	
	$wal = "SELECT wallet FROM user WHERE uid='$uid'";
	$r = mysqli_query($conn, $wal);
	$wa = mysqli_fetch_array($r);
	
	
	
	$sql = "SELECT pid,qty,store_id FROM cart WHERE uid='$uid'";
	$result = mysqli_query($conn, $sql);
	
	$total = 0;$totalp=0;
	while($row = mysqli_fetch_array($result))
      {
		  $pid = $row["pid"];
		  $sq = "SELECT pname,qty,price FROM products WHERE pid='$pid'";
		  $res = mysqli_query($conn, $sq);
		  $r = mysqli_fetch_array($res);
		  $sid = $row["store_id"];
		 if($r["qty"]<$row["qty"])
		 {
			 $x = "NO" ;
			 
		 }
		 else {
		 $r["qty"] = $r["qty"] - $row["qty"]; 	 
		 $x = "YESS";
		 $totalp = $r["price"] * $row["qty"];
		 
		 }
		 
		  
   		  $qty = $r["qty"]; 
		  $sqlu = "UPDATE products SET qty='$qty' WHERE pid='$pid' AND sid='$sid' ";
          $s = mysqli_query($conn, $sqlu);		  
		  $total = $total + $totalp;
          		  
         
		  echo "$row[pid],$r[pname],$row[qty],$totalp,$row[store_id],'$x':" ;
		 
		 }
		 if($total > $wa[0])
			  $c = 0; //this variable is to notify if sufficient balance or not. 
         else $c = 1;
	 echo "$total,$c";
    mysqli_close($conn);
	
?>
