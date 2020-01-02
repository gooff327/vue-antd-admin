<template>
    <section class="board-wrapper">
        <h1>Board</h1>
        <a-progress type="line" :percent="percent"/>
        <a-row :gutter="20">
            <a-col :span="8" class="board">
                <a-alert message="ON HOLD" type="error" />
                <div class="b-content">
                    <vue-draggable class="list-group" v-bind="dragProps" v-model="dataOnHold" :move="onMove">
                        <li class="content" v-for="(item,index) of dataOnHold" :key="index">
                            <p>{{item.content}}</p>
                        </li>
                    </vue-draggable>
                </div>
            </a-col>
            <a-col :span="8" class="board">
                <a-alert message="IN PROGRESS" type="info" />
                <div class="b-content">
                    <vue-draggable class="list-group" v-bind="dragProps" v-model="dataInProgress" :move="onMove">
                        <li class="content" v-for="(item,index) of dataInProgress" :key="index">
                            <p>{{item.content}}</p>
                        </li>
                    </vue-draggable>
                </div>
            </a-col>
            <a-col :span="8" class="board">
                <a-alert message="DONE" type="success" />
                <div class="b-content">
                    <vue-draggable class="list-group" v-bind="dragProps" v-model="dataDone" :move="onMove">
                        <li class="content" v-for="(item,index) of dataDone" :key="index">
                            <p>{{item.content}}</p>
                        </li>
                    </vue-draggable>
                </div>
            </a-col>
        </a-row>
        <a-tooltip placement="right" trigger="hover">
            <template slot="title">
                Add Item
            </template>
            <a-button size="large" type="primary" icon="plus" class="add-button" shape="circle"/>
        </a-tooltip>
    </section>
</template>

<script>
    export default {
        name: "Board",
        data () {
            return {
                dataOnHold: [
                    {
                        content: 'test1',
                    },
                    {
                        content: 'test2',
                    },
                    {
                        content: 'test3',
                    },
                ],
                dataInProgress: [],
                dataDone: [],
                dragProps: {
                    animation: 0,
                    group: "description",
                    ghostClass: "ghost"
                }
            }
        },
        computed: {
          percent () {
              return Math.round(this.dataDone.length / (this.dataOnHold.length + this.dataInProgress.length + this.dataDone.length) * 100)
          }
        },
        methods: {
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
        .b-content
            padding-bottom 6px
            background-color #ddd
            border-bottom-left-radius 8px
            border-bottom-right-radius 8px
            .content
                display block
                background-color white
                border 1px solid #ddd
                margin-top -1px
                cursor move
                p
                    padding 10px 0
                    margin  0
        .add-button
            position fixed
            bottom 100px
            right 140px
</style>
