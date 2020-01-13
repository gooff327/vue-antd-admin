<template>
    <section class="editor-wrapper">
        <h1>Editor</h1>
        <mavon-editor @save="handleSave" id="editor" ref="editor" v-model="draft"/>
    </section>
</template>

<script>
    export default {
        name: "Editor",
        data() {
            return {
                draft: '',
                timer: null
            }
        },
        mounted() {
            this.draft = this.$store.getters.draft;
            this.editCursor = this.$store.getters.editCursor;
        },
        beforeDestroy() {
            clearTimeout(this.timer);
        },
        methods: {
            handleSave() {
                this.$refs['editor'].$el.style.zIndex = 0;
                if (this.editCursor !== -1) {
                    this.$store.dispatch('updatePosts', {action: 'update', post: this.draft});
                    this.$message.success('Post updated !', 2);
                    this.$store.dispatch("afterEdit");
                    this.timer = setTimeout(() => {
                        this.$router.back();
                    },1500);
                    return
                }
                this.$confirm({
                    title: 'Choose one operation types',
                    okText: 'save and post',
                    cancelText: 'save as draft',
                    onOk: () =>  {
                        this.$store.dispatch('updatePosts', {action: 'new', post: this.draft});
                        this.$message.success((h) => h('span',['Article posted! ', h('a', {on: {click: () => this.$router.push({name: 'Posts'})}}, 'view')]),2);
                    },
                    onCancel: () => {
                        this.$store.dispatch("updateDraft", {action: 'update', draft: this.draft});
                        this.$message.success('Draft saved!', 2)
                    }
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .editor-wrapper
        height 100%

        h1
            font-family "Comic Sans MS"
            color lightcoral

        #editor
            min-height 90%
</style>
