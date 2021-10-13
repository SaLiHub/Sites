/* eslint-disable import/no-unresolved */
import ReactDOM from 'react-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import '../styles/blocks/slider.css';

// Import Swiper core and required modules.
import SwiperCore, {
  Pagination,
  Navigation,
  Keyboard,
  A11y,
  // eslint-disable-next-line import/no-unresolved
} from 'swiper';

// Install Swiper modules.
SwiperCore.use([Pagination, Navigation, Keyboard, A11y]);

export default function Slider() {
  const arrayOfSlides = [];
  for (let i = 0; i < 3; i++) {
    arrayOfSlides.push(
      // Take index as key, because array won't change.
      <SwiperSlide key={i}>
        <div className="swiper-slide__wrapper" />
        <div className="swiper-slide__content">
          <h3 className="slide-content__title">
            And then God said
            <br />
            let there be a
            <span className="slide-content__title-greece">Greece</span>
          </h3>
          <p className="slide-content__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            sequi consequuntur nemo tempore voluptate beatae consectetur hic rem
            repellendus impedit. Aliquid odit eos ev eniet unde fugiat ratione
            nesciunt consectetur rerum.
          </p>
          <p className="slide-content__info">
            <span className="slide-content__info-name">Joun Doe</span>
            ,
            <span className="slide-content__info-site">Mytravels.com</span>
          </p>
        </div>
      </SwiperSlide>,
    );
  }

  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      navigation
      className="mySwiper"
      keyboard
    >
      {arrayOfSlides}
    </Swiper>
  );
}

ReactDOM.render(<Slider />, document.getElementById('slider'));