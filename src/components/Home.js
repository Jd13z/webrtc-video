import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import questions from '../data';
import QuestionCard from './questionCard';

const Home = () => {
    if(!localStorage.getItem('dataQuestions')) localStorage.setItem('dataQuestions',JSON.stringify(questions));
    
    const handleClickStorage = () =>{
        localStorage.clear();
        localStorage.setItem('dataQuestions',JSON.stringify(questions));
    }

    const classes = useStyles(); 

    return (
        <div>
            <div>
                <h5 onClick={handleClickStorage} className={classes.link}>Limpiar localStorage</h5>
            </div>
        <div className={classes.root}>
            {
                questions.map((item, index) =>
                    <QuestionCard key={`question` + index} description={item.description} id={item.id} />
                )
            }
        </div>

        </div>
    )
}

const useStyles = makeStyles((theme)=>({
    root: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-around",
      alignItems: "center",
      position: "relative"
    },
    link: {
        cursor: "pointer",
        display: "none"
    }
  
  }), {name: "Home"})

export default Home;