import React, { useState } from 'react';
import './all-posts.styles.css';
import { useHistory } from 'react-router-dom';
import { RiDeleteBin6Fill as Delete } from 'react-icons/ri';
import { AiFillEye as ViewIcon } from 'react-icons/ai';
import { Modal, Button } from 'react-bootstrap';
import { store, DELETEPOST } from '../../redux/store';


const Example = ({ showModal, showHandler, cancelHandler, saveHandler }) => {


    return (
        <div>

            <Modal show={showModal} onHide={cancelHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Delete this post?<div> This Action cannot be reversed </div></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelHandler}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={saveHandler}>
                        Delete Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

const AllPosts = ({ posts }) => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [postId, setPostId] = useState(0)
    const handleClose = () => setShow(false)
    const handleShow = (event) => {
        setShow(true)
        setPostId(parseInt(event.currentTarget.id))
    }

    const saveHandler = (event) => {
        event.preventDefault();
        // let storedPosts = localStorage.getItem('posts');
        // let allPosts = JSON.parse(storedPosts);

        // for (let i = 0; i < allPosts.length; i++) {

        //     if (allPosts[i].id === postId) {
        //         allPosts.splice(i, 1)
        //     }
        // }
        // localStorage.clear()
        // localStorage.setItem('posts', JSON.stringify(allPosts));
        store.dispatch({ type: DELETEPOST, postId: postId });
        handleClose();
        // history.go(0)


    }


    return (
        <div className="posts-page">
            <Example showModal={show} showHandler={handleShow} cancelHandler={handleClose} saveHandler={saveHandler} />
            <div>
                <button className="btn btn-success float-right mb-3" onClick={() => history.replace('/post/createPost')}>Add Post</button>
            </div>
            <table className="table table-hover table-borderless">
                <tbody>
                    {
                        posts.map(post => (
                            <tr className=" row-content" key={post.id} >
                                <td className="ms-3 ps-3">
                                </td>
                                <td className="text-start"> <h1>{post.title ? post.title : 'Test'}</h1>
                                    <p>{post.body}</p>
                                </td>

                                <td id={post.id} onClick={(event) => handleShow(event)}><Delete style={{ color: 'red', cursor: 'pointer', width: '100px', height: '40px' }} /></td>

                                <td><ViewIcon style={{ cursor: 'pointer', width: '100px', height: '40px' }} onClick={() => history.push(`/posts/${post.id}`)} /></td>

                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}


export default AllPosts;
