//register a user
export async function registerUser(data) {
  try {
    const response = await fetch(
      'https://dns-dashboard-q1we.onrender.com/api/v1/user/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
    const result = await response.json()
    localStorage.setItem('token', result.token)
    return result
  } catch (error) {
    console.error('Error:', error)
  }
}

// login user
export async function loginUser(data) {
  try {
    const response = await fetch(
      'https://dns-dashboard-q1we.onrender.com/api/v1/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error:', error)
  }
}
