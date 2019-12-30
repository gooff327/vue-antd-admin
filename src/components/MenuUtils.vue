<script>
    export default {
        name: "MenuUtils",
        props: {
            menus: { require: true }
        },
        render: function (h) {
            function generate(menu, context) {
                if (menu.hasOwnProperty('children')) {
                    return h('a-sub-menu', {
                        props: {
                            key: menu.name,
                            icon: menu.meta.icon
                        },
                        on: {
                            click: () => {
                                if (context.$route.path !== menu.path) {
                                    context.$router.push(menu.path)
                                }                            }
                        },
                        scopedSlots: {
                            title: () => h('span', [
                                h('a-icon', {
                                    props: {
                                        type: menu.meta.icon
                                    }
                                }),
                                h('span', menu.name)
                            ])
                        }
                        },
                        menu.children.map(i => generate(i)))
                } else {
                    return h('a-menu-item', {
                        props: {
                            key: menu.name
                        },
                        on: {
                            click: () => {
                                if (context.$route.path !== menu.path) {
                                    context.$router.push(menu.path)
                                }
                            }
                        },
                        },
                        [
                            h('a-icon', { props: {type: menu.meta.icon} }),
                            h('span', menu.name)
                        ])
                }
            }
            return h('a-menu', { props:{theme:"dark", mode:"inline", defaultSelectedKeys: ['Dashboard']}}, this.menus.map(menu => generate(menu, this)))

        },
    }
</script>

<style scoped>

</style>
