const express = require('express');
const app = express();
const connectDb = require('./config/db');

//Connect to database
connectDb();

//Init middleware
app.use(express.json({ extended: false }))

app.get('/', (req,res) => {
    res.json({ 
        msg: "Contact keeper API",
        developedBy: "Madridano, Nikolai"
    })
});

//Routes
app.use('/api/users', require('./routes/user'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Status: Server running on port ${PORT}`);
})