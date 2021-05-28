import React from 'react';
import AllPosts from '../../components/all-posts/all-posts.component';

class Posts extends React.Component {
    constructor(){
        super();

        this.state = {
            posts: []
        }
    }

     componentDidMount() {
         if(!localStorage.getItem('posts')){
             fetch('https://jsonplaceholder.typicode.com/posts')
                 .then(response => response.json())
                 .then(result => this.setState({ posts: result }, () => {
                   
                         localStorage.setItem('posts', JSON.stringify(this.state.posts))
                     
                 }))
                 .catch(err => console.err(err));
         }else{
             let allPosts = localStorage.getItem('posts')
             this.setState({posts: JSON.parse(allPosts)})
         }
        

           
    }

    render() {
        return (
            <h1>All Posts
            
           <AllPosts posts={this.state.posts}/>
            </h1>

        )
    }
}

export default Posts;