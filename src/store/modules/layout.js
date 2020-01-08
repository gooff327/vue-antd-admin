import {resetRouter} from "../../router";
import router from "../../router";
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(roles)
    } else {
        return true
    }
}

function filterAsyncRoutes(routes, roles) {
    const res = [];
    routes.forEach(route => {
        const tmp = {...route};

        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    });

    return res
}

const layout = {
    state: {
        base: [
            {
                name: 'Dashboard',
                path: '/dashboard',
                component: () => import('@/views/Dashboard/index'),
                meta: {
                    icon: 'dashboard',
                    roles: [1, 2, 3, 4, 5, 6]
                },
            },
            {
                name: 'Table',
                path: '/table',
                component: () => import('@/views/Table/index'),
                meta: {
                    icon: 'table',
                    roles: [1, 2, 3, 4, 5, 6]
                },
                children: [
                    {
                        name: 'Users',
                        path: 'users',
                        component: () => import('@/views/Table/Users'),
                        meta: {
                            icon: 'idcard',
                            roles: [1, 2, 3, 4, 5, 6]
                        },
                    }
                ]
            },
            {
                name: 'Article',
                path: '/article',
                component: () => import('@/views/Article/index'),
                meta: {
                    icon: 'file-markdown',
                    roles: [1, 2, 3, 4, 5, 6]
                },
                children: [
                    {
                        name: 'Posts',
                        path: 'posts',
                        component: () => import('@/views/Article/Posts'),
                        meta: {
                            icon: 'file-protect',
                            roles: [1, 2, 3, 4, 5, 6]
                        },
                    },
                    {
                        name: 'Editor',
                        path: 'editor',
                        component: () => import('@/views/Article/Editor'),
                        meta: {
                            icon: 'edit',
                            roles: [1, 2, 3, 4, 5, 6]
                        },
                    }
                ]
            },
            {
                name: 'Tool',
                path: '/tool',
                component: () => import('@/views/Tool/index'),
                meta: {
                    icon: 'tool',
                    roles: [1, 2, 3, 4, 5, 6]
                },
                children: [
                    {
                        name: 'Notes',
                        path: 'notes',
                        component: () => import('@/views/Tool/Notes'),
                        meta: {
                            icon: 'book',
                            roles: [1, 2, 3, 4, 5, 6]
                        },
                    },
                    {
                        name: 'Board',
                        path: 'board',
                        component: () => import('@/views/Tool/Board'),
                        meta: {
                            icon: 'project',
                            roles: [1, 2, 3, 4, 5, 6]
                        },
                    },
                ]
            },
            {
                name: 'Permission',
                path: '/permission',
                component: () => import('@/views/Permission/index'),
                meta: {
                    icon: 'team',
                    roles: [1, 2, 3, 4, 5, 6]
                },
            }
        ],
        menus: []
    },
    mutations: {
        UPDATE_MENUS: (state, menus) => {
            state.menus = menus
        }
    },
    actions: {
        initMenus: ({commit, state}) => {
            const tmp = filterAsyncRoutes(state.base, 1);
            if (tmp !== undefined) {
                commit('UPDATE_MENUS', tmp)
            }
        },

        changeMenus: ({commit}, menus) => {
            commit('UPDATE_MENUS', menus);
            resetRouter();
            router.push('/')
        }
    }
};
export default layout
