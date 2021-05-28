import React from 'react';
import './post-view.styles.css';
import { ReactComponent as User } from '../../assets/undraw_female_avatar_w3jk.svg';
import { AiFillEdit as EditIcon } from 'react-icons/ai';
import { withRouter } from 'react-router-dom';


const API_URL = 'https://jsonplaceholder.typicode.com/';

class PostView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
            user: {},
            comments: []

        }
    }

    componentDidMount() {

        /*fetch(`${API_URL}posts/${this.props.match.params.postid}`)
            .then(response => response.json()).then(result => {
                this.setState({ post: result })
                fetch(`${API_URL}users/${this.state.post.userId}`)
                    .then(response => response.json()).then(result => this.setState({ user: result })).catch((err) => console.err(err));



                fetch(`${API_URL}comments?postId=${this.state.post.id}`)
                    .then(response => response.json()).then(result => this.setState({ comments: result })).catch((err) => console.err(err));


            }).catch(err => console.log(err)); */
        if (localStorage.getItem('posts')) {
            let storagePosts = localStorage.getItem('posts');
            let allPosts = JSON.parse(storagePosts)

            let posts = allPosts.filter(item => item.id == (this.props.match.params.postid))
            console.log(posts[0].userId)
            this.setState({ post: posts[0] }, () => {
                fetch(`${API_URL}users/${posts[0].userId}`)
                    .then(response => response.json()).then(result => this.setState({ user: result })).catch((err) => console.log(err));
                if (posts[0].id < 100) {
                    fetch(`${API_URL}comments?postId=${posts[0].id}`)
                        .then(response => response.json()).then(result => this.setState({ comments: result })).catch((err) => console.err(err));
                }

            })
        } else {
            console.log('props', this.props)
            this.props.history.replace('/posts')
        }


    }


    render() {
        const { history } = this.props
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className=" ">


                            <User style={{ width: '10%', height: '30%', borderRadius: '50%' }} />
                            <div className="  user-info pt-3 mt-2">

                                <p>Name : {this.state.user.name}</p>
                                <p>Username : {this.state.user.username}</p>
                                <p>Website : {this.state.user.website}</p>
                                <p>Phone : {this.state.user.phone}</p>
                                <p>Email : {this.state.user.email}</p>

                            </div>

                        </div>
                    </div>
                    <hr />
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="container">
                            <div className="row post-body">
                                <h1 className="text-left "><b>{this.state.post.title}</b>

                                    <EditIcon style={{ cursor: 'pointer' }} onClick={() =>


                                        history.replace(`/post/edit/${this.state.post.id}`)} />

                                </h1>

                                <img src='https://picsum.photos/600/200?blur' alt='pic' />
                                <p className="text-muted">{this.state.post.title}</p>

                                <p className="text-left " >{this.state.post.body}</p>
                                {this.state.comments.length ?
                                    <div className="accordion" id="accordionExample">
                                        <div className="">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0 text-left">
                                                    <span aria-expanded="true" aria-controls="collapseOne">
                                                        Comments
                                                </span>
                                                </h5>
                                            </div>
                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                {
                                                    this.state.comments.map(comment => (
                                                        <div key={comment.id} className="card-body comments text-left mt-2">
                                                            <h4>{comment.name}</h4>
                                                            <p className="text-muted">By: {comment.email}</p>
                                                            {comment.body}
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </div> : <div style={{ color: 'purple', fontSize: '3rem' }}>No Comments to Display</div>}


                            </div>
                        </div>
                        <div >

                        </div>

                        <div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(PostView);