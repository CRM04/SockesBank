const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketC  = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado')
    
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //los argumetnos de la funcion, son los que se envian en el JS del cliente
    client.on('nuevoTicket' , (data, callback)=>{
        let sig = ticketC.siguiente();
        callback(sig);
    })

    client.emit('estadoActual' , {
        data: ticketC.getUltimo(),
        ultimos4: ticketC.getUltimos4()
    });

    client.on('atenderTicket', (data, callback)=>{
        if(!data.escritorio){
            return callback(
                {
                    err:true,
                    msg:"El escritorio es necesario"
                }
            );
        }

        let ticketEnTurno = ticketC.atenderTicket(data.escritorio);
        callback(ticketEnTurno);

        //Actualizar la cola de los ultimos 4 tickets
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketC.getUltimos4()
        })
    })

});