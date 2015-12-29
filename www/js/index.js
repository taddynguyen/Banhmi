document.addEventListener("deviceready", onDeviceReady, false);



function connectDB() {
    return window.openDatabase("banhmi", "1.0", "Banh mi database", 200000);
}

function onDeviceReady() {
    var db = connectDB();
    db.transaction(populateDb, errorCB, successCBFront);
}



// initialize database
function populateDb(tx) {
    // table so_giao_banh
    tx.executeSql('DROP TABLE IF EXISTS so_giao_banh');
    tx.executeSql('CREATE TABLE IF NOT EXISTS so_giao_banh( id INTEGER PRIMARY KEY AUTOINCREMENT, so_o, ngay, gio)');
    tx.executeSql('CREATE INDEX id ON so_giao_banh(id)');

    // demo value
    tx.executeSql('INSERT INTO so_giao_banh( so_o, ngay, gio) VALUES ("20", "23/12/2015", "7")');
    tx.executeSql('INSERT INTO so_giao_banh( so_o, ngay, gio) VALUES ("30", "23/12/2015", "9")');
    tx.executeSql('INSERT INTO so_giao_banh( so_o, ngay, gio) VALUES ("30", "23/12/2015", "10")');
    tx.executeSql('INSERT INTO so_giao_banh( so_o, ngay, gio) VALUES ("30", "23/12/2015", "11")');
    tx.executeSql('INSERT INTO so_giao_banh( so_o, ngay, gio) VALUES ("10", "23/12/2015", "14")');

    // table so_tien_ban
    tx.executeSql('DROP TABLE IF EXISTS so_tien_ban');
    tx.executeSql('CREATE TABLE IF NOT EXISTS so_tien_ban( id INTEGER PRIMARY KEY AUTOINCREMENT, so_tien, ngay, gio)');

    // demo value
    tx.executeSql('INSERT INTO so_tien_ban( so_tien, ngay, gio) VALUES ("2000000", "23/12/2015", "21")');

    // table so_tien_ban
    tx.executeSql('DROP TABLE IF EXISTS nguyen_lieu');
    tx.executeSql('CREATE TABLE IF NOT EXISTS nguyen_lieu( id INTEGER PRIMARY KEY AUTOINCREMENT, nguyen_lieu, cua_hang)');

    // demo value
    tx.executeSql('INSERT INTO nguyen_lieu( nguyen_lieu, cua_hang) VALUES ("ba tê", "quầy chợ Bà Quẹo")');
    tx.executeSql('INSERT INTO nguyen_lieu( nguyen_lieu, cua_hang) VALUES ("bì", "quầy chợ Bà Quẹo")');
    tx.executeSql('INSERT INTO nguyen_lieu( nguyen_lieu, cua_hang) VALUES ("bơ", "quầy chợ Bà Quẹo")');
    tx.executeSql('INSERT INTO nguyen_lieu( nguyen_lieu, cua_hang) VALUES ("chả", "quầy chợ Bà Quẹo")');
    tx.executeSql('INSERT INTO nguyen_lieu( nguyen_lieu, cua_hang) VALUES ("chà bông", "quầy chợ Bà Quẹo")');

    // table so_tien_ban
    tx.executeSql('DROP TABLE IF EXISTS nhap_nguyen_lieu');
    tx.executeSql('CREATE TABLE IF NOT EXISTS nhap_nguyen_lieu( id INTEGER PRIMARY KEY AUTOINCREMENT, nguyen_lieu_id, quy_cach, so_luong, gia, ngay, gio)');

    // demo value
    tx.executeSql('INSERT INTO nhap_nguyen_lieu( nguyen_lieu_id, quy_cach, so_luong, gia, ngay, gio) VALUES ("1","kg", "2", "21000", "23/12/2015", "13")');
    tx.executeSql('INSERT INTO nhap_nguyen_lieu( nguyen_lieu_id, quy_cach, so_luong, gia, ngay, gio) VALUES ("2","kg", "2", "28000", "23/12/2015", "13")');
    tx.executeSql('INSERT INTO nhap_nguyen_lieu( nguyen_lieu_id, quy_cach, so_luong, gia, ngay, gio) VALUES ("3","kg", "2", "2000", "23/12/2015", "13")');
    tx.executeSql('INSERT INTO nhap_nguyen_lieu( nguyen_lieu_id, quy_cach, so_luong, gia, ngay, gio) VALUES ("4","kg", "2", "98000", "23/12/2015", "13")');


}


function errorCB(err) {
    alert("Lỗi" + err.code);
}

function successCB() {
    var db = connectDB();
    db.transaction(queryDB, errorCB);
}

function successCBFront() {
    var db = connectDB();
    db.transaction(get_front, errorCB);
}