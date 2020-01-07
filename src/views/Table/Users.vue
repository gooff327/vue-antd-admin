<template>
    <section class="table-wrapper">
        <div class="toolbar">
            <strong>Bordered <a-switch defaultChecked @change="bordered = !bordered"/></strong>
            <strong>Loading <a-switch @change="loading = !loading"/></strong>
            <strong>Header <a-switch @change="columnHeader = !columnHeader"/></strong>
            <strong>Footer <a-switch @change="footer = !footer"/></strong>
            <a-button :disabled="selectedRowKeys.length < 1" icon="delete" type="danger" @click="confirmDelete"/>
        </div>
        <br>
        <a-table
                :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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
                                dataIndex: 'location.city',
                                key: 'city',
                            },
                            {
                                title: 'State',
                                dataIndex: 'location.state',
                                key: 'state',
                            },
                        ],
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                    },
                    {
                        title: 'Age',
                        dataIndex: 'dob.age',
                    },
                    {
                        title: 'Phone',
                        dataIndex: 'phone'
                    }
                ],
                selectedRowKeys: [],
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
            onSelectChange (keys) {
                this.selectedRowKeys = keys
            },
            confirmDelete () {
              this.$confirm({
                  title: 'Delete Selected items ?',
                  onOk: this.handleDelete,
              })
            },
            handleDelete () {
                const all = this.selectedRowKeys.length;
                let [ success, failure ] = [ 0, 0];

                while(this.selectedRowKeys.length > 0) {
                    const index = this.tableData.findIndex(item => item.login.uuid === this.selectedRowKeys[0]);
                    if (index >= 0) {
                       this.tableData.splice(index, 1);
                       success ++
                    } else {
                        failure ++
                    }
                    this.selectedRowKeys.shift()
               }
               this.$message.success(`All: ${all}   Success: ${success}  Failed: ${failure}`)
            },
            handleTableChange(pagination, filters, sorter) {
                this.loading = true;
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
    .table-wrapper
        background-color #fff
        border-radius 6px
        padding 10px
        .toolbar
            & > strong
                margin 4px 10px
                .ant-switch
                    margin 0 4px
</style>
