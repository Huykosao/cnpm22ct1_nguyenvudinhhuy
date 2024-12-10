import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext'; 
import Header from './Header';
import Main from './main';
import Footer from './Footer';
import MainAdmin from './MainAdmin';

const Home = () => {
  const { user } = useUser(); 
  const [site, setSite] = useState(<Main />); 
  const [footerComponent, setFooterComponent] = useState(<Footer />); 

  useEffect(() => {
    if (user && user.username === 'admin') {
      setSite(<MainAdmin />); 
      setFooterComponent(null); 
    } else {
      setSite(<Main />); 
      setFooterComponent(<Footer />); 
    }
  }, [user]);

  return (
    <div>
      <Header />
      {site}
      {footerComponent}
    </div>
  );
};

export default Home;
