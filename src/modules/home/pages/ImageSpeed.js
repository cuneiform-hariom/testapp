import React, { useState, useEffect } from 'react';

const ImageSpeed = () => {
    const [kbps, setKbps] = useState('');
    const [mbps, setMbps] = useState('');

    const calculateSpeed = async () => {
        const startTime = new Date().getTime();
        const imageLink = 'https://source.unsplash.com/random?topics=nature';
        const response = await fetch(imageLink);
        const imageSize = parseInt(response.headers.get('content-length'), 10);
        const endTime = new Date().getTime();
        const timeDuration = (endTime - startTime) / 1000;
        const loadedBits = imageSize * 8;
        const speedInBps = (loadedBits / timeDuration).toFixed(2);
        const speedInKbps = (speedInBps / 1024).toFixed(2);
        const speedInMbps = (speedInKbps / 1024).toFixed(2);
        setKbps(speedInKbps);
        setMbps(speedInMbps);
    };

    useEffect(() => {
        calculateSpeed();
    }, []);

    return (
        <div>
            <p>
                <span style={{ fontWeight: 'bold' }}>{kbps} </span>kbps
            </p>
            <p>
                <span style={{ fontWeight: 'bold' }}>{mbps} </span>mbps
            </p>
        </div>
    );
};

export default ImageSpeed;