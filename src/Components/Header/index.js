import React, { useState } from "react";
import { InputFind } from "../InputFind";
import { BiChevronRight,BiChevronLeft } from "react-icons/bi";
import "./index.css";
export const Header = ({ movies, setOpenModal, setMovieId,setMovies,imagesMovies }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handlerClick = () => {
    setOpenModal(true);
    setMovieId(imagesMovies[selectedIndex].id);
  };

  const previous = ()=>{
   let nextIndex =  selectedIndex > 0 ? selectedIndex -1 : imagesMovies.length -1
   setSelectedIndex(nextIndex)
  }
  const next = ()=>{
    let nextIndex =  selectedIndex < imagesMovies.length -1 ? selectedIndex +1 : 0
    setSelectedIndex(nextIndex)
   }
  return (
    <div className="container_header">
      <nav className="navbar">
        <h1>CINE UNIVERSAL</h1>
        <InputFind setMovies={setMovies}/>
      </nav>
      <header className="header">
        <img
          className="image_header"
          src={imagesMovies[selectedIndex].image}
          alt=""
        />
        <div className="opacity"></div>
        <button  className ='previous' onClick={previous}> <BiChevronLeft/></button>
        <button className='next' onClick={next}><BiChevronRight/></button>
        <div className="text">
          <h3>{imagesMovies[selectedIndex].title}</h3>
          <p>{imagesMovies[selectedIndex].overview}</p>
          <button className="btn_header" onClick={handlerClick}>
            Ver más
          </button>
        </div>
      </header>
    </div>
  );
};
