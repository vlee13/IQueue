import React, {useEffect, useState} from 'react';
import moment from 'moment';
import actions from '../../api'

const User = (props) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        actions.getOtherUser(props.match.params.id).then(res => {
            console.log(res)
            setUser(res?.data?.user)
        }).catch(err => console.error(err))
    }, [])

    const hideSpinner = () => {
        console.log('hide')
    }

    return (
        <div className="user">
            <div>
                <h2>{user.name}</h2>
                <img src={user.imageUrl} />
                <h3>{user.points} Points</h3>
                <h5>{user.email}</h5>
                <h6>Created at  {moment(user.createdAt).format('h:mm:ss a')}</h6>
                <h6>Updated at {moment(user.updatedAt).format('h:mm:ss a')}</h6>
            </div>
            <div className="calendly">
                <h3 className="loadCalendly">Loading...</h3>
                <iframe
                src={user?.calendly}
                width="100%"
                height="100%"
                onLoad={hideSpinner}
                frameBorder="0"
                ></iframe>

            </div>
        </div>
    );
};

export default User;