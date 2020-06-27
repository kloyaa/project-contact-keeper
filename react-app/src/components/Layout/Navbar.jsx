import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
    return ( 
       <Fragment>
        <nav className="mb-1 navbar navbar-expand-lg navbar-dark info-color">
            <Link to='/'>
                  <span className="navbar-brand text-uppercase">{ title }</span>
            </Link>
        <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarSupportedContent-4"
            aria-controls="navbarSupportedContent-4" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
            <ul className="navbar-nav ml-auto">
                <Link to='/about'>
                        <li className="nav-item active">
                            <span className="nav-link">
                                <i className="fas fa-info-circle"/>About
                                <span className="sr-only">(current)</span>
                            </span>
                        </li>
                </Link>
                <Link to='/contacts'>
                        <li className="nav-item">
                            <span className="nav-link">
                                <i className="fas fa-phone"/>Contacts
                            </span>
                        </li>
                </Link>
                <Link to='/settings'>
                        <li className="nav-item">
                            <span className="nav-link">
                                <i className="fas fa-cog"/>Settings
                            </span>
                        </li>
                </Link>
            </ul>
        </div>
        </nav>
       </Fragment>
     );
}

Navbar.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string
}
Navbar.defaultProps = {
    title: 'Contact keeper',
    icon: 'fas fa-id-card-alt'
}
export default Navbar;