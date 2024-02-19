import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ setTitle }) => {
    const navigate = useNavigate()
    // eslint-disable-next-line 
    const [kbps, setKbps] = useState('');
    const [mbps, setMbps] = useState('');
    const [charging, setCharging] = useState()
    const [actlDate, setActlDate] = useState()
    const deviceDate = new Date().toISOString().slice(0, 10)
    const [startBtn, setStartBtn] = useState(false)

    const [mobileDevice, setMobileDevice] = useState(false)

    useEffect(() => {
        setTitle("Home")
    },)


    const startexam = () => {
        navigate("/quiz")
    }

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

    useEffect(() => {
        const handleBatteryStatusChange = (event) => {
            console.log('event: ', event);
            setCharging(event.target.charging);
        };

        navigator.getBattery().then((battery) => {
            battery.addEventListener('chargingchange', handleBatteryStatusChange);
            setCharging(battery.level);

            return () => {
                battery.removeEventListener('chargingchange', handleBatteryStatusChange);
            };
        });
    }, []);

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const ogDate = async () => {
        await axios
            .get(`https://worldtimeapi.org/api/timezone/${tz}`)
            .then(res => setActlDate(res?.data?.datetime.slice(0, 10)));
    }

    useEffect(() => {
        ogDate()
    }, [])

    useEffect(() => {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {  // true for mobile device 
            setMobileDevice(true)
        } else {
            // false for not mobile device
            setMobileDevice(false)
        }

    }, [])

    useEffect(() => {
        if (actlDate && actlDate !== undefined) {
            if (actlDate === deviceDate) {
                setStartBtn(true)
            } else {
                alert("wrong Clock")
            }
        }
    }, [actlDate])

    return (
        <>
            <div className='homepage'>
                
                <h2 className='text-center p_title'>Prepare Yourself for the test.</h2>
                <ol className='deviceInfo'>
                    <li>1. Internet Speed:
                        {mbps ? <p style={{ color: mbps < 1 ? "Red" : "green" }}>Speed: {mbps} mbps</p> : "Loading..."}
                    </li>
                    <li>2. Battery Percentage:
                        <p style={{ color: charging < 0.6 ? "red" : "green" }}>{Math.round(charging * 100)}%</p>
                    </li>
                    <li>3. Device:
                        {
                            mobileDevice ?
                                <p style={{ color: "red" }}>Mobile</p> :
                                <p style={{ color: "green" }}>Laptop/Desktop</p>
                        }
                    </li>
                    <li>4. Date/Time
                        <p>{actlDate}</p>
                    </li>
                    <li>5. Starting the test will use Mike and cammera
                    </li>
                </ol>
                {
                    charging < 0.6 || mbps < 1 ?
                        <p style={{ color: "red" }}>Requirement not fullfilled</p> :
                        <p style={{ color: "green" }}>Ready to go.</p>
                }
                {
                    !startBtn || charging < 0.6 || mobileDevice || mbps < 1 ? null :
                        <button
                            onClick={startexam}
                            className='link-btn'
                        >
                            Start Exam
                        </button>
                }
            </div>
        </>
    )
}

export default Home
