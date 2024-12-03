const mongoose = require("mongoose");
// Connect witch db
const dbConnection = () => {
  mongoose.connect(process.env.DB_URL).then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  })
};


module.exports = dbConnection
