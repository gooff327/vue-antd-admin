const getters =  {
    menus: state => state.layout.menus,
    users: state => state.user.users,
    posts: state => state.article.posts,
    draft: state => state.article.draft,
    editCursor: state => state.article.editCursor
};

export default getters
