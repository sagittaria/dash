<template>
  <div>
    loading...
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
        console.log(data)
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
