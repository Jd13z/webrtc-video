import React, { useContext } from 'react'
import videoContext from '../context/videoContext';

const ListVideoComp = ()=>{
    //const {state: {listQuestions}} = useContext(videoContext);
    const listQuestions = []

    return (
        listQuestions.map((question, index)=>
        <h1 key={`video-`+index}>{question.answerUrl + "aaa"}</h1>
        )
    )
}

export default ListVideoComp