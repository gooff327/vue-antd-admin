<script>
    export default {
        name: "MenuUtils",
        props: {
            menus: { require: true },
            reorder: { default: false}
        },
        data () {
            return {
                openKeys: []
            }
        },
        mounted() {
            let { matched } = {...this.$route};
            if (matched.length > 2) {
                matched = matched.slice(1,-1);
                this.openKeys.push(...matched.map(item => item.name))
            }
        },
        render: function (h) {
            function generate(menu, context) {
                if (menu.hasOwnProperty('children')) {
                    return h('a-sub-menu', {
                            key: menu.name,
                            props: {
                            icon: menu.meta.icon
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
                        menu.children.map(i => generate(i, context)))
                } else {
                    return h('a-menu-item', {
                        key: menu.name,
                        props: {
                            icon: menu.meta.icon
                        },
                        on: {
                            click: () => {
                                if (context.$route.name !== menu.name) {
                                    context.$router.push({name: menu.name})
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
            return h('a-menu',
                {
                    on: { "update:openKeys": val => this.openKeys = val},
                    ref: 'menu',
                    props: {
                        theme:"dark",
                        mode:"inline",
                        selectedKeys: [`${this.$route.name}`],
                        defaultSelectedKeys: ['Dashboard'],
                        openKeys: this.openKeys
                    }
                },
                this.menus.map(menu => generate(menu, this)))
        },
    }
</script>

<style scoped>

</style>
