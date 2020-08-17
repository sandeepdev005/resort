import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import Service from '../components/Service';
import FeaturedRooms from '../components/FeaturedRooms';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <>
        <Hero>
            <Banner title="luxurious room"
                    subtitle="delux rooms starting at $299"> 
                <Link to="/rooms" className="btn-primary" >Our Rooms</Link>
            </Banner>
        </Hero>

        <Service />    
        <FeaturedRooms />

        </>
    )
}

export default Home

