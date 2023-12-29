<?php
function show_sql_sum($color,$num) {
	global $mysqli;
	$sql = 'select * from pawns where p_color=? and p_num=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('si', $color, $num);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function show_pieces($p_color) {
	global $mysqli;
	$sql = 'select * from pawns where p_color=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('s', $p_color);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function show_piece() {
	global $mysqli;
	$sql = 'select * from pawns';
	$st = $mysqli->prepare($sql);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function move_piece($x2,$y2,$p_num,$steps,$token){
	global $mysqli;
    if($token==null || $token=='') {
		header("HTTP/1.1 400 Bad Request");
		print json_encode(['errormesg'=>"Token is not set."]);
		exit;
	}
	
	$color = current_color($token);
	if($color==null) {
		header("HTTP/1.1 400 Bad Request");
		print json_encode(['errormesg'=>"You are not a player of this game."]);
		exit;
	}

	$status = read_status();
	if($status['status']!='started') {
		header("HTTP/1.1 400 Bad Request");
		print json_encode(['errormesg'=>"Game is not in action."]);
		exit;
	}

	if($status['p_turn']!=$color) {
		header("HTTP/1.1 400 Bad Request");
		print json_encode(['errormesg'=>"It is not your turn."]);
		exit;
	}

	$st2 = $mysqli->prepare('select count(*) as population from pawns where x=? and y=?');
	$st2->bind_param('ii',$x2,$y2);
	$st2->execute();
	$res2 = $st2->get_result();
	$population = $res2->fetch_assoc()['population'];

	if($population > 0 && $population < 2){//if population is 1
        $st3 = $mysqli->prepare('select p_color from pawns where x=? and y=?');
		$st3->bind_param('ii',$x2,$y2 );
        $st3->execute();
        $res3 = $st3->get_result();
		$existing_color = $res3->fetch_assoc();

        $st4 = $mysqli->prepare('select b_fun from board where x=? and y=?');
		$st4->bind_param('ii',$x2,$y2 );
        $st4->execute();
        $res4 = $st4->get_result();
		$block_function = $res4->fetch_assoc();
        
        if($existing_color['p_color'] == $color || $block_function['b_fun'] == "S" || substr($block_function['b_fun'], -5) === '_start'){//if, piece colors match or the square has special features
            do_move($x2,$y2,$p_num,$color,$steps);//move new piece alongside
        }else{//else, the existing piece is not the same color and the square has no safe features, the existing piece has to be replaced
			$st5 = $mysqli->prepare('select p_num from pawns where x=? and y=?');
			$st5->bind_param('ii',$x2,$y2 );
			$st5->execute();
			$res5 = $st5->get_result();
			$existing_p_num['p_num'] = $res5->fetch_assoc();

			$st6 = $mysqli->prepare('select x from pawns_empty where p_color=? and p_num=?');
			$st6->bind_param('si',$existing_color['p_color'],$existing_p_num['p_num']);
			$st6->execute();
			$res6 = $st6->get_result();
			$xsleep['x'] = $res6->fetch_assoc();

			$st7 = $mysqli->prepare('select y from pawns_empty p_color=? and p_num=?');
			$st7->bind_param('si',$existing_color['p_color'],$existing_p_num['p_num']);
			$st7->execute();
			$res7 = $st7->get_result();
			$ysleep['y'] = $res7->fetch_assoc();

            do_move($xsleep['x'],$ysleep['y'],$existing_p_num['p_num'],$existing_color['p_color'],$steps);//move old piece

			do_move($x2,$y2,$p_num,$color,$steps);//move new piece
        }
    }else if($population >= 2){//if pionia are 2 akrivos
        //throw dice again or chose another piece
    }else{
        do_move($x2,$y2,$p_num,$color,$steps);//move new piece
    }
}

function do_move($x2,$y2,$p_num,$color,$steps) {
	global $mysqli;
	$sql = 'call `move_piece`(?,?,?,?,?);';
	$st = $mysqli->prepare($sql);
	$st->bind_param('iiisi',$x2,$y2,$p_num,$color,$steps);
	$st->execute();
	header('Content-type: application/json');
	print json_encode(read_board(), JSON_PRETTY_PRINT);
}
?>