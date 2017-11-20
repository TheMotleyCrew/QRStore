<?php

    extract($_GET);
    
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
    
    
    if($_SERVER['REQUEST_METHOD']=='GET'){
        
        // $sql = "SELECT count(pname) as num_rows from products ";
        // $result = mysqli_fetch_assoc(mysqli_query($conn, $sql));

        // echo "Tot: ". $result['num_rows'];

        $sql = "SELECT DISTINCT category FROM products ORDER BY category";
        $result = mysqli_query($conn, $sql);

        $response =array("count"=>0,"category"=>[]);
        $count =0;
		
        if (mysqli_num_rows($result) > 0) {
            
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
                
                array_push($response['category'],json_encode(array('category'=>$row['category'])));
                $count++;
            }
            $response['count'] = $count;
            
        } 
    
        echo json_encode($response);	
        
    }
?>