<?php
function show_sql_sum($token,$p_num) {
	$color = current_color($token);
	global $mysqli;
	$sql = 'select * from pawns where p_color=? and p_num=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('ii', $color, $p_num);
	$st->execute();
	$res = $st->get_result();
	$sum = $res->fetch_assoc();
	return($sum);
}

function show_piece($x,$y) {
	$color = current_color($token);
	global $mysqli;
	$sql = 'select * from pawns where x=? and y=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('ii', $x, $y);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function move_piece($x,$y,$x2,$y2,$token,$p_num,$steps){
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

	if($population > 0 && population < 2){//if population is 1
        $st3 = $mysqli->prepare('select p_color from pawns where x=? and y=?');
		$st3->bind_param('ii',$x2,$y2 );
        $st3->execute();
        $res3 = $st3->get_result();

        $st4 = $mysqli->prepare('select b_fun from board where x=? and y=?');
		$st4->bind_param('ii',$x2,$y2 );
        $st4->execute();
        $res4 = $st4->get_result();
        
        if(res3 == $color || res4 == "S" || substr($res4, -6) === '_start'){//if, piece colors match or the square has special features
            do_move($x,$y,$x2,$y2,$p_num,$color,$steps);//move new piece alongside
        }else{//else, the existing piece is not the same color and the square has no safe features, the existing piece has to be replaced
			$st6 = $mysqli->prepare('select p_num from pawns where x=? and y=?');
			$st6->bind_param('ii',$x2,$y2 );
			$st6->execute();
			$res6 = $st6->get_result();

			$st6 = $mysqli->prepare('select x from pawns_empty where p_color=? and p_num=?');
			$st6->bind_param('ii',$res3,$res6 );
			$st6->execute();
			$xsleep = $st6->get_result();

			$st6 = $mysqli->prepare('select y from pawns_empty p_color=? and p_num=?');
			$st6->bind_param('ii',$res3,$res6 );
			$st6->execute();
			$ysleep = $st6->get_result();

            do_move($x2,$y2,$xsleep,$ysleep,$res6,$res3,$steps);//move old piece

			do_move($x,$y,$x2,$y2,$p_num,$color,$steps);//move new piece
        }
    }else if(population >= 2){//if pionia are 2 akrivos
        //throw dice again or chose another piece
    }else{
        do_move($x,$y,$x2,$y2,$p_num,$color,$steps);//move new piece
    }
}

function do_move($x,$y,$x2,$y2,$p_num,$color,$steps) {
	global $mysqli;
	$sql = 'call `move_piece`(?,?,?,?,?,?,?);';
	$st = $mysqli->prepare($sql);
	$st->bind_param('iiiiii',$x,$y,$x2,$y2,$p_num,$color,$steps);
	$st->execute();

	header('Content-type: application/json');
	print json_encode(read_board(), JSON_PRETTY_PRINT);
}
?>