<?php

    //todo
    //Check if it works for last page
    //Add filters

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

        $page_size  = 10;
        $start = ($page_no-1)*$page_size;

        $sql = "SELECT pname, min(price) as price FROM products WHERE category='$category' GROUP BY pname ORDER BY $sort_field LIMIT $page_size OFFSET $start ";
        $result = mysqli_query($conn, $sql);

        $response =array("count"=>0,"products"=>[]);
        $count =0;

        if (mysqli_num_rows($result) > 0) {
            
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
                
                array_push($response['products'],json_encode(array('pname'=>$row['pname'],'price'=>$row['price'])));
                $count++;
            }
            $response['count'] = $count;
            
        } 
    
        echo json_encode($response);	
        
    }
?>