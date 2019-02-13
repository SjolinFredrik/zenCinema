class TicketSelection extends Component {
  constructor() {
    super();
    this.tickets = [];
    this.setTickets().then(tickets => {
      this.tickets = tickets;
    });
  }

  async setTickets() {
    let tickets = await TicketPrice.find();
    return tickets;
  }
}