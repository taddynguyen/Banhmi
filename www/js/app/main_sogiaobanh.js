jQuery(document).live('pageshow', '#sogiaobanh', function(event) {
    successCB();
});


var currentRow;

function successCB() {
    var db = connectDB();
    db.transaction(queryDB, errorCB);
}

function successCBFront() {
    var db = connectDB();
    db.transaction(get_front, errorCB);
}


// == show data ==
function queryDB(tx) {
    tx.executeSql('SELECT * FROM so_giao_banh ORDER BY id DESC LIMIT 5 ', [], querySuccess, errorCB);
}

function get_front(tx) {
    tx.executeSql('SELECT * FROM so_giao_banh ORDER BY id DESC  LIMIT 10', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    var trResult = '';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        id = results.rows.item(i).id;
        so_o = results.rows.item(i).so_o;
        ngay = results.rows.item(i).ngay;
        gio = results.rows.item(i).gio;

        trResult += '<tr class="swipe_delete" rel="'+so_o+'" id="'+id+'"> <th>' + i + '</th> <td><a href="#" data-rel="external">' + ngay + '</a></td> <td>' + gio + '</td> <td><p>' + so_o + '</p></td> </tr>';
    }



    jQuery('.data_sogiaobanh').html(trResult);
}



// ************************* show data ends *********************************

//  == insert to database ==
function goInsert() {
    var db = connectDB();
    db.transaction(insertDB, errorCB, successCBFront);
}

function insertDB(tx) {
    so_o = jQuery('#txt_so_o').val();
    ngay = getCurrentDate();
    gio = getCurrentTime();
    tx.executeSql('INSERT INTO so_giao_banh(so_o, ngay, gio) VALUES ("' + so_o + '", "'+ ngay +'", "'+gio+'")');
}

function goDialogInsert () {
    var db = connectDB();
    db.transaction(insertDialogDB, errorCB, successCB);

    // close dialog
    jQuery('[data-role=dialog]').dialog( "close" );
}

function insertDialogDB(tx) {
    so_o = jQuery('#txt_dialog_so_o').val();
    tx.executeSql('INSERT INTO so_giao_banh(so_o) VALUES ("' + so_o + '")');
}

// ********************* insert ends ************************

// swipe tr
jQuery(".swipe_delete").live("swipe", swipeHandler);

// Callback function references the event target and adds the 'swipe' class to it
function swipeHandler(event) {
    id = jQuery(this).attr('id');
    currentRow = id;
    goDelete();
    // jQuery.mobile.refresh();
    // alert(currentRow);
}


// == delete ==
function goDelete() {
    var db = connectDB();
    db.transaction(deleteItem, errorCB, successCBFront);
}

function deleteItem(tx) {
    tx.executeSql('DELETE FROM so_giao_banh WHERE id = '+currentRow);
}
// **************** delete ends *******************


// == edit ==
// tap tr
jQuery(".swipe_delete").live("tap", tabHandler);

// Callback function references the event target and adds the 'swipe' class to it
function tabHandler() {
    id = jQuery(this).attr('id');
    rel = jQuery(this).attr('rel');
    
    currentRow = id;
    var strOpt = '';
    // goDelete();
    // jQuery.mobile.refresh();
    jQuery.mobile.changePage( "modal_sogiaobanh.html", { role: "dialog" } );

 

    jQuery("#modal_sogiaobanh").live("pageshow" , function() {

        strOpt += '<select id="txt_dialog_so_o">';

        for (var i = 10; i < 60; i += 5) {
            if (i == rel) {
                strOpt += '<option selected value="'+i+'">'+i+'</option>';
            } else {
                strOpt += '<option value="'+i+'">'+i+'</option>';
            }
            
        }
    
        strOpt += '</select>';

        jQuery('#txt_dialog_so_o').html(strOpt);
    });
    

}

function goEditDialog() {
    var db = connectDB();
    db.transaction(editDialogDB, errorCB, successCBFront);

    // close dialog
    jQuery('[data-role=dialog]').dialog( "close" );
}

function editDialogDB(tx) {
    so_o = jQuery('#txt_dialog_so_o').val();
    tx.executeSql('UPDATE so_giao_banh SET so_o = "'+ so_o +'" WHERE id = "'+currentRow+'"');
}
// ******************** edit ends ***************************