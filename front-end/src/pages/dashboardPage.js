import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import makeToast from "../Toaster/toaster";
import io from "socket.io-client";



const DashboardPage = (props) => {
    const chatroomNameRef = React.createRef();
    const [chatrooms, setChatrooms] = React.useState([]);
    const SetupSocket = () => {
        const socket = io("http://localhost:8000", {
            query: {
                token: localStorage.getItem("U_Token"),
            }
        });
        if(socket){ socket.on("disconnect", () => {
            setTimeout(SetupSocket, 3000);
            makeToast("error", "Socket Disconnected!");
        });}
       
        if(socket){
            socket.on("connect", () => {
                makeToast("success", "Socket Connected!")
            });
        }
       
    }
    SetupSocket();

 const createRoom = ()=>{
    const Rname = chatroomNameRef.current.value;
    const data = { name :Rname}
    axios.post("http://localhost:8000/chatroom",
    data,
    {
   
        headers: {
            Authorization: "Bearer " + localStorage.getItem("U_Token"),
        },
        
    }).then((response) => {
        chatroomNameRef.current.value = " "
        makeToast("success", response.data.message);
        
        getChatrooms();

    }).catch((err) => {
        if (err &&
            err.response &&
            err.response.data &&
            err.response.data.message
        )

            makeToast("error", err.response.data.message);
    });
};

 

    const getChatrooms = () => {
        axios.get("http://localhost:8000/chatroom", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("U_Token"),
            },
        }).then((response) => {
            setChatrooms(response.data);

        }).catch((err) => {
            setTimeout(getChatrooms, 3000);
        });
    };
    const logout = ()=>{
        localStorage.removeItem("U_Token");
    }
    React.useEffect(() => {
        getChatrooms();
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="title">ChisMe</div>
            <Link  to={"/login"} >
                                <span className="join leave" onChange= {logout}>Logout</span>
                            </Link>
            <div className="chatroomPage">
                <div className="cardHeader">CHATROOMS</div>
                <div className="cardBody">
                    <div className="inputGroup">
                        <label htmlFor="chatroomName">Chatroom Name</label>
                        <input
                            type="text"
                            name="chatroomName"
                            id="chatroomName"
                            placeholder="Enter Chatroom Name"
                            ref={chatroomNameRef}
                        />
                    </div>
                </div>
                <button onClick={createRoom}> Create Chatroom </button>
                <div className="chatrooms">
                    {chatrooms.map((chatroom) => (
                        <div key={chatroom._id} className="chatroom">
                            <div>{chatroom.name}</div>
                            <Link to={"/chatroom/" + chatroom._id}>
                                <div className="join">Join</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default  DashboardPage;
