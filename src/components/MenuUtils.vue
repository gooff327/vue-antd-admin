<script>
    export default {
        name: "MenuUtils",
        props: {
            menus: { require: true }
        },
        mounted() {
            this.$refs['menu'].$el.children[0].click()
        },
        render: function (h) {
            function generate(menu, context) {
                if (menu.hasOwnProperty('children')) {
                    return h('a-sub-menu', {
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
                        props: {
                            icon: menu.meta.icon
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
            return h('a-menu', { ref: 'menu', props:{theme:"dark", mode:"inline"}}, this.menus.map(menu => generate(menu, this)))
        },
    }
</script>

<style scoped>

</style>
