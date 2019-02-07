class CustomerBookingsPage extends Component {

  constructor() {
    super();
    this.addRoute('/mina-bokningar', 'Mina bokningar');
    this.bookings = [];
    this.customerBookings = [];
  }

  mount() {
    this.bookings = [];
    this.customerBookings = [];
    this.findBookings();
    //this.render();
  }

  async findBookings() {
    let user = await Login.find();
    if (!user.loggedIn) {
      //this.loggedIn = false;
    }
    else {
      //this.loggedIn = true;
      let userId = user.user._id;

      let customer = await User.find(`.findOne({_id: '${userId}'}).populate('bookings').exec()`);
      let customerBookings = customer.bookings;

      for (let booking of customerBookings) {
        let showId = booking.show;
        let showing = await Showing.find(`.findOne({_id: '${showId}'}).populate('film').exec()`);

        this.bookings.push({film: showing.film.title, date: showing.date, time: showing.time, bookingNr: booking.bookingNumber});
        //console.log(showing);

        function compare(a, b) {
          const dateA = a.date;
          const dateB = b.date;
        
          let comparison = 0;
          if (dateA > dateB) {
            comparison = 1;
          } else if (dateA < dateB) {
            comparison = -1;
          }
          return comparison;
        }
        
        this.bookings.sort(compare);
      }
      this.appendBookings();
    }
    
  }

  appendBookings() {
    Date.prototype.customFormat = function(formatString){
      var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
      YY = ((YYYY=this.getFullYear())+"").slice(-2);
      MM = (M=this.getMonth()+1)<10?('0'+M):M;
      MMM = (MMMM=["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"][M-1]).substring(0,3);
      DD = (D=this.getDate())<10?('0'+D):D;
      DDD = (DDDD=["Söndag","Mondag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"][this.getDay()]).substring(0,3);
      th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
      formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
      h=(hhh=this.getHours());
      if (h==0) h=24;
      if (h>12) h-=12;
      hh = h<10?('0'+h):h;
      hhhh = hhh<10?('0'+hhh):hhh;
      AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
      mm=(m=this.getMinutes())<10?('0'+m):m;
      ss=(s=this.getSeconds())<10?('0'+s):s;
      return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
    };

    let currentDate = 0;
    for(let booking of this.bookings) {
      let bookingDate = new Date(booking.date);
      let convertedDate = bookingDate.customFormat('#DDDD# #DD# #MMMM# #YYYY#');
      this.customerBookings.push(new CustomerBooking(booking.film, convertedDate, booking.time, booking.bookingNr));

      /* if (booking.date === currentDate) {
        this.baseEl.find(`#${booking.date}`).append(`
          <p>${booking.film} ${booking.time} - Bokningsnummer: ${booking.bookingNr}</p>
        `);
      }
      else {
        this.baseEl.find('.bookings').append(`
          <h2>${convertedDate}</h2>
          <div id="${booking.date}">
            <p>${booking.film} ${booking.time} - Bokningsnummer: ${booking.bookingNr}</p>
          </div>
        `);
        currentDate = booking.date; 
      }*/
    }
    this.render();
  }


}