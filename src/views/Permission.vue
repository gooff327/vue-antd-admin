<template>
    <section class="permission-wrapper">
        <div class="steps-wrapper">
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
            </a-steps>
        </div>
        <div class="steps-content">
            <br>
            <a-alert :message="steps[current].content" :closable="false"/>
            <div class="card-wrapper" v-show="current === 0">
                <a-card v-for="user of userList" :key="user.id.value" hoverable style="width: 200px">
                    <img
                            alt="example"
                            :src="user.picture.large"
                            slot="cover"
                    />
                    <template class="ant-card-actions" slot="actions">
                        <a-checkbox @change="onCheckChange($event, user)"/>
                    </template>
                    <a-card-meta :title="user.name.first+','+user.name.last" :description= "user.login.username">
                    </a-card-meta>
                </a-card>
            </div>
            <div v-show="current === 1" class="tree-wrapper">
                <a-tree
                    checkable
                    v-model="checkedMenus"
                    :replaceFields="replaceFields"
                    :treeData="$store.getters.menus"
                />
            </div>
        </div>
        <div class="steps-action">
            <a-button v-if="current < steps.length - 1 && Object.keys(checkedUsers).length > 0" type="primary" @click="next">
                Next
            </a-button>
            <a-button
                    v-if="current === steps.length - 1"
                    type="primary"
                    @click="$message.success('Congratulations! All your change have submitted')"
            >
                Done
            </a-button>
            <a-button v-if="current>0" style="margin-left: 8px" @click="prev">
                Previous
            </a-button>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Permission",
        data () {
            return {
                current: 0,
                steps: [
                    {
                        title: 'First',
                        content: 'Choose users to Configure permission'
                    },
                    {
                        title: 'Second',
                        content: 'Configure available menu for selected users'
                    },
                    {
                        title: 'Last',
                        content: 'Please confirm your changes'
                    }
                ],
                userList: [],
                checkedUsers: {},
                checkedMenus: [],
                replaceFields: {
                    title: 'name',
                }
            }
        },
        mounted() {
            this.getUserList();
        },
        methods: {
            next () {
                this.current ++
            },
            prev () {
                this.current --
            },
            getUserList () {
                this.api.permission.fetchUserList({results: 10}).then(res => {
                    this.userList.push(...res.data.results)
                })
            },
            onCheckChange(event, user) {
                if (event.target.checked === true && !this.checkedUsers.hasOwnProperty(user.login.uuid)) {
                    this.$set(this.checkedUsers, `${user.login.uuid}`, user)
                } else if (event.target.checked === false && this.checkedUsers.hasOwnProperty(user.login.uuid)) {
                    this.$delete(this.checkedUsers, `${user.login.uuid}`)
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .permission-wrapper
        position: relative;
        .steps-wrapper
            display flex
            justify-content center
            align-items center
            .ant-steps
                flex 0

        .card-wrapper
            .ant-card
                float left
                margin 20px

        .steps-action
            position: absolute;
            right 0
            top 0
</style>
