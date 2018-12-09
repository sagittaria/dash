const config = {}
config.url = 'https://github.com/login/oauth/authorize'
config.client_id = process.env.CLIENT_ID
config.scope = ['user']

let GithubAuthRedirect = config.url
GithubAuthRedirect += '?client_id=' + config.client_id
GithubAuthRedirect += '&scope=' + config.scope
GithubAuthRedirect += '&state=' + new Date().getTime()

export { GithubAuthRedirect }

export default config
