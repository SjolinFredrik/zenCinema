class Trailer extends Component {
  constructor(data) {
    super();
    this.ytLink = data;
    this.addEvents({
      'click .trailer-close': 'trailerClose'
    });
  }

  trailerClose() {
    //Stop Video
    $('#trailerModal').on('hidden.bs.modal', function (e) {
      // do something...
      $('#trailerModal iframe').attr("src", $('#trailerModal iframe').attr("src"));

    });
  }
}
 
