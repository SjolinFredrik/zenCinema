// async function testLogin(){
// }
   
//   async function testCheckLogin(){
//     console.log(await Login.find());
//   }
   
//   async function testLogout(){
//     let loginObj = new Login();
//     console.log(await loginObj.delete());
//   }

//   // testLogin();
//   // testCheckLogin();
//   // testLogout();
async function showingsPopulatedFilms() {
  let showings = await Showing.find();
  console.log(showings);
  // for (let i = 0; i < showings.length; i++) {
  //   let showing = showings[i];
  //   let showingObj = new Showing(showing);
  //   console.log(showingObj, 'I am showing');
  //   console.log(showingObj.film);
  // }
  let filmShowings = [];
  for (let i = 0; i < showings.length; i++) {
    let showing = showings[i];
    if (showing.film === '5c4af4448c106c1bac7b3df4') {
      let showingObj = new Showing(showing);
      filmShowings.push(showingObj);
    }
    else {
      continue;
    }
    console.log(filmShowings);
  }

}
$(document).ready(function(){
  let scroll = new SmoothScroll('a[href*="#"]', {
    offset: 25,
    updateURL: false
  });
});


  


//   showingsPopulatedFilms();