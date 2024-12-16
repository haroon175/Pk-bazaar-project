import React from 'react';
import Carosal1 from '../../images/cars1.jpg'
import Carosal2 from '../../images/cars2.jpg'
import Carosal3 from '../../images/cars3.jpg'
import Carosal4 from '../../images/cars4.jpg'
import Carosal5 from '../../images/cars5.jpg'
import Carosal6 from '../../images/cars6.png'
import Carosal7 from '../../images/cars7.jpg'
import Carosal8 from '../../images/cars8.jpg'
import Carosal9 from '../../images/cars9.jpg' 
import { Container } from '@mui/material';
const Carousel = () => {
    return (
        <div>
            <Container sx={{ width: "100%", padding: 0  }}>
            <div className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" >
                <div className="carousel-inner" >
                    <div className="carousel-item active" style={{ backgroundImage: `url(${Carosal1})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>
                        <div className="carousel-caption d-flex justify-content-center align-items-start" style={{ position: 'absolute', top: '150px', left: 0, right: 0, padding: '20px' }}>
                            {/* <h2 className="text-white" style={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontSize: '45px' }}>Welcome to the PkBazaar</h2> */}
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Carosal2})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>
                        
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Carosal3})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>
                        
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Carosal4})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>
                        
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Carosal5})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>
                        
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Carosal6})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>
                        
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Carosal7})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>
                        
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Carosal8})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>
                       
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Carosal9})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>
                       
                    </div>
                </div>
            </div>
            </Container>
        </div>
    );
}

export default Carousel;
