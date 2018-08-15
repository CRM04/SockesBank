const fs = require('fs')

class Ticket{

    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl{

    constructor(){
        
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        
        this.tickets = [];
        this.ultimos4 = [];

        //Leemos el archivo 
        let data = require('../data/data.json')

        if( data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciar();   
        }
    }

    getUltimo(){
        return `Tikcet: ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        if( this.tickets.length == 0){
            return 'No hay tickets pendientes..';
        }else{
            let numeroTicket = this.tickets[0].numero;

            //Elimina el primer elemento de un arreglo.
            this.tickets.shift();

            let ticketEnTurno = new Ticket(numeroTicket, escritorio )

            //Agrega un elemnto al inciio 
            this.ultimos4.unshift(ticketEnTurno)

            if( this.ultimos4.length > 4){
                //Elimina el ultimo elemento del arreglo
                this.ultimos4.splice(-1, 1)
            }

            console.log("ultimos 4");
            console.log(this.ultimos4)

            this.grabarArchivo()

            return ticketEnTurno;
        }
    }

    siguiente(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo , null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Tikcet: ${this.ultimo}`;
    }

    reiniciar(){
        this.ultimo = 0;
        this.grabarArchivo();
        this.tickets = [];
        this.ultimos4 = [];
        console.log("Tickets reiniciados");
        
    }
    
    grabarArchivo(){
        let jsonData = {
            ultimo :this.ultimo,
            hoy:this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    
        let jsonString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json' , jsonString)
        console.log("Guardando...");
    }

}

module.exports = {
    TicketControl
}