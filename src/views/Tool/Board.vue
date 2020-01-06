<template>
    <section class="board-wrapper">
        <h1>Board</h1>
        <a-row :gutter="40">
            <a-col :span="8" class="board">
                <a-alert message="ON HOLD" type="error" />
                <div class="b-content">
                    <vue-draggable class="list-group" v-bind="dragProps" v-model="dataOnHold" :move="onMove">
                        <li @mouseout="clearDelete" @mouseover="handleClick('onHold', index)" class="content" v-for="(item,index) of dataOnHold" :key="index">
                            <p>{{item.content}}</p>
                            <a-icon @click="deleteItem('dataOnHold', index)" :class="showDelete['onHold'][index] === true? 'show delete-icon' : 'hide delete-icon'" type="delete"/>
                        </li>
                    </vue-draggable>
                </div>
            </a-col>
            <a-col :span="8" class="board">
                <a-alert message="IN PROGRESS" type="info" />
                <div class="b-content">
                    <vue-draggable class="list-group" v-bind="dragProps" v-model="dataInProgress" :move="onMove">
                        <li @mouseout="clearDelete" @mouseover="handleClick('inProgress', index)" class="content" v-for="(item,index) of dataInProgress" :key="index">
                            <p>{{item.content}}</p>
                            <a-icon @click="deleteItem('dataInProgress', index)" :class="showDelete['inProgress'][index] === true? 'show delete-icon' : 'hide delete-icon'" type="delete"/>
                        </li>
                    </vue-draggable>
                </div>
            </a-col>
            <a-col :span="8" class="board">
                <a-alert message="DONE" type="success" />
                <div class="b-content">
                    <vue-draggable class="list-group" v-bind="dragProps" v-model="dataDone" :move="onMove">
                        <li @mouseout="clearDelete" @mouseover="handleClick('done', index)" class="content" v-for="(item,index) of dataDone" :key="index">
                            <p>{{item.content}}</p>
                            <a-icon @click="deleteItem('dataDone', index)" :class="showDelete['done'][index] === true? 'show delete-icon' : 'hide delete-icon'" type="delete"/>
                        </li>
                    </vue-draggable>
                </div>
            </a-col>
        </a-row>
        <a-progress type="line" :percent="percent"/>

        <a-tooltip :visible="!visible" placement="right">
            <template slot="title">
                Add Item
            </template>
            <a-popover title="Add Item" trigger="click" v-model="visible">
                <template slot="content">
                    <a-input-search placeholder="Insert your task" @search="addItem" v-model="item.content">
                        <a-button @click="addItem" @keydown.enter="addItem" icon="check" size="small" slot="enterButton"/>
                    </a-input-search>
                </template>
                <a-button size="large" type="primary" icon="plus" class="add-button" shape="circle"/>
            </a-popover>
        </a-tooltip>
    </section>
</template>

<script>
    export default {
        name: "Board",
        data () {
            return {
                showDelete: {
                    onHold: {

                    }
                },
                item: {
                    content: ''
                },
                dataOnHold: [
                    {
                        content: '提交所有代码',
                    },
                    {
                        content: '整理学习笔记',
                    },
                    {
                        content: '好好吃饭',
                    },
                ],
                visible: false,
                dataInProgress: [],
                dataDone: [],
                dragProps: {
                    animation: 300,
                    group: "description",
                }
            }
        },
        computed: {
          percent () {
              return Math.round(this.dataDone.length / (this.dataOnHold.length + this.dataInProgress.length + this.dataDone.length) * 100)
          }
        },
        methods: {
            handleClick(kind, index) {
                this.showDelete = Object.assign({}, this.showDelete, {onHold: {}, inProgress: {}, done: {}}, {[kind]: {[index]: true}});
            },
            clearDelete () {
                this.showDelete = Object.assign({}, this.showDelete, {onHold: {}, inProgress: {}, done: {}});
            },
            deleteItem (data, index) {
                this[data].splice(index, 1);
                this.$message.success('Item deleted!');
            },
            addItem () {
                if (this.item.content === ''){
                    this.$message.error('Please submit valid content');
                    return
                }
                this.dataOnHold.push(Object.assign({}, this.item));
                this.$message.success(`Add item success!`);
                this.$set(this.item, 'content', '');
            },
            onMove({ relatedContext, draggedContext }) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (
                    (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
                );
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .board-wrapper
        h1
            font-family "Comic Sans MS"
            color lightcoral
        .list-leave-active
            display:none!important;
        .list-enter-active
            transition all .3s
        .list-enter, .list-leave-to
            opacity 0
            transform translateY(30px)
        .b-content
            padding-bottom 6px
            background-color rgba(221,221,221,0.25)
            border-bottom-left-radius 8px
            border-bottom-right-radius 8px
            .list-group
                min-height 60vh
                width 100%
                padding 10px
                overflow scroll
                overflow: -moz-scrollbars-none;
                -ms-overflow-style: none;
                &::-webkit-scrollbar
                    width 0 !important
            .content
                position relative
                display block
                background-color white
                border 1px solid #ddd
                margin-bottom 10px
                cursor move
                border-radius 6px
                p
                    padding 10px 0
                    margin  0
        .add-button
            position fixed
            bottom 100px
            right 180px
        .delete-icon
            position absolute
            color #f5222d
            right 15px
            top 12px
            width 20px
            height 20px
            font-size 16px
            display inline-block
            cursor pointer
            transition .3s
        .show
            visibility visible
            opacity 1
            transform scale(1.2)
        .hide
            visibility hidden
            opacity 0
            transform scale(0.2)
</style>
