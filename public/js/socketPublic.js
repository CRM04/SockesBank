//Establecemos la conexion con el servidor.
let socket = io();

socket.on('connect', function(){
    $("#estatusConexion").text("CONECTADO").css('color', 'green');
})

socket.on('disconnect', function(){
    $("#estatusConexion").text("DESCONECTADO").css('color', 'red');
});

socket.on('estadoActual', function(data){
    console.log(data);
    actualizaInterfaz(data.ultimos4);
});

socket.on('ultimos4' , function(data){
    actualizaInterfaz(data.ultimos4);
})

function actualizaInterfaz(ultimos4){
    for (let index = 0; index < ultimos4.length; index++) {
        $(`#lblTicket${index + 1}`).text(`Ticket: ${ultimos4[index].numero}`);
        $(`#lblEscritorio${index + 1}`).text(`Escritorio: ${ultimos4[index].escritorio}`);
    }
}