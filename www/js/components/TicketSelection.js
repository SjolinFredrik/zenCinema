class TicketSelection extends Component {
  constructor() {
    super();
    this.tickets = [];
    this.setTickets().then(data => {
      console.log(data, 'I am priceData');
      for (let i = 0; i < data.length; i++) {
        let ticketData = data[i];
        let ticket = new TicketPrice(ticketData);
        console.log(ticket);
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