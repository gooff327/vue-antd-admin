<template>
<section class="posts-wrapper">
    <h1>Posts</h1>
    <a-row type="flex" justify="center" :gutter="40">
        <a-col ref="wrapper" @mouseenter="handleEnter(index)" @mouseleave="handleLeave(index)" class="items-wrapper" :span="6" v-for="(item, index) of $store.getters.posts" :key="index">
            <transition name="slide-fade">
                <div v-if="toolbarVisible[index]" class="toolbar">
                    <a-button-group>
                        <a-button @click="handleEdit(index)" icon="edit" type="info"/>
                        <a-button @click="handleDelete(index)" icon="delete" type="danger"/>
                        <a-button @click="handleFullScreen(index)" :icon="fullscreenState ? 'fullscreen-exit' : 'fullscreen'" type="info"/>
                    </a-button-group>
                </div>
            </transition>
            <mavon-editor :subfield="false" :toolbarsFlag="false" defaultOpen="preview" id="editor" ref="editor" :value="item"/>
        </a-col>
    </a-row>
</section>
</template>

<script>
    export default {
        name: "Posts",
        data () {
            return {
                toolbarVisible: {},
                fullscreenState: false,
            }
        },
        async mounted() {
            await this.$nextTick();
            document.addEventListener('fullscreenchange', () => {
                this.fullscreenState = !this.fullscreenState
            }, false);
        },
        methods: {
            handleEnter (index) {
                this.$set(this.toolbarVisible, index, true)
            },
            handleLeave (index) {
                this.$set(this.toolbarVisible, index, false)
            },
            handleEdit (index) {
                this.$store.dispatch("beforeEdit", index);
                this.$router.push({name: 'Editor'});
            },
            handleDelete (index) {
                this.$store.dispatch("updatePosts", {action: 'delete', index: index})
            },
            handleFullScreen(index) {
                if (!this.fullscreenState){
                    this.$refs['wrapper'][index].$el.requestFullscreen();
                }
                else {
                    document.exitFullscreen();
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .posts-wrapper
        .slide-fade-enter-active
            transition: all .3s ease;
        .slide-fade-leave-active
            transition: all .3s ease;
        .slide-fade-enter, .slide-fade-leave-to
            transform translateX(10px)
            opacity 0
        h1
            font-family "Comic Sans MS"
            color lightcoral
        .items-wrapper
            min-height 56.25vh
            height 56.25vh

            .toolbar
                position absolute
                right 10%
                top 10px
                z-index 9999
            #editor
                min-height 100%
                height 100%

</style>
