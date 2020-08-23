import React, {useEffect, useState} from 'react';
import actions from '../../api';
import EachPost from './EachPost';

const Post = (props) => {

    const [post, setPost] = useState({})
    const [calendlyLoaded, setCalendlyLoaded] = useState(false)
    const [c, setC] = useState(false)

    console.log(post)
    useEffect(() =>{
        actions.getPost(props.match.params.id).then(res=> {
            console.log(res)
            
            setPost(res.data.post)

        }).catch(err => console.error(err))
    },[])


    const stopLoad = (e) => {
        if (c)
            setCalendlyLoaded(true)
        setC(true)
    }

    return (
        <div className="post">

            <div className="details">
            { post.helper ? 
              post.resolved ? 
                <i>{post.user?.name}'s issue was resolved by {post.helper?.name} </i>
                : 
                <i>{post.user?.name} is being helped by {post.helper?.name} </i>            
              : 
              <i>{post.user?.name} needs your help</i>

            }
            <div>"{post.message}"</div>
            <i>{post.bounty} Points</i>

            <EachPost {...post} />

          </div>



          <div className="calendly">
                <div className="loading">

                    {!calendlyLoaded ?
                        <h1>Loading {post.user?.name} Calendly<span className="dots"><span>.</span><span>.</span><span>.</span></span></h1>
                        : null}
                </div>

                <iframe
                    src={post?.user?.calendly}
                    width="100%"
                    height="100%"
                    onLoad={stopLoad}
                    frameBorder="0"
                ></iframe>

            </div>
        </div>
    );
};

export default Post;    