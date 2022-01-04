import './App.sass';
import Header from './components/header/Header';
import Banner from './components/banner/Banner'
import Certificates from './components/certificates/Certificates'


function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <Certificates/>
    </div>
  );
  
}

export default App;
