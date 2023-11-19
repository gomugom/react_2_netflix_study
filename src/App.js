import './App.css';
import requests from './api/request';
import Banner from './components/Banner';
import Footer from './components/Footer';
import { Nav } from './components/Nav';
import Row from './components/Row';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />

      <Row 
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />

      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />

      <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies} />

      <Footer />
    </div>
  );
}

export default App;
