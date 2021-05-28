import React from 'react';
import { ReactComponent as AboutMe } from '../../assets/undraw_hacker_mind_6y85.svg';
import AboutMeInfo from '../../components/about-me/about-me.component';

const About = () => {
    return (
        <div className="container-fluid">

            <div className="row">

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 nonImgDiv">
                    {/* Column for text and info */}
                    <AboutMeInfo />
                </div>


                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <AboutMe style={{ width: '100%' }} />
                </div>
            </div>
        </div>
    )
};

export default About;