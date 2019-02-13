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
    this.ticketQuantity = 0;
  }

  removeTicket() {
    if (this.ticketQuantity > 0) {
      this.ticketSelection.numOfTickets--;
      this.ticketQuantity--;
      console.log(this.ticketSelection.numOfTickets);
      this.render();
    }
  }

  addTicket() {
    if (this.ticketSelection.numOfTickets < this.ticketSelection.maxTickets) {
      this.ticketSelection.numOfTickets++;
      this.ticketQuantity++;
      console.log(this.ticketSelection.numOfTickets);
      this.render();
    }
  }

}