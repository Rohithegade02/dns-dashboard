export async function registerUser(data) {
  console.log(data)
  try {
    const response = await fetch('http://localhost:4000/api/v1/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    console.log(result)
    localStorage.setItem('token', result.token)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Frontend: loginUser function
export async function loginUser(data) {
  console.log(data)
  try {
    const response = await fetch('http://localhost:4000/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    console.log(result)
    localStorage.setItem('token', result.token)
    if (!response.ok) {
      throw new Error(result.message || 'Login failed')
    }

    return result
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function isAuth() {
  try {
    const response = await fetch('http://localhost:4000/api/v1/user/getProfile')
    console.log(response)
    return response.json()
  } catch (err) {
    console.log(err)
  }
}
