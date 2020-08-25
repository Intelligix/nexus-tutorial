const APP_SECRET = 'SOMESUPERSECRETKEY'

function getUserId(token: any | null | undefined) {
  const userId = token.userId
  if (!userId) {
    throw new Error('User not authorized!')
  }

  return userId
}

export { APP_SECRET, getUserId}
