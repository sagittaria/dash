<template>
  <div style="padding: 14px;">
    <el-table v-loading="isLoading" :data="postList">
      <el-table-column prop="category" label="category"/>
      <el-table-column prop="title" label="title"/>
      <el-table-column label="tags">
        <template slot-scope="scope">
          <el-tag v-for="t in scope.row.tags" :key="t" type="warning" size="mini" style="margin-right: 6px;">{{ t }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="published@">
        <template slot-scope="scope">
          <span>{{ scope.row._id|objectId2LocalTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="updated@">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt|formatLocalTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-edit-outline" size="mini" circle plain @click="edit(scope.row._id)"/>
          <el-button type="info" icon="el-icon-delete" size="mini" circle plain @click="drop(scope.row._id)"/>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="listQuery.page"
      :page-size="listQuery.size"
      :total="total"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { fetchList, del } from '@/api/post'
import { formatLocalTime, objectId2LocalTime } from '@/filters'

export default {
  name: 'PostList',
  filters: {
    formatLocalTime,
    objectId2LocalTime
  },
  data() {
    return {
      postList: [],
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      isLoading: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPosts()
    })
  },
  methods: {
    getPosts() {
      this.isLoading = true
      fetchList(this.listQuery).then(data => {
        this.postList = data.list
        this.total = data.total
        this.isLoading = false
      })
    },
    handleCurrentChange(page) {
      this.listQuery.page = page
      this.getPosts()
    },
    edit(id) {
      this.$router.push({ name: 'EditPost', params: { id }})
    },
    drop(id) {
      this.$confirm('sir, permission to delete', 'warning').then(() => {
        del(id)
      }).then(() => {
        this.$message.success('deleted!')
        this.getPosts()
      }).catch(err => { console.log(err.message) })
    }
  }
}
</script>

<style scoped>
</style>
