import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { generatePath, Link, useHistory, useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StopIcon from '@material-ui/icons/Stop';
import questions from '../data/index.js'


const VideoCatch = () => {
    const classes = useStyles();
    const listQuestions = JSON.parse(localStorage.getItem('dataQuestions'));
    const { id } = useParams();
    const history = useHistory();

    let errorMsgElement;
    let mediaRecorder;
    let recordedBlobs;

    let question = {};
    question = listQuestions.find(el => el.id == id);

    useEffect(() => {
        errorMsgElement = document.querySelector('span#errorMsg');

        (async () => {
            await initCamera();
            startRecording();
        })();
    });
    

    //#region webRTC
    const finalizarVideo = async () => {
        if (mediaRecorder && mediaRecorder.state != "inactive") mediaRecorder.stop();
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    const init = async (constraints) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            handleSuccess(stream);
        } catch (e) {
            console.log('navigator.getUserMedia error', e);
            errorMsgElement.innerHTML = `navigator.getUserMedia error: ${e.toString()}`;
        }
    }

    const initCamera = async () => {
        let hasEchoCancellation = true;
        const constraints = {
            audio: {
                echoCancellation: { exact: hasEchoCancellation }
            }
            ,
            video: {
                width: 720, height: 480
            }
        };
        console.log('Using media constraints:', constraints);
        await init(constraints);
    }

    const handleSuccess = (stream) => {
        console.log('getUserMedia() got stream', stream);
        window.stream = stream;

        const video = document.getElementById('videoQuestion');
        video.srcObject = stream;
    }

    function handleDataAvailable(event) {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }

    function startRecording() {
        recordedBlobs = [];
        let options = { mimeType: 'video/webm;codecs=vp9,opus' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.error(`${options.mimeType} is not supported`);
            options = { mimeType: 'video/webm;codecs=vp8,opus' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.error(`${options.mimeType} is not supported`);
                options = { mimeType: 'video/webm' };
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    console.error(`${options.mimeType} is not supported`);
                    options = { mimeType: '' };
                }
            }
        }

        try {
            mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
            errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
            return;
        }

        console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
        mediaRecorder.onstop = (event) => {
            console.log('Recorder stopped: ', event);
            console.log('Recorded Blobs: ', recordedBlobs);
            updateVideoAnswer(recordedBlobs);
        };
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
        console.log('MediaRecorder started', mediaRecorder);
    }

    const stopRecording = () => {
        if (mediaRecorder.state != "inactive") mediaRecorder.stop();
    }

    const regresar = () => {
        history.push(generatePath('/:id', { id }));
    }

    const updateVideoAnswer = (recordedBlobs) => {
        for (const item of listQuestions) {
            if (item.id == id) {
                const superBuffer = new Blob(recordedBlobs, { type: 'video/webm' });
                item.videoURL = window.URL.createObjectURL(superBuffer);
                localStorage.setItem('video', item.videoURL);
                break;
            }
        }
        localStorage.setItem('dataQuestions', JSON.stringify(listQuestions));
        regresar();
    }

    //#endregion

    return (
        <div className={classes.itemContainer}>
            <div className={classes.divNav}>
                <ArrowBackIcon className={classes.IconBack} />
                <Link className={classes.linkNav} to="/">Volver</Link>
            </div>
            <div className={classes.itemDivUp}>
                <video id="videoQuestion" className={classes.video} playsInline autoPlay muted></video>
                <Link className={classes.videoLink}>
                    <StopIcon onClick={finalizarVideo} className={classes.imgPlay} />
                </Link>
            </div>
            <div className={classes.itemDivBottom}>{question?.id + '. ' + question?.description}</div>
            <div>
                <span id="errorMsg" />
                <button onClick={finalizarVideo}>finalizar</button>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    divNav: {
        display: "inline-block",
        width: "98%",
        margin: "10px 10px",
        width: "50%"
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
        width: "50%"
    },
    itemDivBottom: {
        position: "relative",
        backgroundColor: "#C4C4C4",
        minHeight: "50px",
        width: "50%"
    },
    imgPlay: {
        color: "white",
        minWidth: "50px",
        minHeight: "50px",
        position: "absolute",
        top: "85%",
        left: "5px"
    },
    video: {
        width: "100%",
        minHeight: "100px"
    }
}), { name: "VideoCatch" });

export default VideoCatch;