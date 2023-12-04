<?php
require_once "../lib/dbconnect.php";
require_once "../lib/gamestat.php";
require_once "../lib/board.php";
require_once "../lib/users.php";

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
                show_board();//returns a (select * from board) in JSON format, basically makes an API call and prints the result
            break;
            
            case 'piece': //this case 'piece' and every name you havent seen before, can be edited from ludo.js file
            break;
	        
            default: 
                header("HTTP/1.1 404 Not Found");
            break;
		}
    break;
    
    case 'status': //if the first element is 'status'
		if(sizeof($request) == 0){
            handle_status($method);
        }else{
            header("HTTP/1.1 404 Not Found");
        }
	break;
	
    case 'players': //if the first element is 'status'
	break;

	default:  
        header("HTTP/1.1 404 Not Found");
    exit;
}
?>