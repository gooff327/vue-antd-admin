<template>
    <section>
        <div class="toolbar">
            <strong>Bordered <a-switch defaultChecked @change="bordered = !bordered"/></strong>
            <strong>Loading <a-switch @change="loading = !loading"/></strong>
            <strong>Header <a-switch @change="columnHeader = !columnHeader"/></strong>
            <strong>Footer <a-switch @change="footer = !footer"/></strong>
        </div>
        <br>
        <a-table
                :showHeader ="columnHeader"
                :columns="columns"
                :rowKey="record => record.login.uuid"
                :dataSource="tableData"
                :bordered="bordered"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
        >
            <template slot="name" slot-scope="name">
                {{name.first}} {{name.last}}
            </template>
            <template slot="dob" slot-scope="dob">
                {{dob.age}}
            </template>
            <template slot="city" slot-scope="location">
                {{location.city}}
            </template>
            <template slot="state" slot-scope="location">
                {{location.state}}
            </template>
            <template v-if="footer" slot="footer">
                Footer
            </template>
        </a-table>
    </section>
</template>

<script>
    export default {
        name: "Users",
        data () {
            return {

                columnHeader: true,
                drag: false,
                bordered: true,
                footer: false,
                columns : [
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        sorter: true,
                        scopedSlots: { customRender: 'name' },
                    },
                    {
                        title: 'Gender',
                        dataIndex: 'gender',
                        filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
                    },
                    {
                        title: 'Address',
                        children: [
                            {
                                title: 'City',
                                dataIndex: 'location',
                                key: 'city',
                                width: 200,
                                scopedSlots: { customRender: 'city' },

                            },
                            {
                                title: 'State',
                                dataIndex: 'location',
                                key: 'state',
                                width: 200,
                                scopedSlots: { customRender: 'state' },

                            },
                        ],
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                    },
                    {
                        title: 'Age',
                        dataIndex: 'dob',
                        scopedSlots: { customRender: 'dob' },

                    },
                    {
                        title: 'Phone',
                        dataIndex: 'phone'
                    },
                ],
                tableData: [],
                pagination: {
                    total: 200
                },
                loading: false,
            }
        },
        mounted() {
            this.fetch();
        },
        methods: {
            handleTableChange(pagination, filters, sorter) {
                console.log(pagination);
                const pager = { ...this.pagination };
                pager.current = pagination.current;
                this.pagination = pager;
                this.fetch({
                    results: pagination.pageSize,
                    page: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order,
                    ...filters,
                })
            },
            fetch (params = {}) {
                this.api.permission.fetchUserList({
                    results: 10,
                    ...params
                }).then(res => {
                    this.tableData = res.data.results;
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
    .toolbar
        & > strong
            margin 4px 10px

</style>
