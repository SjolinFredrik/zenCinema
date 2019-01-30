class SeatsGrid extends Component {
  constructor(schema) {
    super();
    this.schema = schema;
    this.grid = this.createGrid();
  }

  createGrid() {
    let hall = [];
    for (let i = 0; i < this.schema.length; i++) {
      let row = new Row();
      for (let j = this.schema[i]; j >= 1; j--) {
        let seat = new Seat(i + 1 + '-' + j);
        row.seats.push(seat);
      }
      hall.push(row);
    }
    return hall;
  }
}