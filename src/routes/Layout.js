import React from 'react'
import { Outlet } from 'react-router-dom'
import WebcamCapture from '../components/WebcamCapture'

const Layout = () => {

  return (
    <div className='layout'>
      <div className="webCam">
        <WebcamCapture />
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
