import './App.css';
import Post from './Post';

function App() {
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
      <Post />
    </div>
  );
}

export default App;
