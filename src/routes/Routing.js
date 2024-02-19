import React, { useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../modules/home/pages/Home';
import Quiz from '../modules/quiz/pages/Quiz';
import Layout from './Layout';
import Result from '../modules/quiz/pages/Result';
import QuizApp from '../modules/quiz/pages/QuizApp';

const Routing = () => {
    const [title, setTitle] = useState("")
    document.title = title

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout />}>
                <Route index element={<Home setTitle={setTitle} />} />
                <Route path='quiz/:id' element={<Quiz setTitle={setTitle} />} />
                <Route path='quiz' element={<QuizApp  setTitle={setTitle} />} />
                <Route path='result' element={<Result setTitle={setTitle} />} />
            </Route>
        )
    )




    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Routing
