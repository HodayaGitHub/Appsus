import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

import google_keep from '../assets/img/icons/google_keep.png';
import gmail_icon from '../assets/img/icons/gmail_icon.png';

export function Features({ myRef }) {



    return (
        <section ref={myRef} className="our-features">
            <h1 className="features-title">Our Features </h1>
            <div className="features-container">
                <div className="feature-item">
                    <NavLink to="/mail">
                        <img className="logo-img" src={gmail_icon} alt="Mail" />
                        <h4>Appsus Email</h4>
                        <span>
                            Revolutionize your communication with a sleek web app, offering Gmail-like efficiency and seamless user experience.
                        </span>
                    </NavLink>
                </div>
                <div className="feature-item">
                    <NavLink to="/note">
                        <img className="logo-img" src={google_keep} alt="Note" />
                        <h4>Appsus Keep</h4>
                        <span>
                            Your go-to notes app for effortless organization, collaboration, and quick access to important thoughts.
                        </span>
                    </NavLink>

                </div>
            </div>
        </section>
    )
}