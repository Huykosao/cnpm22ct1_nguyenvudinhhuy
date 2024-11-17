import React  from 'react'; 
// import { useNavigate} from 'react-router-dom'; // Thêm Link từ react-router-dom
import { useState,useEffect } from 'react';
import Header from './Header';
import Main from './main' ;
import Footer from './Footer';
import MainAdmin from './MainAdmin';
import axios from 'axios';


const Home = (props) => {
  const [site,SetSite] = useState(<Main />)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.username === 'admin') {
      SetSite(<MainAdmin />);
    } else {
      SetSite(<Main />);
    }
  }, []);
  

  return (
    <div>
      <Header />
        {site}
      <Footer />
    </div>
  );
};

export default Home;