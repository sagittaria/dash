<template>
  <div class="post-editor-wrapper">
    <el-form :model="post">
      <div class="category-title-saveBtn-and-tags-container">
        <div class="category-title-saveBtn-container">
          <el-select v-model="post.category">
            <el-option label="idea" value="idea"/>
            <el-option label="tech" value="tech"/>
            <el-option label="other" value="other"/>
          </el-select>
          <el-input v-model="post.title" style="margin-left: 5px;"/>
          <el-button type="primary" style="margin-left: 5px;" size="mini" plain @click="savePost">SAVE</el-button>
        </div>
        <div class="tags-container">
          <el-tag
            v-for="tag in post.tags"
            :key="tag"
            type="info"
            size="medium"
            closable
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="add-tag-btn" type="success" plain @click="showInput">+tag</el-button>
        </div>
        <div v-if="$route.params.id" class="updatedAt">
          updated @ {{ post.updatedAt|formatLocalTime }}
        </div>
      </div>
      <markdown-editor id="contentEditor" ref="contentEditor" v-model="post.body" :height="300" :z-index="20"/>
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { fetchById, save } from '@/api/post'
import { formatLocalTime } from '@/filters'

export default {
  name: 'CreatePost',
  components: { MarkdownEditor },
  filters: { formatLocalTime },
  data() {
    return {
      post: {
        title: '',
        body: '',
        category: 'other',
        tags: [],
        updatedAt: ''
      },
      inputVisible: false,
      inputValue: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPost()
    })
  },
  methods: {
    handleClose(tag) {
      this.post.tags.splice(this.post.tags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.post.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    getPost() {
      const self = this
      const id = self.$route.params.id
      if (id) {
        fetchById(id).then(res => {
          // console.log(res)
          self.post = res.post
        })
      }
    },

    savePost() {
      const self = this
      const id = self.$route.params.id
      self.post.updatedAt = new Date()
      save(self.post, id || '').then(() => {
        self.$message.success(id ? 'updated!' : 'created!')
        self.$router.push({ name: 'PostList' })
      })
    }
  }
}
</script>

<style scoped>
.post-editor-wrapper{
  padding: 18px;
  height: calc(100vh - 50px - 34px)
}
.category-title-saveBtn-and-tags-container,
.category-title-saveBtn-container,
.tags-container{
  display: flex;
}
.category-title-saveBtn-and-tags-container{
  padding-bottom: 10px;
}
.category-title-saveBtn-container{
  width: 45%;
}
.tags-container{
  padding-left: 20px;
}
.tags-container .el-tag{
  margin-left: 8px;
}
.tags-container .input-new-tag{
  margin-left: 10px;
}
.tags-container .add-tag-btn{
  height: 28px;
  padding: 3px 8px;
  margin-left: 10px;
}
.updatedAt{
  position: absolute;
  right: 20px;
  color: #ccc;
  font-size: 14px;
}
</style>
