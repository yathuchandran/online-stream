import React from 'react'
import {action,originals} from './urls'
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

    </div>
  );
}

export default App;
