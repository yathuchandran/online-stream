import React from 'react'
// import {action,originals,ComedyMovies,HorrorMovies,RomanceMovies,Documentaries} from './urls'
import "./App.css";
// import NavBar from './Components/NavBar/NavBar';
// import Banner from './Components/Banner/Banner';
// import RowPost from './Components/RowPost/RowPost';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RoutePath from './Components/Router/Route';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/*' element={<RoutePath />} />
      </Routes>
    </BrowserRouter>

      {/* <NavBar/>
      <Banner/>
      <RowPost  url={originals} title='Netflix originals'/>
      <RowPost  url={action} title='Actions' isSmall/>
      <RowPost  url={HorrorMovies} title='Horror' isSmall/>

      <RowPost  url={ComedyMovies} title='Comedy' isSmall/>
      <RowPost  url={RomanceMovies} title='Romance' isSmall/>
      <RowPost  url={Documentaries} title='Documentaries' isSmall/> */}

    </div>
  );
}

export default App;


//vbwifghwouvbjodwr