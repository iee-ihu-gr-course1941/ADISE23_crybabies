import { COORDINATES_MAP } from './constants.js';

var dice_output = null;

$(function() {
    draw_empty_board();
    draw_board();
    draw_pawns();

    $('#dice').click( throw_dice );
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
            {url: "ludo.php/piece/",
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
        $(id).click(clicked);
    }
}

function clicked(e){
    var o = e.target.id;  //dinei to id tou img
    var a = o.split(/_/);

    var o2 = e.currentTarget.id;  //dinei to id tou keliou
    var b = o2.split(/_/);
    window.alert(a[1] + ' ' + a[2] + " x="+ b[1]+ "y=" +b[2]);  //shows which pawn you clicked and the keli x y that the pawn is located in
    //btw an allajeis thesi ena pioni kai meta to kaneis click ta x y allazoun sthn twrinh thesi opote einai etoimo
}

function get_sql_sum(x1,y1,p_num,color) {
    $.ajax({url: "ludo.php/pawns/",
        method: 'POST',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify( {p_num: p_num}),//anything we put here, will end up in the input array
        headers: {"X-Token": me.token},
        success: function(data) {
            example_function(x1,y1,p_num,color,data.sum);//maybe .sum wont work, we see
        }
    }
    );
}

function throw_dice() {
    dice_output = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    if(dice_output == 6){
        //highlight all pieces that can be moved with 6
        //player selects a piece..
        get_sql_sum(x1,y1,p_num,color);
    }else{
        //highlight all pieces that can be moved with any other number
        //player selects a piece..
        get_sql_sum(x1,y1,p_num,color);
    }
}

function example_function(x1,y1,p_num,color,sql_steps){
    var current_position = COORDINATES_MAP.coordinatesToKey[`${x1}.${y1}`];
    if(sql_steps == null){
        switch (color){
            case G:
                var start_position = 19;
                break;
            case Y:
                var start_position = 28;
                break;
            case B:
                var start_position = 10;
                break;
            case R:
                var start_position = 1;
                break;
        }
        var x2y2 = COORDINATES_MAP.keyToCoordinates[start_position];
        sql_steps = 1;
        do_move(x1,y1,x2y2[0],x2y2[1],p_num,sql_steps);
    }else{
        var total_steps = sql_steps + dice_output;
        if(total_steps < 35){
            var new_position = current_position + total_steps;
            var x2y2 = COORDINATES_MAP.keyToCoordinates[new_position];
            do_move(x1,y1,x2y2[0],x2y2[1],p_num,sql_steps);
        }else{
            var steps_to_final = (total_steps - 35);
            switch (color){
                case G:
                    var finish_position = 304;
                    break;
                case Y:
                    var finish_position = 404;
                    break;
                case B:
                    var finish_position = 204;
                    break;
                case R:
                    var finish_position = 104;
                    break;
            }
            if(steps_to_final >=4){
                var x2y2 = COORDINATES_MAP.keyToCoordinates[finish_position + 3];
                do_move(x1,y1,x2y2[0],x2y2[1],p_num,sql_steps);
            }else{
                var x2y2 = COORDINATES_MAP.keyToCoordinates[finish_position + steps_to_final];
                do_move(x1,y1,x2y2[0],x2y2[1],p_num,sql_steps);
            }
        }
    }
}

function do_move(x1,y1,x2,y2,p_num,sql_steps) {
	$.ajax({url: "ludo.php/board/piece/" + x1 + '/' + y1,//anything we put here, will end up in the link
			method: 'PUT',
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify( {x: x2, y: y2, p_num: p_num, steps: sql_steps}),//anything we put here, will end up in the input array
			headers: {"X-Token": me.token},
			success: move_result,
			error: login_error});
}

//to be dealt with in the future, no idea how we will use it
function move_result(data){}

function login_error(data) {
	var x = data.responseJSON;
	alert(x.errormesg);
}

/*------------------------------test zone-------------------------------*/
//these are a test to see how the MAP works, what you input and it outputs
const coordinatesForKey = COORDINATES_MAP.keyToCoordinates[1];
console.log("POSITION 1 corresponds to : " + coordinatesForKey);
//this retuns an array, look at the following CLEAN response
const coordinatesForKey2 = COORDINATES_MAP.keyToCoordinates[2];
console.log(coordinatesForKey2);

var x1=6;
var y1=12;
//making this part accept an array as input [x,y] is a pain so we will write it as x.y, like a float
const keyForCoordinates = COORDINATES_MAP.coordinatesToKey[`${x1}.${y1}`];
console.log("6.13 corresponds to : "+keyForCoordinates);