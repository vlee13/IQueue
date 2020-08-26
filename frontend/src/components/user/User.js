import React, { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import ReactGiphySearchbox from 'react-giphy-searchbox'
import actions from '../../api'


const User = (props) => {
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState({})
    const [giphy, setGiphy] = useState()
    const [description, setDescription] = useState('')
    const [editDes, setEditDes] = useState(true)
    const you = props?._id === user?._id


    useEffect(() => {
        actions.getOtherUser(props.match.params.id).then(res => {
            console.log(res)
            setUser(res?.data?.user)
            setDescription(res?.data?.user?.description)
            setGiphy(res?.data?.user?.giphy)
        }).catch(err => console.error(err))


        
    }, [])


    const handleGif = () => {
        setEdit(!edit)
    }

    const saveGiphy = (giphy) => {
        actions.saveGif({giphy}).then(res => {
            setUser(res?.data?.user)
            setEdit(false)
            setGiphy(giphy)

        }).catch(err => console.error(err))
    }


    const submitDes = e => {
        e.preventDefault()
        console.log(description)
        actions.saveDescription({description}).then(res => {
            setUser(res?.data?.user)
            setDescription(description) 
            setEditDes(true)           
        }).catch(err => console.error(err))
    }

    return (
        <div className="user">
            <div className="details">
                <h2>{user?.name}</h2>
                <img src={user?.imageUrl} />
                <h3>{user?.points} Points</h3>
                <h5>{user?.email}</h5>
                <h6>Created at  {moment(user?.createdAt).format('h:mm:ss a')}</h6>
                <h6>Updated at {moment(user?.updatedAt).format('h:mm:ss a')}</h6>
                
                {you ? 
                <form onClick={()=>{ setEditDes(false);}} onSubmit={submitDes}>
                    <input disabled={editDes} value={description} type="text" onChange={(e) => setDescription(e.target.value)} />    
                    <button hidden={editDes} >Save</button>
                </form>
                : <p>{description}</p> }
                


                {giphy ? <iframe src={giphy} /> : null }


                {you && edit ? 
                    <Fragment>

                        <ReactGiphySearchbox
                        apiKey={process.env.REACT_APP_GIPHY}
                        onSelect={item => saveGiphy(item?.embed_url)}
                        />
                    </Fragment>

                : 
                    null
                }

                {you ? <button onClick={handleGif}>{ edit?"Cancel":"Edit" }</button> : null}
                
                

            </div>

        </div>
    );
};

export default User;