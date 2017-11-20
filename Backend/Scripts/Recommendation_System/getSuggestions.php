<?php

    extract($_GET);
    $result =exec('python Reco_enhancement.py "'.$pname.'"');
    echo $result;
?>
