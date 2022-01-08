import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

// Import Swiper styles.
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';

import './App.scss';
import Header from './components/header/Header';
import Banner from './components/banner/Banner';
import Certificates from './components/certificates/Certificates';
import Order from './components/order/Order';
import Location from './components/location/Location';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <Certificates />
      <Order />
      <Location />
      <Footer />
    </div>
  );
}

export default App;
