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

function show_status() {	
	global $mysqli;
	$sql = 'select * from game_status';
	$st = $mysqli->prepare($sql);
	$st->execute();
	$res = $st->get_result();

	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function update_game_status() {
	global $mysqli;
	$status = read_status();	
	$new_status = null;
	$new_turn = null;

	$sql = 'select count(*) as c from players where username is not null';
	$st = $mysqli->prepare($sql);
	$st->execute();
	$res = $st->get_result();
	$active_players = $res->fetch_assoc()['c'];
		
	switch($active_players) {
		case 0: 
			$new_status='not active'; 
		break;

		case 1: 
			$new_status='initialized'; 
		break;

		case 2:
		case 3:
		case 4: 
			$new_status='started'; 
			if($status['p_turn'] == null) {//First turn always goes to Red
				$new_turn='R';
			}
		break;
	}

	$sql = 'update game_status set status=?, p_turn=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('ss',$new_status,$new_turn);
	$st->execute();
}

function insert_status($t){
	global $mysqli;
	$sql = 'update game_status set p_turn=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('s',$t);
	$st->execute();
}
?>