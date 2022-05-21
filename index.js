const express = require('express');
const app = express();
const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.send('Tools Manufacturer Running')
})

app.listen(port, () => {
    console.log(`Manufacturer app listening on port ${port}`)
})