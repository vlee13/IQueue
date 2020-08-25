import React, { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import actions from '../../api'
import ReactGiphySearchbox from 'react-giphy-searchbox'


const User = (props) => {
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState({})
    
    const [giphy, setGiphy] = useState()
    const [description, setDescription] = useState('')

    const [editDes, setEditDes] = useState(true)

    const you = props?._id === user?._id

    console.log('you ',you)

    useEffect(() => {
        actions.getOtherUser(props.match.params.id).then(res => {
            console.log(res)
            setUser(res?.data?.user)
            setDescription(res?.data?.user?.description)
        }).catch(err => console.error(err))
    }, [])


    const saveGiphy = giphy => {
        setGiphy(giphy)
    }

    const handleGif = () => {
        setEdit(!edit)
    }

    const saveGif = () => {
        console.log(giphy)
        actions.saveGif({giphy}).then(res => {
            console.log(res)
            setUser(res?.data?.user)
            setEdit(false)
        }).catch(err => console.error(err))
    }


    const submitDes = e => {
        e.preventDefault()
        console.log(description)
        actions.saveDescription({description}).then(res => {
            console.log(res)
            setUser(res?.data?.user)
            setDescription(description) 
            setEditDes(true)           
        }).catch(err => console.error(err))
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
                
                {/* <input onChange={setDesc} type="textarea" onClick={()=>setEditDes(editDes)} value={user.description} /> */}

                {you ? 
                <form onClick={()=>{ setEditDes(false);}} onSubmit={submitDes}>
                    <input disabled={editDes} value={description} type="text" onChange={(e) => setDescription(e.target.value)} />    
                    <button hidden={editDes} >Save</button>
                </form>
                : <p>{description}</p> }
                
                {!you ? <iframe src={user.giphy} /> : null} 

                {!giphy && props?.giphy ? <iframe src={props?.giphy} /> : null }

                {giphy ? <iframe src={giphy} /> : null }


                {you && edit ? 
                    <Fragment>
                        <button onClick={saveGif}>Save</button>

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