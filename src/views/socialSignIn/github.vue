<template>
  <div style="height:calc(100vh);background-color: #2d3a4b;text-align: center">
    <div style="color:white;font-size:2em;padding-top:40px;">
      <svg-icon icon-class="loading-bars"/>Loading<svg-icon icon-class="loading-bars"/>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { setToken } from '@/utils/auth'

export default {
  created() {
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
