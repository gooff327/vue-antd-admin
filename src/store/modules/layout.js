const layout = {
    state: {
        menus: [
            {
                name: 'Dashboard',
                path: '/dashboard',
                component: () => import('@/views/Dashboard'),
                meta: {
                    icon: 'dashboard',
                    role: [1, 2, 3, 4, 5, 6]
                },
            },
            {
                name: 'Table',
                path: '/table',
                component: () => import('@/views/Table'),
                meta: {
                    icon: 'table',
                    role: [1, 2, 3, 4, 5, 6]
                },
                children: [
                    {
                        name: 'Users',
                        path: 'users',
                        component: () => import('@/views/Users'),
                        meta: {
                            icon: 'idcard',
                            role: [1, 2, 3, 4, 5, 6]
                        },
                    }
                ]
            },
            {
                name: 'Tool',
                path: '/tool',
                component: () => import('@/views/Tool'),
                meta: {
                    icon: 'tool',
                    role: [1, 2, 3, 4, 5, 6]
                },
                children: [
                    {
                    name: 'Notes',
                    path: 'notes',
                    component: () => import('@/views/Notes'),
                    meta: {
                        icon: 'book',
                        role: [1, 2, 3, 4, 5, 6]
                    },
                }
                ]
            },
            {
                name: 'Permission',
                path: '/permission',
                component: () => import('@/views/Permission'),
                meta: {
                    icon: 'team',
                    role: [1, 2, 3, 4, 5, 6]
                },
            },
        ]

    },
    mutations: {
        UPDATE_MENUS: (state, menus) => {
            state.menus = menus
        }
    },
    actions: {
        initMenus: ({commit}) => {
            const tmp = JSON.parse(localStorage.getItem('menus'));
            if (tmp !== undefined) {
                commit('UPDATE_MENUS', tmp)
            }
        },

        changeMenus: ({commit}, menus) => {
            localStorage.setItem('menus', JSON.stringify(menus));
            commit('UPDATE_MENUS', menus)
        }
    }
};
export default layout
