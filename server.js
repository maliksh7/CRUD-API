const express = require('express');
//app
const app = express();

//routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog!! My name is Saad');
});

//start server
app.listen(3000, () => {
    console.log('server started');
});

