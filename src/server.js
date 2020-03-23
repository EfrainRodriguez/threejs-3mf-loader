//requerimentos
const express = require('express');
const path = require('path');
//const http = require('http');

const app = express();
//const server = http.createServer(app);

//configurações
app.set('port', 3000);

//recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(process.cwd(), '/public')));
app.use('/modules', express.static(path.join(process.cwd(), '/src/modules')));
app.use('/src', express.static(path.join(process.cwd(), '/src')));

//rotas
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

//servidor ouvindo...
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});