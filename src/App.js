import React from 'react'
import {action,originals,ComedyMovies,HorrorMovies,RomanceMovies,Documentaries} from './urls'
import "./App.css";
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';



function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost  url={originals} title='Netflix originals'/>
      <RowPost  url={action} title='Actions' isSmall/>
      <RowPost  url={HorrorMovies} title='Horror' isSmall/>

      <RowPost  url={ComedyMovies} title='Comedy' isSmall/>
      <RowPost  url={RomanceMovies} title='Romance' isSmall/>
      <RowPost  url={Documentaries} title='Documentaries' isSmall/>

    </div>
  );
}

export default App;


//vbwifghwouvbjodwr