import React, {  useEffect, useState } from 'react';
import actions from '../../api/index'
import TheContext from '../../TheContext'
import Scheduler from './Scheduler'


const EachPost = ( post ) => {
    const {user} = React.useContext(TheContext); //With Context I can skip the prop drilling and access the context directly 

    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [loading, setLoading] = useState(false)


    
    //PAIN IN THE ASS
    const [helped, setHelped] = useState(null)
    let areTheyBeingHelped = Boolean(post?.helper?._id)
    if(helped !== null) {
      areTheyBeingHelped = helped 
    }
    
    let yours = post?.user?._id === user?._id
    
    let areYouTheHelper =  post?.helper?._id === user?._id
  
    let isThereAnotherHelper = post?.helper && !areYouTheHelper
  

    const help = (val) => (event) => {
      setLoading(true)
      actions.helpUser({post, help:val}).then(res => {
        if(res) { 
            setHelped(val);
        }
        
        if(val)
          setIsOpen(true);
  
        setLoading(false)

      }).catch(err => console.error(err))
  
    }
  
    // useEffect(() => {
    // },[helped]) 
    return (
      <div className="eachPost">

        { post?._id ?  //check if post 
            areTheyBeingHelped ?  //check if being helped
            <button disabled={isThereAnotherHelper || yours || !user?._id || loading} onClick={help(false)}><span>🛑</span></button>
            :
            <button disabled={isThereAnotherHelper || yours || !user?._id || loading} onClick={help(true)}><span>👍</span></button>
            
         : 'no post' }
       
        <Scheduler modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} user={user} post={post}/>
  
      </div>
    );
  };
  

  export default EachPost