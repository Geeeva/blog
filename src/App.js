import {useState, useContext, useEffect} from "react";
import {postContext} from './store/PostContext';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from "./app/Home";
import Post from "./app/Post";
import AddPost from "./app/AddPost";
import logo from "./assets/images/logo.jpg";

const App = () => {
  const initialState = useContext(postContext);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getResults();
    },[]);

    const getResults =() => {
        setLoading(true);
        fetch("https://blog-d8b04-default-rtdb.europe-west1.firebasedatabase.app/posts.json")
            .then(response => response.json())
            .then(data => {setPosts(data); setLoading(false);});
    }

    const postsArr = [];
  return (
      <postContext.Provider value={postsArr}>
          <Router>
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"><Link to="/"><img className="logo" src={logo} alt="logo"/></Link></div>
                        <div className="col-md-10 button-wrapper"><Link to={'/add-post'} ><div className="add-button">add post</div></Link></div>
                    </div>
                </div>
                <Switch>
                    <Route  path="/" exact strict component={Home} />
                    <Route  path="/post/:postId" exact strict component={Post} />
                    <Route  path="/add-post" exact strict component={AddPost} />
                </Switch>
            </div>
        </Router>
    </postContext.Provider>
  );
}

export default App;
