const mysql = require('mysql');
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"zigmacimdb"
});

const movie_data = ["movie_data", "imdb_id, title, summary, rating, genre, img_url, img_path, runtime, actors, date_published, local_path, type"]

var rowCount;

function con_start(){
    var x = ""
    con.connect(function(err){
        if(err){
            throw err;
        }
        console.log("connected");

        
    });
}
function con_end(){
    con.end();
}

con_start();




function checkCount($table, values, callback){
    const $query = "SELECT COUNT(*) AS total FROM "+$table[0]+" WHERE "+$table[2]+" = '"+values[0]+"'";
    con.query($query, function(err, result){
            if(err){
                throw err;
            }
            
            callback(result[0].total);
        });

        
}


function table_re(table, values){
    var $table ;
    if(table == "movie_data"){
        $table = movie_data;
        $table[2] = "imdb_id";
        // var x = checkCount($table, values, function(result){
        //     rowCount = result;
            
        // });

        

        $table[4] = "INSERT INTO "+$table[0]+" ("+$table[1]+") VALUES ('"+values[0]+"', '"+values[1]+"', '"+values[2]+"', '"+values[3]+"', '"+values[4]+"', '"+values[5]+"', '"+values[6]+"', '"+values[7]+"', '"+values[8]+"', '"+values[9]+"', '"+values[10]+"', '"+values[11]+"')";

    }
    return $table;
}



function insertDb(table, values){
    

    var $table = table_re(table, values);

    const $query = $table[4];

        con.query($query, function(err, result){
            if(err){
                console.log(err.message);
            }
            console.log("Record Added");
        });

    


}

module.exports = {
    insertDb
}