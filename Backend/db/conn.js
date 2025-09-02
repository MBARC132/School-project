import mysql from 'mysql2'

const conn = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root",
    database:"schooldb"
})

conn.connect((err) => {
    if(err) throw err;
    console.log("DB Connected");
})

export default conn;