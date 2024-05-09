"use client"

import { load as cocoSSDLoad } from '@tensorflow-models/coco-ssd';
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs'
import { renderPredictions } from '@/utils/render-predictions';

function ObjectDetection() {

    let detectInterval;

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);

    const runCoco = async()=>{
        const net = await cocoSSDLoad();
        setIsLoading(false);

        detectInterval = setInterval(() => {
            runObjectDetection(net);
        }, 10);
    }

    async function runObjectDetection(net){
        if(
            canvasRef.current &&
            webcamRef.current != null &&
            webcamRef.current.video?.readyState === 4
        ){
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            const detectedObjects = await net.detect(webcamRef.current.video, undefined, 0.6);

            // console.log(detectedObjects);

            const context = canvasRef.current.getContext("2d");
            renderPredictions(detectedObjects, context);

        }
    }

    const showMyVideo = () => {
        if(webcamRef.current !=null && webcamRef.current.video?.readyState === 4){
            const myVideoWidth = webcamRef.current.video.videoWidth;
            const myVideoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = myVideoWidth;
            webcamRef.current.video.height = myVideoHeight;
        }
    }

    useEffect(()=>{
        showMyVideo();
        runCoco();
    }, [])

  return (
    <div className='mt-8'>
        {   isLoading ? (
            <div className='gradient-text'>Loading...</div>
        ):
            (<div className="gradient relative flex justify-center items-center gradient p-1.5 rounded-md">
            <Webcam
                className='lg:h-[720px] rounded-md w-full'
                muted
                ref={webcamRef}
            />
            <canvas
                ref={canvasRef}
                className='absolute top-0 left-0 z-9999 w-full lg:h-[720px]'
            />
            </div>)
        }
    </div>
  )
}

export default ObjectDetection