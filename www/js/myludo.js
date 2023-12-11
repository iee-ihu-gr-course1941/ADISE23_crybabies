import { COORDINATES_MAP } from './constants.js';

var dice_output = null;

$(function() {
    draw_empty_board();
    fill_board();

    $('#dice').click( throw_dice );
})

function draw_empty_board() {
    var t = '<table id="ludo_table">';
    for(var i=1;i<12;i++) {
        t += '<tr>';
        for(var j=1;j<12;j++) {
            t += '<td class="ludo_square" id="square_'+i+'_'+j+'">' + i +','+j+'</td>'; 
        }
        t+='</tr>';
    }
    t += '</table>';
    $('#ludo_board').html(t);
}

function fill_board() {
    $.ajax(
            {url: "ludo.php/board/",
            success: fill_board_by_data
            }
        );
}

function fill_board_by_data(data) {
    for(var i=0;i<data.length;i++) {
        var o = data[i];
        var id = '#square_'+ o.x +'_' + o.y;
        var c = (o.piece!=null)?o.piece_color + o.piece:'';
        var im = c;
        //var im = (o.piece!=null)?'<img class="piece" src="images/'+c+'.png">':'';
        $(id).addClass(o.b_color+'_square').html(im);
    }
}

function throw_dice() {
    dice_output = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    if(dice_output == 6){
        //highlight all pieces that can be moved with 6
        //..
    }else{
        //highlight all pieces that can be moved with any other number
        //..
    }
}

/*since we will chose which pieces to highlight, the player can't chose an "illegal" piece, therefore 
when an onclick() event occurs (assuming on a legal piece) we can swoop in and calculate the steps 
it will make. The remaining logic will be handled by php through do_move(). example_function() will
calculate steps and also MAYBE handle sleeping => start_square*/

function example_function(x1,y1,p_num,color,sql_sum){
    var clicked_piece_coordinates = COORDINATES_MAP.coordinatesToKey[`${x1}.${y1}`];

    if(sql_sum == null){
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
        var x2 = COORDINATES_MAP.keyToCoordinates[start_position];

        do_move(x1,y1,x2,y2,p_num);
    }else{

    }
}

function do_move(x1,y1,x2,y2,p_num,sql_sum) {
	$.ajax({url: "ludo.php/board/piece/" + x1 + '/' + y1,//anything we put here, will end up in the link
			method: 'PUT',
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify( {x: x2, y: y2, p_num: p_num, sum: sql_sum}),//anything we put here, will end up in the input array
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