import React, { useEffect } from 'react'
import PlayCircleFilledSharpIcon from '@material-ui/icons/PlayCircleFilledSharp';
import imageVideo from '../../images/videorec.jpg';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'

const QuestionCard = ({ id, description }) => {
    const classes = useStyles();
    const listQuestions = JSON.parse(localStorage.getItem('dataQuestions'));

    useEffect(() => {
        //debugger;
        let question = {};
        question = listQuestions.find(el => el.id == id);
        
        if (question && question.id) {
            //debugger;
            let video = document.getElementById('videoAnswer_'+id);

            if (question.videoURL.length > 0) {
                video.src = null;
                video.srcObject = null;
                video.src = question.videoURL;
                video.controls = true;
                video.poster = null;
            } else {
                video.src = null;
                video.srcObject = null;
                video.controls = false;
                video.poster = imageVideo;
            }
        }
    }, []);

    return (
        <div className={classes.itemQuestionCard}>
            <div className={classes.itemContainer}>
                <div className={classes.itemDivUp}>
                    <video id={"videoAnswer_"+id} poster={imageVideo} className={classes.videoRec} />
                        <Link className={classes.videoLink} to={ '/' + id }>
                            <PlayCircleFilledSharpIcon className={classes.imgPlay} />
                        </Link>
                </div>
                <div className={classes.itemDivBottom}>{id + ". " + description}</div>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme)=>({
    itemQuestionCard:{
        backgroundColor: "skyblue",
        //minWidth: "245px",
        margin: "10px 20px",
        //width: "60%"
    },
    itemContainer:{
        display: "flex",
        flexFlow: "column nowrap",
        //width: "60%"
        minWidth: "350px"
    },
    itemDivUp:{
        position: "relative",
        backgroundColor: "black",
        minHeight: "350px",
        minWidth: "450px",
        //width: "60%"
    },
    itemDivBottom:{
        position: "relative",
        backgroundColor: "#C4C4C4",
        minHeight: "50px",
        //width: "60%"
    },
    imgPlay:{
        color: "white",
        minWidth: "50px",
        minHeight: "50px",
        position: "absolute",
        top: "85%",
        left: "5px"
    },
    videoLink:{

    },
    videoRec:{
        width: "450px"
        //minWidth:"70%",
    }
}), {name: "QuestionCard"})

export default QuestionCard;