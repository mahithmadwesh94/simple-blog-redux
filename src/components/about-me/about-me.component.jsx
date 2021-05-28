import React from 'react';
import './about-me.styles.css'
import { ReactComponent as Mahith } from '../../assets/undraw_male_avatar_323b.svg'

const AboutMeInfo = () => {

    return (
        <div className="container-fluid">
            <div className="row">


                <div className="col-6 col-sm-6 col-md-6 col-lg-12 text-center">

                    <h1 className="text-start"><span> <Mahith style={{ width: '23%', height: '23%' }} /></span> Mahith Madwesh</h1>

                </div>
            </div>

            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center pt-2 mt-2">
                    <h3 className="text-start">Name: <span className="text-info" style={{ color: 'black' }}>Mahith Madwesh</span></h3>
                    <h3 className="text-start">Education: <span className="text-info">BE CSE, MTech Network Engineering</span></h3>
                    <h3 className="text-start">Current: <span className="text-info">Associate Technical Consultant @ Salesforce</span></h3>

                </div>
            </div>
        </div>
    )
}

export default AboutMeInfo;