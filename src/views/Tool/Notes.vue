<template>
    <section class="notes-wrapper">
        <h1>Notes</h1>
        <div v-masonry origin-left="true" transition-duration="0.2s" item-selector=".item">
            <div class="item">
                <div class="toolbar">
                    <a-icon @click="addItem" type="check-circle" class="action-btn check"/>
                </div>
                <p class="tips">NEW NOTE</p>
                <p class="item__title">
                    <a-input placeholder="TITLE" v-model="item.title"/>
                </p>
                <p class="item__content">
                    <a-textarea :rows="4"  placeholder="CONTENT" v-model="item.content"/>
                </p>
            </div>
            <div v-masonry-tile class="item" v-for="(item, index) in notes" :key="index">
                <a-icon @click="deleteItem(index)" class="action-btn close" type="close-circle"/>
                <p class="item__title">{{item.title}}</p>
                <p class="item__content">{{item.content}}</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Notes",
        data () {
            return {
                item: {
                    title: '',
                    content: ''
                },
                visible: false,
                notes: [
                    {
                        title: 'longTitleTest1234124adssa',
                        content: 'this is test content'
                    }
                    ,{
                        title: 'test',
                        content: 'this is test contentthis is test contentthis is test contentthis is test contentthis is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    },
                    {
                        title: 'test',
                        content: 'this is test content'
                    }
                ]
            }
        },
        methods: {
            addItem () {
                if (this.item.title === '') {
                    this.$message.error('You submit empty note, title is need');
                   return
                }
                this.notes.push(this.item);
                this.item = Object.assign({}, this.item, {title: '', content: ''});
                this.$message.success('Add note successful!')
            },
            deleteItem(index) {
                this.notes.splice(index, 1)
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .notes-wrapper
        h1
            font-family "Comic Sans MS"
            color lightcoral
        .tips
            font-weight bold
            font-size 18px
            font "Special Elite", cursive
            color #42b983
        .item
            width 300px
            margin 10px
            padding 10px 10px
            background-color #fff
            border-radius 4px
            border 2px solid #41bb83;
            box-shadow 3px 3px 0 0 rgba(95, 158, 160, 0.55)
            transition .6s
            &__title
                padding-bottom 6px
                font-weight bold
                font-size 18px
                border-bottom 2px dashed rgba(32,43,51,0.64)
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color rgba(32,43,51,0.64)
                .ant-input
                    border 0
            &__content
                font-size 16px
                font-family "Comic Sans MS"
                color rgba(32,43,51,0.64)
                .ant-input
                    border 0
            &:hover
                box-shadow 3px 3px 0 0 rgba(233,111,129,0.64)
        .action-btn
            position: absolute;
            right 6px;
            top 6px
            transition .3s
        .close:hover
            color #f5222d
            transform rotate(360deg) scale(1.5)
        .check:hover
            color #42b983
            transform rotate(10deg) scale(1.5)

</style>
