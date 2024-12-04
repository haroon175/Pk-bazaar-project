import React from 'react';
import Bags from '../../../images/bags.jpg'
import Electronics from '../../../images/electronics.jpg'
import Toys from '../../../images/toys.jpeg'
const Slider = () => {
    return (
        <div>
            <div className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" style={{ marginTop: '70px' }}>
                <div className="carousel-inner">
                    <div className="carousel-item active" style={{ backgroundImage: `url(${Bags})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '500px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)'
                        }}></div>
                        <div className="carousel-caption d-flex justify-content-center align-items-start" style={{ position: 'absolute', top: '150px', left: 0, right: 0, padding: '20px' }}>
                            <h2 className="text-white" style={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontSize: '45px' }}>Products</h2>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Electronics})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '500px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)'
                        }}></div>
                        <div className="carousel-caption d-flex justify-content-center align-items-start" style={{ position: 'absolute', top: '150px', left: 0, right: 0, padding: '20px' }}>
                            <h2 className="text-white" style={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontSize: '45px' }}>Products</h2>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: `url(${Toys})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '500px' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)'
                        }}></div>
                        <div className="carousel-caption d-flex justify-content-center align-items-start" style={{ position: 'absolute', top: '150px', left: 0, right: 0, padding: '20px' }}>
                            <h2 className="text-white" style={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontSize: '45px' }}>Products</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
