<?php

    extract($_GET);
    $result =exec('python Recommendation_system.py '.$pname);
    echo $result;
?>
