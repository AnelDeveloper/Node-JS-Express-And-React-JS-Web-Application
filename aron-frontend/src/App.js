import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Welcome/HomePage';
import Header from './Components/Header/header';
import SingleCategory from './Components/Categories/SingleCategory';
import AdminDashBoard from './Pages/AdminDashBoard/AdminDashBoard';
import AdminLogin from './Pages/AdminLogin/AdminLogin'
import AllReports from './Components/Reports/AllReports';
import Footer from './Components/Footer/Footer';
import Report from './Components/Reports/AllReports';



function App() {


  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:Id" element={<SingleCategory />} />

        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Dashboard" element={<AdminDashBoard />} />
        <Route path="/AllReports" element={<AllReports />} />
        <Route path="/report" element={<Report />} />


        <Route path="*" element={<p>There's nothing here: 404!</p>} />



      </Routes>
      <Footer />

    </div>
  );
}

export default App;
// Authentikacije

// Login Admin

// Validacije

// Design

//Display Report
