import React from 'react'
import '../css/ProfileCard.css'
const ProfileCard = () => {
    return (

        <div className="profile-card">
            <div className="img">
                <img src="https://media.licdn.com/dms/image/D4D03AQHpIaeOsFeEKA/profile-displayphoto-shrink_800_800/0/1673390435553?e=1683763200&v=beta&t=5E04uLIaL7_6P_4FX0xwizEzep24N_vBD6smHNB56lk" />
            </div>
            <div className="infos">
                <div className="name">
                    <p>WEB DEVELOPER</p>
                    <h2>Abhishek Ranjan</h2>
                </div>
                <p className="text">
                    I'm a Full Stack web Developer
                </p>

                <div className="links">
                    <a href="https://www.linkedin.com/in/abhishek-ranjan-6b170823b/">
                        <i style={
                            {
                                'color': '#00adb5'
                            }
                        } className="fa-brands fa-linkedin fa-5x linkedin"></i>
                    </a>
                    <a href="https://github.com/Abhishek3223">

                        <i style={
                            {
                                'color': '#00adb5'
                            }
                        } className="fa-brands  fa-5x  fa-square-github"></i>
                    </a>

                    {/* <i style={
                        {
                            'color': '#00adb5'
                        }
                    } className="fa-brands  fa-5x  fa-square-github"></i> */}
                    {/* <button className="view">View profile</button> */}
                </div>
            </div>

        </div>
    )
}

export default ProfileCard