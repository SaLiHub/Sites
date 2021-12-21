// Import Swiper React components.
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// Import Swiper styles.
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';

// Import custom styles.
import './Certificates.sass';

// Import Swiper core and required modules.
import SwiperCore, { Navigation } from 'swiper';

// Install Swiper modules.
SwiperCore.use([Navigation]);

function Certificates() {
  return (
    <section className='certificates'>
      <div className='container'>
        <h2 className='certificates__title'>Сертифікати</h2>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          navigation={true}
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
