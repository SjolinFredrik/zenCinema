class Seat extends Component {
  constructor(name, seatsGrid) {
    super();
    this.addEvents({
      'mouseenter .ghost-div': 'hoverMe',
      'mouseleave .ghost-div': 'unhoverMe',
      'click .ghost-div': 'clickMe'
    });
    this.name = name;
    this.seatsGrid = seatsGrid;
    this.taken = false;
  }

  hoverMe() {
    this.seatsGrid.hoverSeats($(this), Store.numOfTickets);
  }

  unhoverMe() {
    this.seatsGrid.unhoverSeats($(this), Store.numOfTickets);
  }

  clickMe() {
    this.seatsGrid.chooseSeats();
  }

}