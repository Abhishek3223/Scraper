import React from 'react'
import '../css/ProfileCard.css'
const ProfileCard = () => {
    return (

        <div className="profile-card">
            <div className="img">
                <img src="https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGZhY2V8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            </div>
            <div className="infos">
                <div className="name">
                    <p>WEB DEVELOPER</p>
                    <h2>Abhishek Ranjan</h2>
                    {/* <h4>@bradsteve</h4> */}
                </div>
                <p className="text">
                    I'm a Full Stack web Developer
                </p>

                <div className="links">
                    <i style={
                        {
                            'color': '#00adb5'
                        }
                    } className="fa-brands fa-linkedin fa-5x linkedin"></i>
                    <i style={
                        {
                            'color': '#00adb5'
                        }
                    } className="fa-brands  fa-5x  fa-square-github"></i>
                    {/* <button className="view">View profile</button> */}
                </div>
            </div>

        </div>
    )
}

export default ProfileCard