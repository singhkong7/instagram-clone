import React,{useState,useEffect} from "react";
import './App.css';
import db from "./firebase";
import Post from './Post';

function App() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })));
    })
  },[]);
  return (
    <div className="app">
      <div className="app_ header">
        <img
          className="app_header_image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
          alt=" " 
        />
      </div>
      <h1>Hello Instagram</h1>
      {
        posts.map(({id,post}) => (
          <Post key={id} username={post.username} caption={post.caption} image={post.image} />
        ))
      }
      
    </div>
  );
}

export default App;
