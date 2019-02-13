class TicketSelection extends Component {
  constructor() {
    super();
    this.tickets = [];
    this.maxTickets = 8;
    this.numOfTickets = 0;
    this.setTickets().then(tickets => {
      this.tickets = tickets;
    });
  }

  async setTickets() {
    let tickets = await TicketPrice.find();
    return tickets;
  }

}