class SeatsGrid extends Component {
  constructor(schema) {
    super();
    this.schema = schema;
  }

  createGrid() {
    let hall = [];
    for (let i = 0; i < this.schema.length; i++) {
      let row = [];
      for (let j = 0; j <this.schema[i]; j++) {
        let seat = {};
        row.push(seat);
      }
      hall.push(row);
    }
    return hall;
  }
}