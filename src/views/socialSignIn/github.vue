<script>
import axios from 'axios'
export default {
  created() {
    const code = this.$route.query.code
    this.handleGithubSignIn(code)
  },
  methods: {
    handleGithubSignIn(code) {
      console.log(code)
      axios.get('/github/signIn', { params: { code }}).then(resp => {
        console.log(resp)
      })
    }
  },
  render: h => h() // suppress warning
}
</script>
