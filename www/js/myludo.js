import { COORDINATES_MAP } from './constants.js';

var me={token:null,piece_color:null};
var dice_output = null;
var game_status={};
var board={};
var last_update=new Date().getTime();
var timer=null;

$(function() {
    draw_empty_board();

    $('#ludo_login').click( login_to_game );
    $('#dice').click( throw_dice );
    $('#new_game').click( restart_game );
})

function draw_empty_board() {
    var t = '<table id="ludo_table">';
    for(var i=1;i<12;i++) {
        t += '<tr>';
        for(var j=1;j<12;j++) {
            t += '<td class="ludo_square" id="square_'+i+'_'+j+'"> </td>'; 
        }
        t+='</tr>';
    }
    t += '</table>';
    $('#ludo_board').html(t);
}

function draw_board() {
    $.ajax(
            {url: "ludo.php/board/",
            method: 'GET',
            success: draw_board_by_data
            }
        );
}

function draw_board_by_data(data) {
    for(var i=0;i<data.length;i++) {
        var o = data[i];
        var id = '#square_'+ o.x +'_' + o.y;
        $(id).addClass(o.b_color+'_square');
    }
}

function draw_pawns() {
    $.ajax(
            {url: "ludo.php/pawns/",
            method: 'GET',
            success: draw_pawns_by_data
            }
        );
}

function draw_pawns_by_data(data) {
    for(var i=0;i<data.length;i++) {
        var o = data[i];
        var id = '#square_'+ o.x +'_' + o.y;
        var c = '<img id="piece_'+o.p_color+'_'+o.p_num+'" src="images/'+o.p_color+'.png" width="25" height="25">';
        $(id).html(c);
    }
}

function player_pieces(p_color) {
    $.ajax(
        {url: "ludo.php/p_pieces/"+p_color,
        method: 'GET',
        success: piece_onclick
        }
    );
}

function piece_onclick(data) {
    if(dice_output == 6){
        for(var i=0;i<data.length;i++) {
            var o = data[i];
            var id = '#square_'+ o.x +'_' + o.y;
            $(id).click(clicked);
        }
    }else{
            switch (game_status.p_turn){
                case 'G':
                    for(var i=0;i<data.length;i++) {
                        var o = data[i];
                        var id = '#square_'+ o.x +'_' + o.y;
                        switch (id){
                            case '#square_2_9':
                            case '#square_2_10':
                            case '#square_3_9':
                            case '#square_3_10':
                            break;

                            default:
                                $(id).click(clicked);
                            break;
                        }
                    }
                    break;
                case 'Y':
                    for(var i=0;i<data.length;i++) {
                        var o = data[i];
                        var id = '#square_'+ o.x +'_' + o.y;
                        switch (id){
                            case '#square_9_9':
                            case '#square_9_10':
                            case '#square_10_9':
                            case '#square_10_10':
                            break;

                            default:
                                $(id).click(clicked);
                            break;
                        }
                    }
                    break;
                case 'B':
                    for(var i=0;i<data.length;i++) {
                        var o = data[i];
                        var id = '#square_'+ o.x +'_' + o.y;
                        switch (id){
                            case '#square_2_2':
                            case '#square_2_3':
                            case '#square_3_2':
                            case '#square_3_3':
                            break;

                            default:
                                $(id).click(clicked);
                            break;
                        }
                    }
                    break;
                case 'R':
                    for(var i=0;i<data.length;i++) {
                        var o = data[i];
                        var id = '#square_'+ o.x +'_' + o.y;
                        switch (id){
                            case '#square_9_2':
                            case '#square_9_3':
                            case '#square_10_2':
                            case '#square_10_3':
                            break;

                            default:
                                $(id).click(clicked);
                            break;
                        }
                    }
                    break;
            }
    }
}

function clicked(e){
    var o = e.target.id;  //dinei to id tou img
    var a = o.split(/_/);
    var o2 = e.currentTarget.id;  //dinei to id tou keliou
    var b = o2.split(/_/);
    window.alert(a[1] + ' ' + a[2] + " x="+ b[1]+ "y=" +b[2]);  //shows which pawn you clicked and the keli x y that the pawn is located in
    //btw an allajeis thesi ena pioni kai meta to kaneis click ta x y allazoun sthn twrinh thesi opote einai etoimo

    get_sql_sum(b[1],b[2],a[2],a[1]);
}

function get_sql_sum(x1,y1,p_num,color) {
    $.ajax({url: "ludo.php/psum/" + color + "/" + p_num,
        method: 'GET',
        success: function(data) {
            example_function(x1,y1,p_num,color,data[0].sum);
        }
    });
}

