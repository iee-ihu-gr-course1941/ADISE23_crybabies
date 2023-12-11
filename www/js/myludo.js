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
$(draw_empty_board);

/*
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
        //var c = (o.piece!=null)?o.piece_color + o.piece:'';
        //var im = c;
        //var im = (o.piece!=null)?'<img class="piece" src="images/'+c+'.png">':'';
        //$(id).addClass(o.b_color+'_square').html(im);
    }
}
    */
