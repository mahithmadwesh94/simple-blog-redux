
import './App.css';
import Header from './components/header/header.component';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/home/home.component';
import About from './pages/about/about.compoent';
import Posts from './pages/posts/posts.component';
import PostView from './components/post-view/post-view.component';
import PostEdit from './components/post-edit/post-edit.component';


function App() {
  return (

    <div className="App ">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:postid" component={PostView} />
          <Route exact path="/post/edit/:postid" component={PostEdit} />
          <Route exact path="/post/createpost" component={PostEdit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
