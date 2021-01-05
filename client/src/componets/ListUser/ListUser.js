import React, { useState } from 'react';

import axios from'axios';
import { useEffect } from 'react';


const ListUser = () => {


    const [user, setUser] = useState([]);


    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/userlist/get_userlist').then(res=>{
            setUser(res.data);
        })
    }, [])

    const onDelete = (userId) =>{
        if (window.confirm(`Are you want delete this user?`)) {
            axios.delete('http://127.0.0.1:5000/api/userlist/delete_user',{data:userId}).then(
                res =>{
                    console.log(res);
                }
            )

        }
    }

    return (
            <div>
                <h1>List User</h1>
                    {
                    user.map((user)=>{
                        return(
                        <div className="user" key={user._id}>
                            <img width="50px" src={`http://127.0.0.1:5000/image/${user.photo}`}/>
                            <span>{user.name}</span>
                            <span>{user.email}</span>
                            <button onClick={()=>{onDelete(user._id)}}>Delete </button>
                        </div>
                        )
                    })
                }
                
                
            </div>
    )
}

export default ListUser
