<?php
require_once "../lib/dbconnect.php";
require_once "../lib/gamestat.php";
require_once "../lib/board.php";
require_once "../lib/users.php";
require_once "../lib/pawns.php";

$method = $_SERVER['REQUEST_METHOD'];//which method is used, POST,GET,PUT...
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));//trims path (link) at every '/'
$input = json_decode(file_get_contents('php://input'),true);//process raw data and save it in $input, which is an array full of game info

if($input==null) {//ensures $input becomes an array even if empty
    $input=[];
}

if(isset($_SERVER['HTTP_X_TOKEN'])) {//the unique session token for each active user
    $input['token'] = $_SERVER['HTTP_X_TOKEN'];//store token into $input
}else{
    $input['token'] = '';//if not available, just make it an empty string
}

//get the first element of the array and save it to $r, this is how the API gets called from the 
//link we trimmed above
switch ($r = array_shift($request)) {
    case 'board' ://if the first element is 'board'
        switch ($b = array_shift($request)){//if the next first element is, idk whatever see bellow
            case '':
            case null: 
                handle_board($method);//
            break;
            
            case 'piece':
                piece_move($method, $input, $request);
            break;
	        
            default: 
                header("HTTP/1.1 404 Not Found");
            break;
		}
    break;
    
    case 'status': //if the first element is 'status'
        switch ($b = array_shift($request)){
            case '':
            case null: 
                handle_status($method);
            break;
                
            case 'R':
            case 'B':
            case 'G':
            case 'Y':
                handle_turn($method, $b);
            break;
                
            default: 
                header("HTTP/1.1 404 Not Found");
            break;
        }
	break;
	
    case 'players': //if the first element is 'players'
        handle_player($method, $request, $input);
    break;

    case 'psum': //if the first element is 'pawns'
        handle_piece($method, $request);
    break;

    case 'pawns'://this and pawns need to change names, this one returns all the pawns while "pawns" returns 1 single piece
        handle_pawns($method);
    break;

    case 'p_pieces':
        handle_pieces($method,$request);
    break;

    case 'users':
        empty_users($method);
    break;

	default:  
        header("HTTP/1.1 404 Not Found");
    exit;
}

//checks what kind of communication we want with the API, after that it calls a function from board.php
function handle_board($method) {
    if($method=='GET') {
        show_board();//function from board.php
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}

//checks what kind of communication we want with the API, after that it calls a function from gamestat.php
function handle_status($method) {
    if($method=='GET') {
        show_status();//function from gamestat.php
    } else{
        header('HTTP/1.1 405 Method Not Allowed');
    }
}

function handle_turn($method, $t){
    if($method=='PUT'){
        insert_status($t);
    } else{
        header('HTTP/1.1 405 Method Not Allowed');
    }
}

//meeds more parameters to match show_sql_sum()
function handle_piece($method, $p) {
    if($method=='GET') {
        $p_color = array_shift($p);
        $p_num = array_shift($p);
        show_sql_sum($p_color, $p_num);//function from pawns.php
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}

//sets a new user to the SQL server or gets info for a user if he exists
function handle_player($method, $p, $input) {
    switch ($b = array_shift($p)) {
        case 'R': 
        case 'B':
        case 'G':
		case 'Y': 
            handle_user($method, $b, $input);//function from users.php, $b is the color of the player
		break;
	
        default: 
            header("HTTP/1.1 404 Not Found");
			print json_encode(['errormesg'=>"Player $b not found."]);
        break;
	}
}

function handle_pieces($method, $color){
    if($method=='GET') {
        $a = array_shift($color);
        show_pieces($a);
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}

function piece_move($method, $input, $request) {
    if ($method=='PUT') {
        $x2 = array_shift($request);
        $y2 = array_shift($request);
        $p_num = array_shift($request);
        $steps = array_shift($request);
        $token = array_shift($request);
        move_piece($x2,$y2,$p_num,$steps,$token);
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}

function handle_pawns($method) {
    if($method=='GET') {
        show_piece();
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}

function empty_users($method) {
    if($method=='PUT') {
        reset_players();
        reset_pawns();
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
    }
}
?>