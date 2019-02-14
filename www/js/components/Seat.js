class Seat extends Component {
  constructor(name, seatsGrid) {
    super();
    this.addEvents({
      'mouseenter .ghost-div': 'hoverMe',
      'mouseleave .ghost-div': 'unhoverMe'
    });
    this.name = name;
    this.seatsGrid = seatsGrid;
    this.taken = false;
  }

  hoverMe() {
    this.seatsGrid.chooseSeats($(this));
  }

  unhoverMe() {
    this.baseEl.removeClass('hovered-seat');
  }

}