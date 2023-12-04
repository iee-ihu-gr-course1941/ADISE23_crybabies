<?php
function current_color($token) {
	global $mysqli;
	if($token==null) {
        return(null);
    }
	$sql = 'select * from players where token=?';
	$st = $mysqli->prepare($sql);
	$st->bind_param('s',$token);
	$st->execute();
	$res = $st->get_result();
	if($row=$res->fetch_assoc()) {
		return($row['p_color']);
	}
	return(null);
}
?>