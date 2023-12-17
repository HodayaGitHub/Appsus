import { AppHeader } from "../cmps/AppHeader.jsx"
import { AppAside } from "../cmps/AppAside.jsx"
const { NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function Home() {

    const buttons = [
        {
            class: 'main-page-aside-icon',
            icon: (
                <NavLink to="/note">
                    <img className="logo-img" src="assets/img/icons/google_keep.png" alt="Note" />
                </NavLink>
            ),
        },
        {
            class: 'main-page-aside-icon',
            icon: (
                <NavLink to="/mail">
                    <img className="logo-img" src="assets/img/icons/gmail_icon.png" alt="Mail" />
                </NavLink>
            ),
        }
    ]


    useEffect(() => {
        const logoElement = document.querySelector('.main-page-logo');
        logoElement.classList.add('animate__animated', 'animate__backInLeft');
        const intervalId = setInterval(() => {
            logoElement.classList.toggle('animate__backInLeft')
        }, 1000000)

        return () => clearInterval(intervalId)
    }, [])



    return (
        <React.Fragment>
            <AppHeader />

            <AppAside
                dynamicClass="material-symbols-rounded"
                buttons={buttons} />

            <main className="home">
                {/* <h1>Welcome to home page!</h1> */}
                <div className="profile-pic"></div>
                <div className="profile-pic"></div>

                <img className="main-page-logo" src="assets/img/icons/google_main_logo.png" alt="Your Image" />

            </main>
        </React.Fragment>
    )
}



// <div className="logos-container">

// <NavLink to="/note">
//     <img className="logo-img" src="assets/img/icons/google_keep.png" alt="Note" />
// </NavLink>


// <NavLink to="/mail">
//     <img className="logo-img" src="assets/img/icons/gmail_icon.png" alt="Mail" />
// </NavLink>

// <NavLink className="user-img-container" to="/">
//     <img className="user-img" src="assets/img/icons/user_img_i.png" alt="user" />
// </NavLink>


// </div>