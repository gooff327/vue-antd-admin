<script>
    export default {
        name: "MenuUtils",
        props: {
            menus: { require: true }
        },
        render: function (h) {
            function generate(menu) {
                if (menu.hasOwnProperty('children')) {
                    return h('a-sub-menu', {
                        props: {
                            key: menu.name, icon: menu.icon
                        },
                        scopedSlots: {
                            title: () => h('span', [
                                h('a-icon', {
                                    props: {
                                        type: menu.icon
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
                        }
                        },
                        [
                            h('a-icon', { props: {type: menu.icon} }),
                            h('span', menu.name)
                        ])
                }
            }
            return h('a-menu', { props:{theme:"dark", mode:"inline"}, defaultSelectedKeys: [this.menus[0].name]}, this.menus.map(menu => generate(menu)))

        },
    }
</script>

<style scoped>

</style>
