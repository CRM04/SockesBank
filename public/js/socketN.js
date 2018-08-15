//Establecemos la conexion con el servidor.
let socket = io();

socket.on('connect', function(){
    console.log("Conectado al servidor")
})

socket.on('disconnect', function(){
    console.log("Desconectado del servidor")
})

$("button").click(function (e) { 
    
    socket.emit('nuevoTicket',null, function(ticketSig){
        document.getElementById('lblNuevoTicket').innerText = ticketSig;
    })
    
});

socket.on('estadoActual' , (data) => {
    document.getElementById('lblNuevoTicket').innerText = data.data;
})