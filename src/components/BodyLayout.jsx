import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

const BodyLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default BodyLayout
