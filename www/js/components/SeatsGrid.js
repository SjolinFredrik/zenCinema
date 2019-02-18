class SeatsGrid extends Component {
  constructor(schema, takenSeats, bookingSum) {
    super();
    this.schema = schema;
    this.takenSeats = takenSeats;
    this.hoveredSeats = [];
    this.bookingSum = bookingSum;
    this.grid = this.createGrid();
  }

  createGrid() {
    let hall = [];
    for (let i = 0; i < this.schema.length; i++) {
      let row = new Row();
      for (let j = this.schema[i]; j >= 1; j--) {
        let seat = new Seat(i + 1 + '-' + j, this);
        for (let t = 0; t < this.takenSeats.length; t++) {
          let taken = this.takenSeats[t];
          if (taken === seat.name) {
            seat.taken = true;
          }
        }
        row.seats.push(seat);
      }
      hall.push(row);
    }
    return hall;
  }

  hoverSeats(seat, numOfTickets) {
    let hoveredSeat = seat[0].name;
    let rowNr = parseInt(hoveredSeat.split('-')[0]);
    let seatNr = parseInt(hoveredSeat.split('-')[1]);

    if (numOfTickets > seatNr) {
      for (let i = seatNr; i >= 1; i--) {
        this.baseEl.find(`#${rowNr}-${i}`).addClass('invalid-seats');
        this.hoveredSeats = [];
      }
    }
    else {
      for (let i = seatNr; i > seatNr - numOfTickets; i--) {
        let classes = this.baseEl.find(`#${rowNr}-${i}`).attr('class');
        let alreadyTaken = classes.includes('taken');
        if (alreadyTaken) {
          this.baseEl.find(`#${rowNr}-${i}`).addClass('invalid-seats');
        }
        if (!alreadyTaken) {
          this.baseEl.find(`#${rowNr}-${i}`).addClass('hovered-seats');
          this.hoveredSeats.push(rowNr + '-' + i);
        }
        else if (this.hoveredSeats.length <= numOfTickets) {
          this.hoveredSeats.length = 0;
          return;
        }
      }
    }
  }

  unhoverSeats(seat, numOfTickets) {
    let hoveredSeat = seat[0].name;
    let rowNr = parseInt(hoveredSeat.split('-')[0]);
    let seatNr = parseInt(hoveredSeat.split('-')[1]);
    this.baseEl.find('.seat').removeClass('invalid-seats');
    for (let i = seatNr; i > seatNr - numOfTickets; i--) {
      this.baseEl.find(`#${rowNr}-${i}`).removeClass('hovered-seats');
      this.hoveredSeats = [];
    }
  }

  unhover() {
    if (this.hoveredSeats.length === 0) {
      this.baseEl.find('.seat').removeClass('invalid-seats');
      return;
    }
    else {
      this.baseEl.find('.seat').removeClass('chosen-seats');
      this.chosenSeats = this.hoveredSeats;
      for (let seat of this.chosenSeats) {
        this.baseEl.find(`#${seat}`).removeClass('hovered-seats');
      }
      this.chosenSeats.length = 0;
      Store.chosenSeats.length = 0;
    }
    this.render();
  }

  chooseSeats() {
    if (this.hoveredSeats.length === 0) {
      return;
    }
    else {
      this.baseEl.find('.seat').removeClass('chosen-seats');
      for (let seat of this.grid) {
        seat.chosen = false;
      }
      this.chosenSeats = [];
      this.chosenSeats = this.hoveredSeats;
      Store.chosenSeats = this.chosenSeats;
      for (let seat of this.chosenSeats) {
        
        this.baseEl.find(`#${seat}`).addClass('chosen-seats').removeClass('hovered-seats');
      }
      this.bookingSum.render();
    }
  }

}