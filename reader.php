<?php
	header("Access-Control-Allow-Origin: *");

	$layers = [];
	$fileID = 0;
	while (file_exists("layers/layer$fileID.txt")) {
		$nextFile = nl2br(file_get_contents("layers/layer$fileID.txt"));
		$obj = (object) array('text' => $nextFile, 'depth' => $fileID);
		array_push($layers, $obj);
		$fileID++;
	}

	echo json_encode($layers);
?>