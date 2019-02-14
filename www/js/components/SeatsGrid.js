class SeatsGrid extends Component {
  constructor(schema, takenSeats) {
    super();
    this.schema = schema;
    this.takenSeats = takenSeats;
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

  chooseSeats(seat) {
    let hoveredSeat = seat[0].name;
    let x = this.baseEl.find(`#${hoveredSeat}`).addClass('hovered-seat');
  }

}