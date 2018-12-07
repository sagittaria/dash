const config = {}
config.url = 'https://github.com/login/oauth/authorize'
config.client_id = '39401b2e175bfa888870'
config.scope = ['user']

let GithubAuthRedirect = config.url
GithubAuthRedirect += '?client_id=' + config.client_id
GithubAuthRedirect += '&scope=' + config.scope
GithubAuthRedirect += '&state=' + new Date().getTime()

export { GithubAuthRedirect }

export default config
