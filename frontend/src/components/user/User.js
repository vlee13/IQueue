import React, { useEffect, useState } from 'react';
import moment from 'moment';
import actions from '../../api'

const User = (props) => {
    const [user, setUser] = useState({})
    const [calendlyLoaded, setCalendlyLoaded] = useState(false)
    const [c, setC] = useState(false)

    useEffect(() => {
        actions.getOtherUser(props.match.params.id).then(res => {
            console.log(res)
            setUser(res?.data?.user)
        }).catch(err => console.error(err))
    }, [])

    const stopLoad = (e) => {
        console.log('hide', c)
        if (c)
            setCalendlyLoaded(true)
        setC(true)
    }

    return (
        <div className="user">
            <div className="details">
                <h2>{user.name}</h2>
                <img src={user.imageUrl} />
                <h3>{user.points} Points</h3>
                <h5>{user.email}</h5>
                <h6>Created at  {moment(user.createdAt).format('h:mm:ss a')}</h6>
                <h6>Updated at {moment(user.updatedAt).format('h:mm:ss a')}</h6>
                {calendlyLoaded ? <a target="_blank" href={user?.calendly}>Visit Calendly</a> : null }
            </div>
            <div className="calendly">
                <div className="loading">

                    {!calendlyLoaded ?
                        <h1>Loading Calendly<span className="dots"><span>.</span><span>.</span><span>.</span></span></h1>
                        : null}
                </div>

                <iframe
                    src={user?.calendly}
                    width="100%"
                    height="100%"
                    onLoad={stopLoad}
                    frameBorder="0"
                ></iframe>

            </div>
        </div>
    );
};

export default User;