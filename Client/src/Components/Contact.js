import React from 'react';

const Contact = () => {
    return (
        <section className="bg-dark text-white py-5  shadow-sm">
          <div className="container p-4">
            <div className="row">
              <div className="col-md-6">
                <h2 className="display-4 fw-bold">Contact Us</h2>
                <p className="lead fw-light">
                  Have questions or need assistance? Feel free to get in touch with
                  us. We're here to help.
                </p>
                <ul className="list-unstyled">
                  <li>
                    <i className="fas fa-map-marker-alt  mx-3"></i>  SoftAims, DHA PHASE 3
                  </li>
                  <li>
                    <i className="fas fa-phone-alt mr-2 mx-3"></i>  (123) 456-7890
                  </li>
                  <li>
                    <i className="fas fa-envelope mr-2 mx-3"></i>  Ehtishamahmedgondal@gmail.com
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <form>
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <button type="button" className="btn btn-light btn-outline-primary mt-4">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      );
}

export default Contact;
