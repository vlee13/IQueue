import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

import actions from '../../api'
const AllUsers = () => {
    
    const [users, setUsers] = useState([])

    useEffect(() => {
        actions.getAllUsers().then(res => {
            console.log(res)
            setUsers(res?.data?.users)
        }).catch(err => console.error(err))
    }, [])

    const showUsers = () => {
        return users.map(user=> {
            return (
                <li class="ppl">

                    <Link key={user._id} to={`user/${user._id}`}>
                            <span>
                                <img src={user.imageUrl}/>
                                <h5>{user.name}</h5>
                            </span>
                            <h5>{user.points}</h5>
                    </Link>

                </li>

            )
        })
    }

    return (
        <div>
            <div className="allUsers">
                {showUsers()}
            </div>
        </div>
    );
};

export default AllUsers;