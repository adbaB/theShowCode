import React from 'react'
import { Card } from '../Card'
import './index.css'
export const Recommendations = ({recommendations,setOpenModal,setMovieId}) => {
  return (
    <div className='recommendations-container'>
        {recommendations.map((recommendation)=>(
            <Card
         key={recommendation.id}
         id={recommendation.id}
         title={recommendation.title}
         image={recommendation.poster_path}
         setOpenModal={setOpenModal}
         setMovieId={setMovieId}
        />
        ))}
        
    </div>
  )
}
