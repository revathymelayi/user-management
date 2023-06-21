import React from "react";
import {useSelector} from "react-redux"

import {useNavigate} from "react-router-dom"
import {Button} from "@mui/material"

export default function UserHome(){
    const navigate = useNavigate()
    const userInfo = useSelector((state)=>state.user.userInfo.data);
    // console.log(userInfo);
    const {name,email,phone,_id,profilePic} = userInfo.user
    return (
        

        <div className="card-container">
    
            <div className="upper-container">
                <div className="image-container">
                    <img src={profilePic?`http://localhost:8080/user/${profilePic}`:""} 
                    />
                </div>
            </div>
    
            <div className="lower-container">
                <div>
                    <h4>{name}</h4>
                    <h5>+91{phone}</h5>
                </div>
                <div>
                    <p>{email}</p>
                </div>
                <div className="buttons">
                    <Button 
                     className="primary"
                     onClick={()=>{
                        navigate(`/edit/profile/${_id}`)
                     }}
                    >
                    Edit Profile
                    </Button>
                    <Button className="primary ghost">Welcome {name}</Button>
                    <Button />
                </div>
            </div>
    
        </div>
    
    
    
      );
}

