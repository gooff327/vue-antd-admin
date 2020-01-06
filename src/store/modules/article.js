const article = {
    state: {
        posts: [],
        draft: '',
        editCursor: 0,
        draftCopy: '',
    },
    mutations: {
        SET_POSTS: (state, posts) => {
            state.posts = posts
        },
        SET_DRAFT: (state, draft) => {
            state.draft = draft
        },
        APPEND_POST: (state, post) => {
            state.posts === null ? state.posts.push(post) : state.posts.unshift(post)
        },
        DELETE_POST: (state, index) => {
            state.posts.splice(index, 1)
        },
        DELETE_DRAFT: (state) => {
            state.draft = {}
        },
        UPDATE_DRAFT: (state, draft) => {
            state.draft = draft
        },
        REPLACE_POST: (state, post) => {
            state.posts.splice(state.editCursor, 1, post)
        },
        SAVE_POSTS_TO_LOCAL: (state) => {
            localStorage.setItem('posts', JSON.stringify(state.posts))
        },
        SAVE_DRAFT_TO_LOCAL: (state) => {
            localStorage.setItem('draft', JSON.stringify(state.draft))
        },
        SET_CURSOR: (state, index) => {
            state.editCursor = index
        },
        COPY_DRAFT: (state) => {
            state.draftCopy = state.draft
        }
    },
    actions: {
        initArticle: ({commit}, {posts = [], draft= ''}) => {
            posts === null ? posts = [] : undefined;
            draft === null ? draft = '' : undefined;
            commit('SET_POSTS', posts);
            commit('SET_DRAFT', draft)
        },
        beforeEdit:({commit,state}, index) => {
            commit('SET_CURSOR', index);
            commit('COPY_DRAFT');
            commit('SET_DRAFT', state.posts[state.editCursor])
        },
        updatePosts: ({commit}, {action='new', post='', index=0}) => {
            switch (action) {
                case "new":
                    commit('APPEND_POST', post);
                    break;
                case "delete":
                    commit('DELETE_POST', index);
                    break;
                case "update":
                    commit('REPLACE_POST', post);
                    break;
            }
            commit('SAVE_POSTS_TO_LOCAL')
        },
        updateDraft: ({commit}, {action, draft}) => {
            if (action === 'update') {
                commit('UPDATE_DRAFT', draft)
            } else {
                commit('DELETE_DRAFT')
            }
            commit('SAVE_DRAFT_TO_LOCAL')
        }
    }
}
export default article
