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
                draft: ''
            }
        },
        mounted() {
            this.draft = this.$store.getters.draft;
            this.editCursor = this.$store.getters.editCursor;
        },
        methods: {
            handleSave() {
                this.$refs['editor'].$el.style.zIndex = 0;
                if (this.editCursor !== 0) {
                    this.$store.dispatch('updatePosts', 'update', this.draft);
                    this.$message.success('Article update success');
                    return
                }
                this.$confirm({
                    title: 'Choose one operation types',
                    okText: 'save and post',
                    cancelText: 'save as draft',
                    onOk: () =>  {
                        this.$store.dispatch('updatePosts', {action: 'new', post: this.draft})
                    },
                    onCancel: () => {
                        this.$store.dispatch("updateDraft", {action: 'update', draft: this.draft})
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
