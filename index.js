const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const dbConnect = require('./utils/dbConnect');
const partsRoutes = require('./routes/v1/parts.route');
const viewCount = require('./middleware/viewCount');
const errorHandler = require('./middleware/errorHandler');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors())
app.use(express.json())


app.use(viewCount);

dbConnect();
app.use('/api/v1/parts', partsRoutes);


function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next();
    })
}



app.get('/', (req, res) => {
    res.send('Tools Manufacturer Running')
    // res.sendFile(__dirname + '/public/index.html')
})

app.all('*', (req, res) => {
    res.send('No route found');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Manufacturer app listening on port ${port}`)
});

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});