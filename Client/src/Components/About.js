import React from 'react'
import myimage from '../assests/robot.png'

const About = () => {
    return (
        <section className="bg-light py-5">
          <div className="container bg-dark text-light">
            <div className="row">
              <div className="col-md-6 py-3">
                <h2 className="display-5 px-5 py-3 mt-5 fw-bold ">About Us</h2>
                <p className="lead fw-light px-5">
                  Welcome to our wonderful world. We craft solutions for a wide
                  range of industries. Discover what we can do for you. 
                </p>
                <h2 className="display-5 px-5 py-3 mt-2 fw-bold ">Beta Phase</h2>
                <p className="lead fw-light px-5">
                 Thanks for joining MovieFlix on cloud, your Password and Emails are 100% secured, because we only have user authentication token, not your Password.
                 As this is the beta version so their can be few bugs, We are still updating... 
                </p>
              </div>
              <div className="col-md-6">
                <img
                  src={myimage}
                  alt="About Us"
                  className="img-fluid rounded-circle"
                />
              </div>
            </div>
          </div>
        </section>
      );
}

export default About