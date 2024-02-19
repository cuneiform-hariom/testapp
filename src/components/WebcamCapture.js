import React, { useCallback, useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
    const [imageArr, setImageArr] = useState([]);
    console.log('imageArr: ', imageArr);
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageArr(prevArr => [...prevArr, imageSrc]);
    }, [webcamRef]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            capture();
        }, 100000); 

        return () => clearInterval(intervalId);
    }, [capture]);

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/webp"
                videoConstraints={{ facingMode: 'user' }}
                imageSmoothing={true}
            />
        </>
    );
};

export default WebcamCapture;
