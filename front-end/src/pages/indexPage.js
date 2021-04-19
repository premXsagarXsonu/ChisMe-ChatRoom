import React from 'react';


const Indexpage = (props) => {
    React.useEffect(() => {
        const token = localStorage.getItem("U_Token");
        if (!token) {
            props.history.push("/login");
        } else {
            props.history.push("/dashboard");
        }
        //eslint-disable-next-line
    }, [0])
    return (
        <div>
        </div>
    )
}

export default Indexpage
