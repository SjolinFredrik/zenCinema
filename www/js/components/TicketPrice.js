class TicketPrice extends Component {

  constructor(data, ticketSelection) {
    super();
    this.addEvents({
      'click .ticket-minus': 'removeTicket',
      'click .ticket-plus': 'addTicket'
    });
    this.ticketSelection = ticketSelection;
    this.name = data.name;
    this.price = data.price;
    if (this.name === 'Ordinarie') {
      this.ticketQuantity = 2;
    }
    else {
      this.ticketQuantity = 0;
    }
  }

  removeTicket() {
    if (this.ticketQuantity > 0) {
      this.ticketSelection.numOfTickets--;
      Store.numOfTickets--;
      this.ticketQuantity--;
      Store.reservedTickets = this.ticketSelection.totalCost(this.ticketSelection.tickets);
      this.ticketSelection.grid.unhover();
      this.ticketSelection.grid.render();
      this.ticketSelection.bookingSummary.render();
      this.render();
    }
  }

  addTicket() {
    if (this.ticketSelection.numOfTickets < this.ticketSelection.maxTickets) {
      this.ticketSelection.numOfTickets++;
      Store.numOfTickets++;
      this.ticketQuantity++;
      Store.reservedTickets = this.ticketSelection.totalCost(this.ticketSelection.tickets);
      this.ticketSelection.grid.unhover();
      this.ticketSelection.grid.render();
      this.ticketSelection.bookingSummary.render();
      this.render();
    }
  }

  

}