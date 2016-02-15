<?php
// print_r($_REQUEST);
$request = key($_REQUEST);
$request = explode('/', $request);
echo json_encode($request);
?>