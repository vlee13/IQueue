import React, {useEffect, useState} from 'react';
import actions from '../../api';

const Post = (props) => {

    const [post, setPost] = useState({})
    
    useEffect(() =>{
        actions.getPost(props.match.params.id).then(res=> {
            console.log(res)
            
            setPost(res.data.post)

        }).catch(err => console.error(err))
    },[])

    return (
        <div>
            Post detail {props.match.params.id}
        </div>
    );
};

export default Post;    