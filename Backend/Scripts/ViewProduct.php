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
    
    
    if($_SERVER['REQUEST_METHOD']=='GET'){

        extract($_GET);    
       
        
        if($online==1){            
            $sql = "SELECT * from products WHERE pname='$pname' and qty>0 and sid=1 ORDER BY price ASC ";
        }
       
        else{
            $sql = "SELECT * from products WHERE pid='$pid' and qty>0 and sid!=1";            
        }

        $result = mysqli_query($conn, $sql);

        $response =array("count"=>0,"pname"=>"", "products"=>[]);
        $count =0;

        if (mysqli_num_rows($result) > 0) {
            
           
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {

                $response['pname'] = $row['pname'];

                if($online==1){
                    // echo $row['sid'];
                    $seller_query = "SELECT * from user WHERE uid=". $row['uid'];
                    $seller_result = mysqli_query($conn, $seller_query);
                    $sname = mysqli_fetch_assoc($seller_result)['uname'];
                    // echo $sname;
                    array_push($response['products'],json_encode(array('sname'=>$sname,'pid'=>$row['pid'],'qty'=>$row['qty'],'price'=>$row['price'])));
                }

                else{
                    $seller_query = "SELECT * from stores WHERE sid=". $row['sid'];
                    $seller_result = mysqli_query($conn, $seller_query);
                    $sname = mysqli_fetch_assoc($seller_result)['sname'];
                    array_push($response['products'],json_encode(array('sname'=>$sname,'pid'=>$row['pid'],'price'=>$row['price'],'qty'=>$row['qty'])));
                }

                // echo $response['products'][$count];
                $count++;
               
                
            }
            $response['count'] = $count;
            
        } 
    
        echo json_encode($response);
        
    }
?>