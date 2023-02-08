import React, { useState, useEffect, useContext } from 'react'
import '../css/Coment.css'
import AllContext from '../context/notes/Context'
import { Loaderr } from './loader';
import { Loader } from './loader';
import ProfileCard from './ProfileCard';


export const Comment = () => {
    let [loading, setloding] = useState(false);
    const [message, setMessage] = useState({
        message: ""
    })
    const [isloading, setLoading] = useState(true);
    const [CommentData, SetCommentData] = useState([])
    const context = useContext(AllContext)
    const { Getuser } = context;

    const CommentBox = (props) => {

        return (
            <div className="comment">
                <div className="comment-profile">
                    <div className='profile-img'>
                        <img src="/images/avtar.png" alt="" srcset="" />
                    </div>
                    <p className="commmenter-name">
                        {props.cmt.userName}
                    </p>
                    <p className='date'>
                        {props.cmt.date}
                        <span>
                            <i className="fa-solid fa-calendar-day calender"></i>
                        </span>
                    </p>
                </div>
                <p className="coment-msg">
                    {props.cmt.message}
                </p>
            </div>
        )

    }
    const change = (e) => {
        setMessage({
            ...message, [e.target.name]: [e.target.value]
        })
        // console.log();
    }
    const changeLoading = () => {

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }
    const getComment = async () => {

        const Response = await fetch(`http://localhost:5000/api/comment/getComment`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const res = await Response.json();
        // console.log(res);
        changeLoading();
        return res
    }
    const addComment = async (userName, m) => {



        const Response = await fetch(`http://localhost:5000/api/comment/addcomment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    username: userName,
                    msg: m,
                }
            )
        });
        const res = Response.json();
        console.log(res);

        return res

    }
    const AddCmt = async () => {
        setloding(true)

        const userData = await Getuser();
        const userName = await userData.name;
        const m = message.message[0];
        // console.log({ userName, m });
        const newCmt = await addComment(userName, m);
        console.log(newCmt);
        setloding(false)
        if (newCmt) {
            SetCommentData(((CommentData.reverse()).concat(newCmt)).reverse())
        }
        // console.log(loading);
    }
    useEffect(() => {
        return async () => {
            const d = await getComment();
            // console.log(d);
            SetCommentData(d.reverse());
        }
    }, [])

    return (
        <div className="comment-section">

            <ProfileCard />

            <div className="input-cmnt">
                <input className='input' type="text" id="fname" name="message" onChange={change} />
                <button className="add-cmt-btn" onClick={() => { AddCmt() }}>
                    {/* Send */}
                    <span>

                        {
                            loading ?
                                <Loaderr /> :
                                <span style={{
                                    display: "flex"
                                }}>
                                    Send
                                    <i className="fa-solid fa-location-arrow send"></i>
                                </span>
                        }

                    </span>
                </button>
            </div>
            {!isloading ?
                <div className="comments">
                    {(!(CommentData === []) ?
                        CommentData.map((data, i) => {

                            return (
                                <CommentBox cmt={data} key={i} />

                            )
                        })
                        :
                        <h1>no comments to show</h1>)
                    }

                </div>
                :
                <Loader />
            }

        </div >
    )
}