function throw_dice() {
    dice_output = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    //dice_output = 6;
    switch (game_status.p_turn){
        case 'G':
            //clear all onclicks
            //highlight pawns
            player_pieces("G");
            break;
        case 'Y':
            player_pieces("Y");
            break;
        case 'B':
            player_pieces("B");
            break;
        case 'R':
            player_pieces("R");
            break;
    }
}

function example_function(x1,y1,p_num,color,sql_steps){
    var current_position = COORDINATES_MAP.coordinatesToKey[`${x1}.${y1}`];
    if(sql_steps == null){
        switch (color){
            case 'G':
                var start_position = 19;
                break;
            case 'Y':
                var start_position = 28;
                break;
            case 'B':
                var start_position = 10;
                break;
            case 'R':
                var start_position = 1;
                break;
        }
        var x2y2 = COORDINATES_MAP.keyToCoordinates[start_position];
        sql_steps = 1;
        do_move(x2y2[0],x2y2[1],p_num,sql_steps);
    }else{
        var total_steps = sql_steps + dice_output;
        if(total_steps < 35){
            var new_position = (current_position + total_steps)-1;
            var x2y2 = COORDINATES_MAP.keyToCoordinates[new_position];
            do_move(x2y2[0],x2y2[1],p_num,total_steps);
        }else{
            var steps_to_final = (total_steps - 35);
            switch (color){
                case 'G':
                    var finish_position = 304;
                    break;
                case 'Y':
                    var finish_position = 404;
                    break;
                case 'B':
                    var finish_position = 204;
                    break;
                case 'R':
                    var finish_position = 104;
                    break;
            }
            if(steps_to_final >=4){
                var x2y2 = COORDINATES_MAP.keyToCoordinates[finish_position + 3];
                do_move(x2y2[0],x2y2[1],p_num,total_steps);
            }else{
                var x2y2 = COORDINATES_MAP.keyToCoordinates[finish_position + steps_to_final];
                do_move(x2y2[0],x2y2[1],p_num,total_steps);
            }
        }
    }
}

function do_move(x2,y2,p_num,sql_steps) {
	$.ajax({url: "ludo.php/board/piece/"+x2+"/"+y2+"/"+p_num+"/"+sql_steps+"/"+me.token,
			method: 'PUT',
			dataType: "json",
            headers: {"X-Token": me.token},
			contentType: 'application/json',
            data: JSON.stringify( {x: x2, y: y2, p_num: p_num, steps: sql_steps}),//anything we put here, will end up in the input array
			success: move_result,
			error: login_error
        });
}

function login_to_game() {
	if($('#username').val()=='') {
		alert('You have to set a username');
		return;
	}
	var p_color = $('#pcolor').val();
    draw_board();
    draw_pawns();

	$.ajax({url: "ludo.php/players/"+p_color, 
			method: 'PUT',
			dataType: "json",
			headers: {"X-Token": me.token},
			contentType: 'application/json',
			data: JSON.stringify( {username: $('#username').val(), piece_color: p_color}),
			success: login_result,
			error: login_error
        });
}

function login_result(data) {
	me = data[0];
	$('#game_initializer').hide();
	game_status_update();
}

function login_error(data) {
	var x = data.responseJSON;
	alert(x.errormesg);
}

function game_status_update() {	
	clearTimeout(timer);
	$.ajax({url: "ludo.php/status/", 
    success: update_status,
    headers: {"X-Token": me.token} });
}

function update_status(data) {
	last_update = new Date().getTime();
	//var game_stat_old = game_status;
    draw_pawns();
	game_status = data[0];
	update_info();
	clearTimeout(timer);
	if(game_status.p_turn == me.piece_color &&  me.piece_color != null) {
		x = 0;
		// do play
		//if(game_stat_old.p_turn != game_status.p_turn) {
		//	fill_board();
		//}
		$('#move_div').show(1000);
		timer = setTimeout(function() { game_status_update();}, 15000);
	} else {
		// must wait for something
		$('#move_div').hide(1000);
		timer = setTimeout(function() { game_status_update();}, 4000);
	}
}

function update_info(){
	$('#game_info').html("I am Player: " + me.p_color + 
    ", my name is " + me.username 
    + '<br>Token=' + me.token 
    + '<br>Game state: ' 
    + game_status.status 
    + ', ' 
    + game_status.p_turn 
    + ' must play now.');

    $('#dice_info').html("DICE : " + dice_output);
}

//here if do_move doesnt detect an issue the game continues
//if for example it finds 2 pawns already living in a square
//it will return a error we will catch here and make the player
function move_result(data){}

function restart_game() {
	$.ajax({url: "ludo.php/users", 
			method: 'PUT',
            success: new_game,
        });
}

function new_game(){
	alert("Εκκίνηση νέου παιχνιδιού!");
    draw_board();
    draw_pawns();
    $('#game_initializer').hide();
	game_status_update();
}