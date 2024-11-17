import React  from 'react'; 
// import { useNavigate} from 'react-router-dom'; // Thêm Link từ react-router-dom
import { useState } from 'react';
import Header from './Header';
import Main from './main' ;
import Footer from './Footer';
import MainAdmin from './MainAdmin';

const Home = (props) => {
  const [site,SetSite] = useState(<Main />)

  

  return (
    <div>
      <Header />
        {site}
      <Footer />
    </div>
  );
};

export default Home;