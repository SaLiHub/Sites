// Import Swiper React components.
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// Import Swiper styles.
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';

// Import custom styles.
import './Certificates.sass';

// Import Swiper core and required modules.
import SwiperCore, { Navigation, A11y  } from 'swiper';

// Install Swiper modules.
SwiperCore.use([Navigation, A11y]);

function Certificates() {
  return (
    <section className='certificates app__certificates'>
      <div className='container'>
        <h2 className='certificates__title'>Сертифікати</h2>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          navigation
          a11y
          className="mySwiper"  
        >
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>
          <SwiperSlide className='certificates__card'>Card</SwiperSlide>

        </Swiper>
      </div>
    </section>
  );
}

export default Certificates;
