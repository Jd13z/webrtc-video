import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlayCircleFilledSharpIcon from '@material-ui/icons/PlayCircleFilledSharp';
import imageVideo from '../images/videorec.jpg';

const VideoRecordComp = () => {
    const classes = useStyles();
    const { id }= useParams();
    const history = useHistory();
    const listQuestions = JSON.parse(localStorage.getItem('dataQuestions'));

    let question = {};
    question = listQuestions.find(el => el.id == id);

    const handleLinkClick = (e)=>{
        let newId;
        if(e.currentTarget.innerHTML == 'Anterior'){
            newId = parseInt(id) -1;
        } else{
            newId = parseInt(id) +1;
        }

        let foundQuestion = listQuestions.find(item => item.id == newId);
        if(!foundQuestion) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        
        if (question && question.id) {
            //debugger;
            let video = document.getElementById('videoAnswer');

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
    }, [id]);

    return (
        <div className={classes.itemContainer}>
            <div className={classes.divNav}>
                <ArrowBackIcon className={classes.IconBack} />
                <Link className={classes.linkNav} to="/">Volver</Link>
            </div>
            <div className={classes.itemDivUp}>
                <video id="videoAnswer" poster={imageVideo} className={classes.videoRec} />
                <Link className={classes.videoLink} to={'/catch/' + question?.id}>
                    <PlayCircleFilledSharpIcon className={classes.imgPlay} />
                </Link>
            </div>
            <div className={classes.itemDivBottom}>{question?.id + ". " + question?.description}</div>
            <div className={classes.divNav}>
                <Link className={classes.linkNav} onClick={handleLinkClick} to={'/' + (parseInt(question?.id) - 1)}>Anterior</Link>
                <Link className={classes.linkNextNav} onClick={handleLinkClick} to={'/' + (parseInt(question?.id) + 1)}>Siguiente</Link>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    videoRec: {
        width:"100%"
    },
    divNav: {
        display: "inline-block",
        width: "98%",
        margin: "10px 10px",
        width:"50%"
    },
    linkNav: {
        textDecoration: "none",
        float: "Left"
    },
    linkNextNav: {
        textDecoration: "none",
        float: "Right"
    },
    IconBack: {
        float: "Left"
    },
    itemContainer: {
        display: "flex",
        flexFlow: "column nowrap",
        margin: "20px",
        alignItems: "center"
    },
    itemDivUp: {
        position: "relative",
        backgroundColor: "black",
        minHeight: "350px",
        width:"50%"
    },
    itemDivBottom: {
        position: "relative",
        backgroundColor: "#C4C4C4",
        minHeight: "50px",
        width:"50%"
    },
    imgPlay:{
        color: "white",
        minWidth: "50px",
        minHeight: "50px",
        position: "absolute",
        top: "85%",
        left: "5px"
    },
}), { name: "VideoRecordComp" });

export default VideoRecordComp;