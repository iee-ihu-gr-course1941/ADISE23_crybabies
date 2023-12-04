<?php
function read_status() {
	global $mysqli;
	$sql = 'select * from game_status';
	$st = $mysqli->prepare($sql);
	$st->execute();
	$res = $st->get_result();
	$status = $res->fetch_assoc();
	return($status);
}
?>