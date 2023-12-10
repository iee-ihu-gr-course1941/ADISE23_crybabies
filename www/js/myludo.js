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
    document.getElementById("ludo_board").innerHTML += t;
}


    
