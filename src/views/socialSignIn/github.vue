<template>
  <div
    style="height: calc(100vh);width: calc(100vw);background-color: #2d3a4b;
  display: flex;justify-content: center;flex-direction: column">
    <div style="display: flex;justify-content: center">
      <svg-icon icon-class="loading-bars" style="font-size:60px;"/>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { setToken } from '@/utils/auth'

export default {
  mounted() {
    const code = this.$route.query.code
    this.handleGithubSignIn(code)
  },
  methods: {
    handleGithubSignIn(code) {
      request({
        url: '/github/signIn',
        method: 'get',
        params: { code }
      }).then(data => {
        this.$store.commit('SET_TOKEN', data.token)
        setToken(data.token)
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
        this.$router.push('/login')
      })
    }
  }
}
</script>
