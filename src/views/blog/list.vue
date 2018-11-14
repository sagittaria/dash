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
      <el-table-column label="updated">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt|formatLocalTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="operate">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-edit-outline" size="mini" circle plain @click="edit(scope.row._id)"/>
          <el-button type="info" icon="el-icon-delete" size="mini" circle plain @click="del(scope.row._id)"/>
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
import { fetchList } from '@/api/post'
import { formatLocalTime } from '@/filters'

export default {
  name: 'PostList',
  filters: {
    formatLocalTime
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
  created() {
    this.getPosts()
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
    }
  }
}
</script>

<style scoped>
</style>
