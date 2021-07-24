import { ErrorMessage, Field, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import './post-edit.styles.css';
import { useHistory } from 'react-router-dom';
import { store, UPDATEPOST, CREATEPOST } from '../../redux/store';


const API_URL = 'https://jsonplaceholder.typicode.com/'

const DisableForm = ({ values, username }) => {
    return (
        <Field as="select" className=" custom-select" name="userId" disabled={true}>
            <option value={values.userId}>{username}</option>
        </Field>
    )
}

const SelectForm = ({ values, users }) => {
    return (
        <Field as="select" className="form-control custom-select" value={values.userId} name="userId">
            <option></option>
            {
                users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))
            }
        </Field>
    )
}

const PostEdit = (props) => {
    const history = useHistory();
    const [post, setpost] = useState({})
    const [users, setUser] = useState([])
    const [postLength, setLength] = useState(0)


    useEffect(() => {

        if (!props.location.pathname.includes('createPost')) {
            if (store.getState().allPosts.length) {
                let allPosts = store.getState().allPosts

                let posts = allPosts.filter(item => item.id == props.match.params.postid)
                setpost(posts[0])
                fetch(`${API_URL}users/${posts[0].userId}`)
                    .then(response => response.json()).then(result => setUser(result)).catch((err) => console.log(err));

            } else {
                this.props.history.replace('/posts')
            }
        } else {
            if (store.getState().allPosts.length) {

                setLength(store.getState().allPosts.length)

            }
            fetch(`${API_URL}users/`)
                .then(response => response.json()).then(result => setUser(result)).catch((err) => console.log(err));
        }


    }, [props])

    const handleUpdate = (event, values) => {
        event.preventDefault();
        fetch(`${API_URL}posts/${values.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: values.id,
                title: values.title,
                body: values.body,
                userId: values.userId
            }), headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => response.json()).then(result => UpdateLocalStorage(result, 'update')).catch(err => console.log(err))
    }

    const handleCreate = (event, values) => {
        event.preventDefault();

        fetch(`${API_URL}posts/`, {
            method: 'POST',
            body: JSON.stringify({

                title: values.title,
                body: values.body,
                userId: parseInt(values.userId)
            }), headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => response.json()).then(result => UpdateLocalStorage(result, 'insert')).catch(err => console.log(err))
    }

    const UpdateLocalStorage = (post, action) => {
        // let storagePosts = localStorage.getItem('posts');
        // let allPosts = JSON.parse(storagePosts)

        if (action === 'update') {
            // for (let i = 0; i < allPosts.length; i++) {
            //     if (allPosts[i].id === post.id) {
            //         // delete allPosts[i];
            //         // allPosts.splice(0, 0, post)
            //         allPosts[i] = post;
            //         localStorage.clear();
            //         localStorage.setItem('posts', JSON.stringify(allPosts));
            //         
            //     }
            // }
            store.dispatch({ type: UPDATEPOST, post: post })
            history.replace('/posts')
        }

        if (action === 'insert') {
            post.id = postLength + 1;
            // allPosts.push(post);
            // localStorage.setItem('posts', JSON.stringify(allPosts));
            store.dispatch({ type: CREATEPOST, post: post });
            history.replace('/posts')

        }

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Formik enableReinitialize={true} initialValues={{
                    userId: post.userId ? post.userId : '',
                    id: post.id ? post.id : '',
                    title: post.title ? post.title : '',
                    body: post.body ? post.body : ''
                }}

                    validate={values => {
                        const errors = {}

                        if (!values.userId) {
                            errors.userId = 'UserId is required'
                        }



                        if (!values.id) {

                            errors.id = 'Post Id is required'

                            if (!props.match.path.includes('edit') && parseInt(values.id) < postLength) {
                                errors.id = `Id has to be greater ${postLength}. To update a post please click on edit icon`

                            }

                        }


                        if (!values.title) {
                            errors.title = 'Post Title is required'
                        }
                        if (!values.body) {
                            errors.body = 'Post Body is required'
                        }

                        return errors;
                    }
                    } >

                    {({ values }) => {
                        return (
                            <form>
                                <div className="form-group ">
                                    <div className="text-start">
                                        <h3> <label for="formGroupExampleInput">Username</label></h3>
                                    </div>
                                    {(props.match.path.includes('edit')) ? <DisableForm values={values} username={users.name} /> : <SelectForm values={values} users={users} />}

                                </div>

                                {(props.match.path.includes('edit')) ?
                                    <div className="form-group">
                                        <div className="text-start">
                                            <h3>  <label for="formGroupExampleInput">Post Id</label></h3>
                                        </div>
                                        <Field type="number" className="form-control" name='id' value={values.id} disabled={true}></Field>
                                    </div> : ''}

                                <div className="form-group">
                                    <div className="text-start">
                                        <h3>  <label for="formGroupExampleInput">Post Title</label></h3>
                                    </div>
                                    {(props.match.path.includes('edit')) ?

                                        <Field type="textarea" className="form-control" name='title' value={values.title} placeholder="Title..." disabled={false}></Field>
                                        : <div>
                                            <Field type="text" className="form-control" name='title' disabled={false}></Field>
                                            <ErrorMessage className="invalid-feedback" name='title' />
                                        </div>
                                    }
                                </div>

                                <div className="form-group">
                                    <div className="text-start">
                                        <h3>   <label for="formGroupExampleInput">Post Body</label></h3>
                                    </div>
                                    {(props.match.path.includes('edit')) ?




                                        <div>


                                            <Field name="body" value={values.body} className="form-control">
                                                {({ field, form, meta }) => (
                                                    <div>
                                                        <textarea type="text" {...field} disabled={false} style={{ width: '100%', height: '170px' }} placeholder="Body..." />
                                                        {meta.touched &&
                                                            meta.error && <div className="error">{meta.error}</div>}
                                                    </div>
                                                )}
                                            </Field>





                                        </div>
                                        /*  <Field type="textarea" rows="4" className="form-control" name='body' value={values.body} disabled={true}></Field> */

                                        : <div>
                                            {/* <Field type="textarea" className="form-control" name='body' disabled={false}></Field> */}

                                            <Field name="body" value={values.body} className="form-control">
                                                {({ field, form, meta }) => (
                                                    <div>
                                                        <textarea type="text" {...field} disabled={false} style={{ width: '100%', height: '170px' }} placeholder="Body..." />
                                                        {meta.touched &&
                                                            meta.error && <div className="error">{meta.error}</div>}
                                                    </div>
                                                )}
                                            </Field>

                                            {/* <ErrorMessage name='body' /> */}
                                        </div>}
                                </div>


                                <div className="form-group">

                                    {(props.match.path.includes('edit')) ? <button type="submit" className="btn btn-primary me-2" onClick={(event) => { handleUpdate(event, values) }}>Update</button> : <button type="submit" className="btn btn-primary me-2" onClick={(event) => handleCreate(event, values)}>Submit</button>}
                                    <button type="submit" className="btn btn-secondary" onClick={() => history.replace('/posts')}>Cancel</button>
                                </div>
                            </form>
                        )
                    }}
                </Formik>
            </div>
        </div >
    )
};

export default (PostEdit);