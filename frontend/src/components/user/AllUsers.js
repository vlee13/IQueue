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
                <Link key={user._id} to={`user/${user._id}`}>
                    <li class="ppl">
                        <img src={user.imageUrl}/>
                        <h5>{user.name} {user.points}</h5>
                    </li>
                </Link>
            )
        })
    }

    return (
        <div>
            All Users?
            {showUsers()}
        </div>
    );
};

export default AllUsers;