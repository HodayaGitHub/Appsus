import { AppHeader } from "../cmps/AppHeader.jsx"
import { AppAside } from "../cmps/AppAside.jsx"
const { NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function Home() {

    const [animateLogo, setAnimateLogo] = useState(true);
    const [animateProfile, setAnimateProfile] = useState(true);
    const [logoPosition, setLogoPosition] = useState(0);

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
        const intervalId = setInterval(() => {
            setLogoPosition((prevPosition) => (prevPosition === 0 ? 20 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <React.Fragment>
            <AppHeader />

            <AppAside
                dynamicClass="material-symbols-rounded"
                buttons={buttons} />

            <main className="home main-layout">
                <div className="main-content-container">

                    <div className={`profile-pics ${animateProfile ? 'animate__animated animate__backInLeft' : ''}`}>
                        <div className="about-item">
                            <div className="about-desc">
                                <span>
                                    Explore more with Appsus, simplifying and enhancing your daily routine
                                </span>
                                <button className="get-started-btn">Get Started</button>
                            </div>
                        </div>

                    </div>

                    <div
                        className={`main-page-logo ${animateLogo ? 'animate__animated animate__backInRight' : ''}`}
                        style={{ marginTop: `${logoPosition}px` }}>
                        <svg viewBox="0 23 512 465.455" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd">
                                <circle class="blue-circle" cx="139.636" cy="162.636" fill="#4285f4" r="139.636"></circle>
                                <circle class="red-circle" cx="372.364" cy="232.455" fill="#ea4335" r="69.818"></circle>
                                <circle class="yellow-circle" cx="372.364" cy="407" fill="#fbbc05" r="81.455"></circle>
                                <circle class="green-circle" cx="477.091" cy="151" fill="#34a853" r="34.909"></circle>
                            </g>
                        </svg>
                    </div>

                </div>

                <div className="">
                    blalglaglkafglkl
                </div>
            </main>
        </React.Fragment>
    )
}


