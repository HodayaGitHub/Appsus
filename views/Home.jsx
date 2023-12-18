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
        const mainLogoElement = document.querySelector('.main-page-logo')
        const profilePicsContainer = document.querySelector('.profile-pics')

        mainLogoElement.classList.add('animate__animated', 'animate__backInRight')
        profilePicsContainer.classList.add('animate__animated','animate__backInLeft')

        const intervalId = setInterval(() => {
            mainLogoElement.classList.toggle('animate__backInRight')
            profilePicsContainer.classList.toggle('animate__backInLeft')
        }, 5000)

        return () => clearInterval(intervalId)
    }, [])


    return (
        <React.Fragment>
            <AppHeader />

            <AppAside
                dynamicClass="material-symbols-rounded"
                buttons={buttons} />

            <main className="home main-layout">
                {/* <h1>Welcome to home page!</h1> */}
                <div className="profile-pics">

                    <div className="about-item">
                        <img className="profile-photo" src="assets/img/icons/hodaya.jpg" alt="Your Image" />
                        <div className="about-desc">
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto perferendis ullam similique maxime repudiandae sapiente laudantium deserunt, porro saepe, amet ipsum, aliquam quisquam accusantium blanditiis.</span>
                            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum vero eaque error, accusamus dolor incidunt.</span>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quibusdam alias animi minima quod nobis dignissimos ducimus iusto? Unde, vel.</span>

                        </div>
                    </div>

                </div>

                <img className="main-page-logo" src="assets/img/icons/google_main_logo.png" alt="Your Image" />

            </main>
        </React.Fragment>
    )
}


