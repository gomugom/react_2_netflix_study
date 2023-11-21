import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import requests from './api/request';
import Banner from './components/Banner';
import Footer from './components/Footer';
import { Nav } from './components/Nav';
import Row from './components/Row';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

const Layout = () => {
  return(
    <div>
      <Nav />
        {/* 사이에 들어갈 부분 */}
        <Outlet /> 
      <Footer />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
 
    </div>
  );
}

export default App;
