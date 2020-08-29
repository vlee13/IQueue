import React, { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import ReactGiphySearchbox from 'react-giphy-searchbox'
import actions from '../../api'


const Giph = (props) => {
    console.log(props)
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState({})
    const [giphy, setGiphy] = useState()
    const [description, setDescription] = useState('')
    const [editDes, setEditDes] = useState(true)
    const you = true

    useEffect(() => {
        setDescription(props.description)
        setGiphy(props.giphy)
    }, [])

    // useEffect(() => {
    //     actions.getOtherUser(props._id).then(res => {
    //         console.log(res)
    //         setUser(res?.data?.user)
    //         setDescription(res?.data?.user?.description)
    //         setGiphy(res?.data?.user?.giphy)
    //     }).catch(err => console.error(err))



    // }, [])


    const handleGif = () => {
        setEdit(!edit)
    }

    const saveGiphy = (giphy) => {
        actions.saveGif({ giphy }).then(res => {
            setUser(res?.data?.user)
            setEdit(false)
            setGiphy(giphy)

        }).catch(err => console.error(err))
    }


    const submitDes = e => {
        e.preventDefault()
        actions.saveDescription({ description }).then(res => {
            setUser(res?.data?.user)
            setDescription(description)
            setEditDes(true)
        }).catch(err => console.error(err))
    }

    return (
        <div className="user">
            <div className="details">
                <section>
                    <div>
                        {giphy ? <iframe src={giphy} /> : null}


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

                        {you ? <button onClick={handleGif}>{edit ? "Cancel" : "Edit"}</button> : null}
                    </div>

                    <div>
                        <h6>About me:</h6>

                        {you ?
                            <form onClick={() => { setEditDes(false); }} onSubmit={submitDes}>
                                <input disabled={editDes} value={description} type="text" onChange={(e) => setDescription(e.target.value)} />
                                <button hidden={editDes} >Save</button>
                            </form>
                            : <p>{description}</p>}

                    </div>
                </section>
            </div>
        </div>
    );
};

export default Giph;