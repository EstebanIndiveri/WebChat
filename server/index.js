

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io=require('socket.io')(server);


app.use(express.static('client'));

app.get('/hola-mundo',function(req,res){
    res.status(200).send('hola mundo desde una ruta');
});

var messages =[{
    id:1,
    text:'Bienvenido al chay privado de la red, builded with Socket.io y NodeJS by Esteban Indiveri',
    nickname:'Bot-Esteban'
}];

io.on('connection',function(socket){
    console.log('El cliente con IP: '+socket.handshake.address+' se ha conectado...');

    socket.emit('messages',messages);

    socket.on('add-message',function(data){
        messages.push(data);

        io.sockets.emit('messages',messages);
        console.log(messages)
    });


});


server.listen(8080, function(){
    console.log('Servido está funcionando en http://localhost:8080');
});