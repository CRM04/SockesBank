
let socket = io();

//Este codigo probablemente no es compatible con Edge e IE
let searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es un error');
}

let escritorio = searchParams.get('escritorio');

$("h1").text("Escritorio "+escritorio)


$("button").click(function (e) {

    socket.emit( 'atenderTicket' , {escritorio} , (resp) =>{
        console.log(resp);
        if(resp === 'No hay tickets pendientes..'){
            alert("No hay tickets pendientes..");
            $("small").text("No hay tickets pendientes..");
        }else{

            $("small").text("Ticket: " + resp.numero );
        }
    });
    
});