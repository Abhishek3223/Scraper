import { useState } from "react";
import AllContext from "./Context";


const AuthState = (props) => {
    const host = "http://localhost:5000"

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

    const [LoginStatus, setloginStatus] = useState(false);
    const [showFullMenue, setMenue] = useState(false);
    const [AnalysisData, setAnalysisData] = useState(false);

    const Login = async (credentials) => {
        console.log(credentials);

        const response = await fetch("http://localhost:5000/api/auth/Login", {
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
        if (json.Success) {
            setloginStatus(true)
            ActivateAlert("Succesfully loged in", "success")
        }
        else {
            ActivateAlert("Invalid Credentials", "warning")
        }
        console.log(json);
        return json


    }
    const SignUp = async (credentials) => {
        console.log(credentials);

        const response = await fetch("http://localhost:5000/api/auth/CreatUSER", {
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
        console.log(json);
        return json


    }
    const NotesInitial = []
    const [repel, setRepel] = useState(NotesInitial);

    const Getuser = async () => {
        // post req for getting theuser info

        const response = await fetch("http://localhost:5000/api/auth/GetUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        return json
    }



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
        if (newRepel) {
            ActivateAlert("Added a note", "success")
            setRepel(repel.push(newRepel))
        }
        console.log(newRepel)

        setRepel(repel.concat(newRepel))

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
    const EditNote = async (id_toEdit, newPrice) => {

        // api call to fetch data


        const response = await fetch(`${host}/api/notes/UpdateItem/${id_toEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ newPrice })
        });

        const json = await response.json()

        let AllRepel = JSON.parse(JSON.stringify(repel))

        // reaching the note to edit and Editing
        for (let index = 0; index < repel.length; index++) {
            const element = AllRepel[index];
            console.log("Edditing !!")
            if (element._id === id_toEdit) {
                element.notifyPrice = newPrice
            }
            break;
        }
        setRepel(AllRepel);

    }


    return (
        <AllContext.Provider value={{ LoginStatus, Login, setloginStatus, Getuser, showFullMenue, setMenue, ShowAlert, SetAlert, SignUp, Addrepel, GetRepel, ActivateAlert, AnalysisData, setAnalysisData }}>
            {props.children}
        </AllContext.Provider>


    )

}
export default AuthState;