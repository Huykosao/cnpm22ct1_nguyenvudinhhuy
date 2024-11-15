import React  from 'react'; 
// import { useNavigate} from 'react-router-dom'; // Thêm Link từ react-router-dom
import Header from './Header';
import Main from './main' ;
import Footer from './Footer';
import MainAdmin from './MainAdmin';

const Home = (props) => {
  
  return (
    <div>
      <Header />
      <MainAdmin />
      <Footer />
    </div>
  );
};

export default Home;