import React, { Fragment, Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import TheContext from '../../TheContext'
import Scheduler from './Scheduler'

import actions from '../../api/index'
import EachPost from './EachPost'
import moment from 'moment'






const Posts = ({posts}) => {

  console.log(posts)
  if(posts.length === 0){
    return <div className="loading"><i><h2>There are no pending posts in the queue. Great job!  Click on Profile to add a new one.</h2></i></div>
  }

  console.log(posts)

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
            <i>{eachPost.bounty} Points!</i>
            <i>Created: {moment(eachPost?.createdAt).fromNow('s')}</i>
            <i>Updated: {moment(eachPost?.updatedAt).fromNow('s')}</i>

          </div>
        </Link>
        <EachPost {...eachPost} />
      </li>

    </Fragment>

  ))
}




const Home = (props) => {

  const [posts, setPosts] = useState([])
  const [all, setAll] = useState([])

  const filterPosts = (posts, filter) => {
    console.log(posts, filter)
    if(filter === 'all'){
      setPosts(posts?.reverse())
    } else {
      let hour = 60 * 60 * 1000;
      let p = posts?.filter(each => { 
        console.log(moment(new Date()) - moment(each.createdAt) < hour)
        return  moment(new Date()) - moment(each.createdAt) < hour ||  moment(new Date()) - moment(each.updatedAt) < hour 
      })
      setPosts(p.reverse())
    }
  }
  

  useEffect(() => { 
    actions.getAllPosts()
      .then(res => {
        console.log(res.data)
        setAll(res.data)
        filterPosts(res.data)
      })
      .catch(err => console.error(err))      
  }, [])

  console.log(posts)
  return (
    <div>
      <Posts posts={posts} />
      <button onClick={() => filterPosts(all, 'all')}>Older Posts</button>
    </div>
  )
}

export default Home;



