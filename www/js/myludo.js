import { COORDINATES_MAP } from './constants.js';

var me={token:null,piece_color:null};
var dice_output = null;
var game_status={};
var board={};
var last_update=new Date().getTime();
var timer=null;
var green_won = 0;
var yellow_won = 0;
var blue_won = 0;
var red_won = 3;
var scoreboard = [];
const colorMap = {
    'R': 'rgb(180, 0, 0)',
    'G': 'rgb(1, 75, 0)',
    'Y': 'rgb(255, 204, 0)',
    'B': 'rgb(1, 53, 147)'
};

$(function() {
    draw_empty_board();

    $('#ludo_login').click( login_to_game );
    $('#dice').click( throw_dice );
    $('#new_game').click( restart_game );
})

$(window).bind('beforeunload', function(){
    return ' ';
});
$(window).bind('unload', function(){
    restart_game();
});

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
        //gia na kanei refresh ta pionia
        var c = (o.p_color!=null) ? '' : '';
        $(id).html(c);
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
    var seen = new Map();
    for(var i=0;i<data.length;i++) {
        var o = data[i];
        var id = '#square_'+ o.x +'_' + o.y;
        if (seen.has(id)){
            var c1 = (o.p_color!=null)?'<img id="piece_' + data[seen.get(id)].p_color + '_' + data[seen.get(id)].p_num + '" src="images/' + data[seen.get(id)].p_color + '.png" width="14" height="14" style="top: 0; left: 0; position: absolute;">' : '';
            var c2 = (o.p_color!=null)?'<img id="piece_' + o.p_color + '_' + o.p_num + '" src="images/' + o.p_color + '.png" width="14" height="14" style="bottom: 0; right: 0; position: absolute;">' : '';
            var c = c1 + c2;
        }else{
            var c = (o.p_color!=null)?'<img id="piece_'+o.p_color+'_'+o.p_num+'" src="images/'+o.p_color+'.png" width="25" height="25">' : '';
        }
        seen.set(id, i);
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
            $(id).off('click', clicked);
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
                            $(id).off('click', clicked);
                            break;
                        case '#square_2_10':
                            $(id).off('click', clicked);
                            break;
                        case '#square_3_9':
                            $(id).off('click', clicked);
                            break;
                        case '#square_3_10':
                            $(id).off('click', clicked);
                            break;
                        default:
                            $(id).off('click', clicked);
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
                            $(id).off('click', clicked);
                            break;
                        case '#square_9_10':
                            $(id).off('click', clicked);
                            break;
                        case '#square_10_9':
                            $(id).off('click', clicked);
                            break;
                        case '#square_10_10':
                            $(id).off('click', clicked);
                            break;
                        default:
                            $(id).off('click', clicked);
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
                            $(id).off('click', clicked);
                            break;
                        case '#square_2_3':
                            $(id).off('click', clicked);
                            break;
                        case '#square_3_2':
                            $(id).off('click', clicked);
                            break;
                        case '#square_3_3':
                            $(id).off('click', clicked);
                            break;
                        default:
                            $(id).off('click', clicked);
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
                            $(id).off('click', clicked);
                            break;
                        case '#square_9_3':
                            $(id).off('click', clicked);
                            break;
                        case '#square_10_2':
                            $(id).off('click', clicked);
                            break;
                        case '#square_10_3':
                            $(id).off('click', clicked);
                            break;
                        default:
                            $(id).off('click', clicked);
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
    update_info();

    /*
    var old_turn = game_status.p_turn;
    if(dice_output == 6){
        game_status.p_turn = old_turn;
        game_status_update();
    }
    */

    //highlight pawns
    switch (game_status.p_turn){
        case 'G':
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
    var xy = x1 + '.' + y1;
    var coordinates = xy.toString();
    var current_position = COORDINATES_MAP.coordinatesToKey[coordinates];
    if(sql_steps == null || sql_steps == 0){
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
            var new_position = (current_position + dice_output);
            if(new_position > 36){
                new_position -= 36;
                var x2y2 = COORDINATES_MAP.keyToCoordinates[new_position];

            }else{
                var x2y2 = COORDINATES_MAP.keyToCoordinates[new_position];
            }
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
                
                switch (color){
                    case 'G':
                        green_won++;
                        break;
                    case 'Y':
                        yellow_won++;
                        break;
                    case 'B':
                        blue_won++;
                        break;
                    case 'R':
                        red_won++;
                        break;
                }

                if (blue_won == 4) {
                    scoreboard.push(color);
                } else if (green_won == 4) {
                    scoreboard.push(color);
                } else if (red_won == 4) {
                    scoreboard.push(color);
                } else if (yellow_won == 4) {
                    scoreboard.push(color);
                } else {
                    // No player has won
                }
                $('#0_place').html("1. " + scoreboard[0]);
                $('#1_place').html("2. " + scoreboard[1]);
                $('#2_place').html("3. " + scoreboard[2]);
                $('#3_place').html("4. " + scoreboard[3]);
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
			error: move_result
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
    console.log("Full data:", data);

    var x = data.responseJSON;
    if (x && x.errormesg) {
        alert(x.errormesg);
    } else {
        alert("Unknown error occurred.");
    }
}

function game_status_update() {	
	clearTimeout(timer);
	$.ajax({url: "ludo.php/status/", 
    success: update_status,
    headers: {"X-Token": me.token} });
}

function update_status(data) {
	last_update = new Date().getTime();
    //draw_board(); //activate if you want automatic redraw of pawns
    draw_pawns();
	game_status = data[0];
	update_info();
	clearTimeout(timer);
	if(game_status.p_turn == me.piece_color &&  me.piece_color != null) {
		timer = setTimeout(function() { game_status_update();}, 15000);
	} else {
		timer = setTimeout(function() { game_status_update();}, 4000);
	}
}

function update_info(){
    $('#game_info').html("I am Player: <span style='font-weight: bold; color: " + colorMap[me.p_color] + ";'>" + me.p_color + 
    "</span>, my name is <span style='font-weight: bold;'>" + me.username + '</span>' +
    "<br>Token: <span style='color: DarkSlateBlue;'>" + me.token + "</span>"+
    '<br>Game state: <span style="color: navy; font-weight: bold;">' + game_status.status + '</span>' + ", " +
    '<span style="font-weight: bold;color: ' + colorMap[game_status.p_turn] + ';">' + game_status.p_turn + '</span> must play now.');


    $('#dice_info').html("Ζάρι : " + "<span style='font-weight: bold;'>" + dice_output + "</span>");

    if(game_status.status == 'not active' && game_status.p_turn == null && $('#game_initializer').is(":hidden")) {
		alert('Oops looks like another player ended the game.. Enter your name to start a new game!');
        $('#game_initializer').show();
		return;
	}
}

function move_result(data){
    if (data != []){//to pawns epistrefei [] otan vriskei 2 pionia
        try{
            draw_board();
            draw_pawns_by_data(data);   //gia automath emfanish metakinhshs pioniwn

            if(dice_output == 6){
                var color = game_status.p_turn;
                $.ajax({url: "ludo.php/status/" + color, 
                		method: 'PUT',
                        success: update_info
                    });
            }
        }catch(error){
            alert(error);
        }
    }else{
        window.alert("Ωχ υπάρχουν ήδη 2 πιόνια στο κουτί, ρίξε το ζάρι ξανά ή διάλεξε νεο πιόνι!");
    }
}

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
    game_status_update();
    $('#game_initializer').show();
}