<?php
$host = 'localhost';
$db = 'ludo';
//require_once "db_upass.php";

//$user = $DB_USER;
//$pass = $DB_PASS;
$user = 'root';
$pass = '';

if (gethostname() == 'users.iee.ihu.gr') {//check if we are trying to connect to users
    $mysqli = new mysqli($host, $user, $pass, $db, null , '/home/staff/asidirop/mysql/run/mysql.sock');
}else{//if not then its just localhost (xampp)
    $pass = null;
    $mysqli = new mysqli($host, $user, $pass, $db);
}

if ($mysqli->connect_errno){
    echo "Failed to connect to MySQL: (".
    $mysqli->connect_errno . ") " . $mysqli->connect_error;
}?>