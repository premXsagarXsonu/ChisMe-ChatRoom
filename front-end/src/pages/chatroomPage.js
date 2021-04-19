import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import io from "socket.io-client";
import { Link } from 'react-router-dom';

const chat = [];

const ChatroomPage = ({ match }) => {

    const chatroomId = match.params.id;
    const [state , setState] = useState({ nmessage : " ", uname : " "});
    const [messages, setMessages] = useState([]);
    
    
    const messageRef = React.useRef();
    const socketRef = React.useRef();
        socketRef.current = io.connect("http://localhost:8000", {
        query: {
            token: localStorage.getItem("U_Token"),
        }
    });

    useEffect(() => {
      socketRef.current.on("newMessage", ( message ) => {
         
            const newMessage = [...messages, message];
            setMessages(newMessage);           
            console.log(newMessage);
            chat.push(message);
            
            setState({nmessage:message.message , uname: message.name})
        });

        //eslint-disable-next-line
    }, [messages,socketRef]);




    useEffect(() => {
        if (socketRef) {
            socketRef.current.emit("joinRoom", {
                chatroomId,
            });
        }
        return () => {
            if (socketRef) {
                socketRef.current.emit("leaveRoom", {
                    chatroomId,
                });
            }
        }
        //eslint-disable-next-line
    }, [chatroomId,socketRef]);

    const sendMessage = () => {

        socketRef.current.emit("chatroomMessage", {
            chatroomId,
            message: messageRef.current.value,

        });
      
        messageRef.current.value = " "

    };

    const renderChat = () => {

        return chat.map((message) => (
            <div key={message.id} className="message">
                <span
                    className=
                    "otherMessage"
                >
                    {message.name}:</span>
                {" "}{message.message}
            </div>
        ))
    }



    return (
        <div>
            <div className="title" >ChisMe</div>
            <Link  to={"/dashboard"} >
                                <span className="join leave" >Leave Chatroom</span>
                            </Link>
            <div className="chatroomPage">
                <div className="chatroomSection">
                    {messages.map((message)=>(
                        <div className="chatroomcardHeader"> {message.RoomName}</div>
                    ))}
                        
                    <div className="chatroomContent">
                        {renderChat()}

                    </div>
                    <div className="chatroomActions">
                        <div className="inputGroup">
                            <input
                                type="text"
                                name="message"
                                placeholder="Say Something !"
                                ref={messageRef}
                            />
                        </div>
                        <div>
                            <button onClick={sendMessage} className="join">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ChatroomPage);
