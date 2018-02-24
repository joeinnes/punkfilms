module.exports = function addUserIdToLike () {
  return function (hook) {
    switch (hook.type) {
    case 'before':
      if (!hook.params.user || !hook.params.user.id) {
        return Promise.reject(hook)
      }
      hook.params.payload = Object.assign(hook.params.payload, { userId: hook.params.user.id })
      hook.params.sequelize = { raw: false }
      return Promise.resolve(hook)
        
    case 'after':
      hook.result.setUser(hook.params.payload.userId) 
      break
    }
    return Promise.resolve(hook)
  }
}