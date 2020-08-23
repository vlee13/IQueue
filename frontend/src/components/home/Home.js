import React, { Fragment, Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import TheContext from '../../TheContext'
import Scheduler from './Scheduler'

import actions from '../../api/index'
import EachPost from './EachPost'


// const EachPost = ( post ) => {
//   const {user} = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 
//   let yours = post?.user._id === user?._id

//   const [modalIsOpen,setIsOpen] = React.useState(false);


//   let areYouTheHelper =  post?.helper?._id === user?._id

//   let isThereAnotherHelper = post?.helper && !areYouTheHelper

//   let [helped, setHelped] = useState(areYouTheHelper || isThereAnotherHelper)


//   const help = (val) => (event) => {
//     actions.helpUser({post, help:val}).then(res => {
//       if(res)  
//         setHelped(val)
      
//       if(val)
//         setIsOpen(true);

//     }).catch(err => console.error(err))

//   }


//   return (
//     <div>
      
//       {helped? 
//         <button disabled={isThereAnotherHelper || yours || !user?._id} onClick={help(false)}>Nevermind <h2> 🛑</h2></button>
//         :
//         <button disabled={isThereAnotherHelper || yours || !user?._id} onClick={help(true)}>I got you <h2> 👍</h2></button>

//       }

//       <Scheduler modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} user={user} post={post}/>

//     </div>
//   );
// };

const Posts = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => { 
    actions.getAllPosts()
      .then(posts => {
        setPosts(posts.data.reverse())
      })
      .catch(err => console.error(err))      
  }, [])


  if(posts.length === 0){
    return <div className="loading"><i><h2>There are no pending posts in the queue. Great job!  Click on Profile to add a new one.</h2></i></div>
  }

  return posts.map(eachPost => (
    <Fragment key={eachPost._id}>

      <li className="queue">

        <Link to={`/user/${eachPost.user?._id}`}>
          <img src={eachPost.user?.imageUrl} />
        </Link>

        <Link to={`/post/${eachPost._id}`}>

          <div className="details">
            { eachPost.helper ? 
              eachPost.resolved ? 
                <i>{eachPost.user?.name}'s issue was resolved by {eachPost.helper?.name} </i>
                : 
                <i>{eachPost.user?.name} is being helped by {eachPost.helper?.name} </i>            
              : 
              <i>{eachPost.user?.name} needs your help</i>

            }
            <div>"{eachPost.message}"</div>
            <i>{eachPost.bounty} Points</i>
          </div>
        </Link>
        <EachPost {...eachPost} />
      </li>
      {/* <div>{eachPost.time}</div> */}

    </Fragment>

  ))
}




const Home = (props) => {
  const changeFruit = () => {

  }

  return (
    <div>
      <Posts />

    </div>
  )
}

export default Home;



