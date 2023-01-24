// import { useState } from "react";
// import AllContext from "./context";

// const NoteState = (props) => {
//     const host = "http://localhost:5000"
//     const NotesInitial = []

//     const [repel, setRepel] = useState(NotesInitial);

//     // Get all repel
//     const GetRepel = async (title, discription, tags) => {
//         console.log("adding a function")

//         const Response = await fetch(`${host}/api/notes/fetchNotes`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 "auth-token": localStorage.getItem('token')
//             },

//             // body data type must match "Content-Type" header
//         });
//         const res = await Response.json();
//         setRepel(res);


//     }

//     // add new repel
//     const Addrepel = async (credentials) => {


//         // 
//         console.log(credentials.title[0], credentials.link1[0], credentials.link2[0])


//         // title = title[0]

//         const Response = await fetch(`${host}/api/notes/addNotes`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 "auth-token": localStorage.getItem('token')
//             },

//             body: JSON.stringify(
//                 {
//                     title: credentials.title[0],
//                     url1: {
//                         link: credentials.link1[0]
//                     },
//                     url2: {
//                         link: credentials.link2[0]
//                     }
//                 }
//             )
//         });


//         const newRepel = await Response.json();
//         console.log(newRepel)

//         setRepel(repel.concat(newRepel))

//     }

//     // delete notes
//     // const DeleteNote = async (id_toDelete) => {
//     //     console.log(`deleting the note ${id_toDelete}`);

//     //     // api call
//     //     const Response = await fetch(`${host}/api/notes/deleteNotes/${id_toDelete}`, {
//     //         method: 'DELETE',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //             "auth-token": localStorage.getItem('token')
//     //         },

//     //     });


//     //     const res = await Response.json();
//     //     const filtered_notes = notes.filter((notes) => { return notes._id !== id_toDelete })
//     //     setRepel(filtered_notes)
//     // }

//     // editnotes

//     // const EditNote = async (id_toEdit, title, discription, tags) => {

//     //     // api call to fetch data
//     //     if (tags.constructor === Array) { tags = tags[0] }
//     //     if (discription.constructor === Array) { discription = discription[0] }
//     //     if (title.constructor === Array) { title = title[0] }

//     //     const response = await fetch(`${host}/api/notes/UpdateNotes/${id_toEdit}`, {
//     //         method: 'PUT',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //             "auth-token": localStorage.getItem('token')
//     //         },

//     //         body: JSON.stringify({title, discription, tags})
//     //     });

//     //     const json = await response.json()

//     //     let AllNotes = JSON.parse(JSON.stringify(notes))

//     //     // reaching the note to edit and Editing
//     //     for (let index = 0; index < notes.length; index++) {
//     //         const element = AllNotes[index];
//     //         console.log("Edditing !!")
//     //         if (element._id === id_toEdit) {
//     //             element.title = title
//     //             element.discription = discription
//     //             element.tags = tags
//     //         }
//     //         break;
//     //     }
//     //     setRepel(AllNotes);

//     // }
//     return (
//         <AllContext.Provider value={{ Addrepel, GetRepel }}>
//             {props.children}
//         </AllContext.Provider>


//     )
// }

// export default NoteState;