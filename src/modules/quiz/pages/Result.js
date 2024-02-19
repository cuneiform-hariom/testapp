import React from 'react'
import { useParams } from 'react-router-dom';


const Result = ({ result }) => {
    const  params = useParams();
    console.log('params: ', params);
    console.log('result: ', result);
    return (
        <div>
            Exam Over
        </div>
    )
}

export default Result
