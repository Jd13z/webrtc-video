import produce from "immer";
import { useReducer } from "react";

const initialState = {
    listQuestions: [
        {
            question: "who are you 1?",
            answerUrl: null,
        },
        {
            question: "who are you 2?",
            answerUrl: null,
        },
        {
            question: "who are you 3?",
            answerUrl: null,
        },
        {
            question: "who are you 4?",
            answerUrl: null,
        },
        {
            question: "who are you 5?",
            answerUrl: null,
        }
    ],
    videoRespuestaActual: 0
}

const stateReducer = (state, action) => {
    switch(action.type){
        default:
            return state;
    }
}

function useImmerReducer(reducer, initialState){
    return useReducer(produce(reducer), initialState);
  }
  
  const useState = () => {
    const [ state , dispatch ] = useImmerReducer(stateReducer, initialState);
    return [ state , dispatch ];
  }
  
  export default useState;