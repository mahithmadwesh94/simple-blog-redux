import * as redux from 'redux';

//initialvalues
const initialValues = {
    allPosts: []
}



//Action
export const CREATEPOST = 'createPost';
export const SETALLPOSTS = 'getAllPosts';
export const UPDATEPOST = 'updatePost';
export const DELETEPOST = 'getPost';


//Reducer
const postsReducer = (state = initialValues, action) => {
    switch (action.type) {
        case CREATEPOST: {
            let arr = [...state.allPosts];
            arr.push({ ...action.post, id: state.allPosts.length + 1 });
            return { ...state, allPosts: arr }
        }

        case SETALLPOSTS: {
            return { ...state, allPosts: action.posts }
        }

        case UPDATEPOST: {
            let post = action.post;
            for (let i = 0; i < state.allPosts.length; i++) {
                if (state.allPosts[i].id === post.id) {
                    // delete allPosts[i];
                    // allPosts.splice(0, 0, post)
                    state.allPosts[i] = post;
                    return state;
                }
            }
            return false;
        }

        case DELETEPOST: {
            for (let i = 0; i < state.allPosts.length; i++) {

                if (state.allPosts[i].id === action.postId) {
                    state.allPosts.splice(i, 1);
                    return state;
                }
            }
            return false;
        }

        default: {
            return state;
        }
    }

}



//store
export const store = redux.createStore(postsReducer);