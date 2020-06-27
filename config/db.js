const APP_NAME = 'ContactKeeperDb';

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = async () => {
    
    //Localhost -> mongodb://localhost/ 
    //Online    -> db
    mongoose.connect(`mongodb://localhost/${APP_NAME}`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Status: Connected to ${APP_NAME}`)
    })
    .catch(err => {
        console.log(`Status: Connection failed`)
        console.log(`Description: ${err}`)

        process.exit(1);
    })
}
module.exports = connectDb;