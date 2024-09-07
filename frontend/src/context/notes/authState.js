import { useState } from "react";
import AllContext from "./Context";


const AuthState = (props) => {

    const host = process.env.REACT_APP_HOST

    const [ShowAlert, SetAlert] = useState({
        status: false,
        message: "",
        signal: "",

    })
    const ActivateAlert = (msg, sig) => {
        SetAlert({
            status: true,
            message: msg,
            signal: sig,
        })
        setTimeout(() => {
            SetAlert({
                status: false,
                message: "",
                signal: "",
            })
        }, 3000);

    }
    // badge part----------------------------------------------------------------------------------

    const [ShowBadge, SetBadge] = useState({
        type: "",
        status: false,
        message: "",
        message_2: ""
    })
    const ActivateBadge = (msg, sig, message_2) => {
        SetBadge({
            type: sig,
            status: true,
            message: msg,
            message_2: message_2
            // signal: sig,
        })
    }
    const DeactivateBadge = (e) => {
        if (e === 'e') {
            // deactivate imidiattelly-------
            // console.log("immidiate")
            SetBadge({
                status: false,
                message: "",
                type: '',
            })
        }
        else {
            // console.log("arm se")
            setTimeout(() => {
                SetBadge({
                    status: false,
                    message: "",
                    type: '',

                    // signal: "",
                })
            }, 3000);
        }

    }


    // -----------------------------------------------------------

    const [LoginStatus, setloginStatus] = useState(false);
    const [showFullMenue, setMenue] = useState(false);

    const Login = async (credentials) => {
        const response = await fetch(`${host}/api/auth/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: (credentials.email)[0],
                    password: (credentials.password)[0]
                }
            )
        });


        const json = await response.json()
        if (json.name) {
            setloginStatus(true)
            ActivateAlert("Succesfully loged in", "success")
        }
        else {
            ActivateAlert("Invalid Credentials", "warning")
        }
        return json


    }
    const SignUp = async (credentials) => {
        // console.log(credentials);

        const response = await fetch(`${host}/api/auth/CreatUSER`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: (credentials.email)[0],
                    password: (credentials.password)[0],
                    name: (credentials.name)[0]
                }
            )
        });


        const json = await response.json()
        if (json.Success) {
            // setloginStatus(true)
            ActivateAlert("Succesfully created a account", "success")
        }
        return json
    }


    const NotesInitial = []
    const [repel, setRepel] = useState(NotesInitial);

    const Getuser = async () => {
        // post req for getting the user info

        const response = await fetch(`${host}/api/auth/GetUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        return json
    }


    // const [addStatus, setaddStatus] = useState(false);
    // add new repel
    const Addrepel = async (credentials) => {

        // console.log(credentials.title[0], credentials.link1[0], credentials.link2[0])

        const Response = await fetch(`${host}/api/notes/addItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    title: credentials.title[0],
                    url1: {
                        link: credentials.link1[0]
                    },
                    url2: {
                        link: credentials.link2[0]
                    }
                }
            )
        });

        const newRepel = await Response.json();
        // console.log(await Response)
        // console.log(newRepel);
        if (await newRepel.Success) {
            const newComp = await newRepel.Newcomp;
            console.log(newComp);
            setRepel([...repel, newComp])
            ActivateAlert("Added a note", "success");
        }
        else {
            ActivateAlert("Error occoured !!", "warning");
        }
        return newRepel
    }

    const GetRepel = async () => {
        const Response = await fetch(`${host}/api/notes/fetchItems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const res = await Response.json();
        setRepel(res);
        return res
    }


    return (
        <AllContext.Provider value={{ ShowBadge, DeactivateBadge, ActivateBadge, LoginStatus
        , Login, setloginStatus, Getuser, showFullMenue, setMenue, repel, ShowAlert, SetAlert, SignUp, Addrepel, GetRepel, ActivateAlert }}>
            {props.children}
        </AllContext.Provider>


    )

}
export default AuthState;