import React from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

export default class FilmCarousel extends React.Component {

  constructor(props) {
    super(props);
    this.filmsData = [];
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.filmsData.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.filmsData.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  async loadFilmData() {
    return await fetch('/json/films').then(response => {return response.json()}).then(data => {
      let result = data;
      return result;
    });
  }

  componentDidMount() {
    this.loadFilmData().then(data => {
      this.filmsData = data;
      this.setState({filmsCatched: true});
    });
  }

  render() {

      const { activeIndex } = this.state;
    
      const slides = this.filmsData.map((film) => {
        return(
          <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={film.images[1]}
          >
            <Link className="a-over" to={"/filmer/" + film.link} title={film.title}> </Link>
            <img className="d-block w-100" src={"/images/movies/" + film.images[1]} alt={film.title} />
            <CarouselCaption captionText="" captionHeader={film.title} className="d-block" />
          </CarouselItem>  
        );
      });

    return (
      this.state.filmsCatched ?
      <section className="film-carousel">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={this.filmsData} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </section> : 'waiting'
    );
  }
}