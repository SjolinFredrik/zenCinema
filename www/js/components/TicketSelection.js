class TicketSelection extends Component {
  constructor() {
    super();
    this.tickets = [];
    this.maxTickets = 8;
    this.numOfTickets = 0;
    this.setTickets().then(data => {
      for (let i = 0; i < data.length; i++) {
        let ticketData = data[i];
        let ticket = new TicketPrice(ticketData, this);
        this.tickets.push(ticket);
        this.render();
      }
    });
  }

  async setTickets() {
    let tickets = await TicketPrice.find();
    return tickets;
  }

}