import React,{useState,useEffect} from "react";
import './App.css';
import{ db,auth }from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button,Input } from "@material-ui/core";
import Post from './Post';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    outline: 0, 
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  const classes=useStyles();
  const[modalStyle]=useState(getModalStyle);
  const [posts,setPosts]=useState([]);
  const[open,setOpen]=useState(false);
  const[openSignIn,setOpenSignIn]=useState(false)
  const[username,setUsername]=useState(" ");
  const[password,setPassword]=useState(" ");
  const[email,setEmail]=useState(" ");
  const[user,setUser]=useState(null);

useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser)
      {
        console.log(authUser);
        setUser(authUser);
        if(authUser.displayName)
        {

        }
        else
        {
          return authUser.updateProfile({
            displayName:username,
          });
        }
      }
      else
      {
        setUser(null);
      }

    })
    return(()=>{
      unsubscribe();
    })
},[user,username])


  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })));
    })
  },[]);
  const Signup=(event )=>
  {
      event.preventDefault();
      auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        return authUser.user.updateProfile({
          displayName:username
        })
      })
      .catch((error)=>alert(error.message))
      setOpen(false);
  }
  const SignIn=(event)=>
  {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false)
  }
  return (
    <div className="app">
      <Modal open={open} onClose={()=>setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_form">
            <center>
              <img
                className="app_header_image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                alt=" " 
              />
            </center>
            <Input 
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <Input 
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type="submit"  onClick={Signup}>Sign Up</Button>

          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={()=>setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_form">
            <center>
              <img
                className="app_header_image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                alt=" " 
              />
            </center>
            <Input 
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Input 
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type="submit"  onClick={SignIn}>Sign In</Button>

          </form>
        </div>
      </Modal>
      <div className="app_header">
        <img
          className="app_header_image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
          alt=" " 
        />
      </div>
      {
        user ? (
          <Button  onClick={()=>auth.signOut()}>Logout</Button>
        ):(
          <div className="app_loginContainer">
            <Button  onClick={()=>setOpenSignIn(true)}>Sign In</Button>
            <Button  onClick={()=>setOpen(true)}>Sign Up</Button>
          </div>
        )
      }
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
