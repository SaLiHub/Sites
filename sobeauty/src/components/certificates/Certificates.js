import { useState, useEffect } from 'react';

// Import Swiper React components.
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// Import custom styles.
import './Certificates.scss';

// Import Swiper core and required modules.
import SwiperCore, { Navigation, A11y } from 'swiper';

// Install Swiper modules.
SwiperCore.use([Navigation, A11y]);

function Certificates() {
  const [numberOfCards, setNumberOfCards] = useState(6);
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      if (e.target.innerWidth < 1400 && e.target.innerWidth >= 1000) {
        setNumberOfCards(5);
      } else if (e.target.innerWidth < 1000 && e.target.innerWidth >= 700) {
        setNumberOfCards(4);
      } else if (e.target.innerWidth < 700 && e.target.innerWidth >= 500) {
        setNumberOfCards(3);
      } else if (e.target.innerWidth < 500) {
        setNumberOfCards(2);
      }
    });
  }, []);
  return (
    <section className="certificates app__certificates">
      <div className="container">
        <h2 className="certificates__title">Сертифікати</h2>
        <Swiper
          navigation
          a11y
          slidesPerView={numberOfCards}
          spaceBetween={30}
          loop={true}
          className="mySwiper"
        >
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
          <SwiperSlide className="certificates__card">Card</SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Certificates;
