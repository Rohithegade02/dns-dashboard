export async function addRecord(data) {
  try {
    await fetch('http://localhost:4000/api/v1/records/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function getAllRecord() {
  try {
    const response = await fetch('http://localhost:4000/api/v1/records/')
    return response.json()
  } catch (err) {
    console.log(err)
  }
}
export async function deleteRecord(id) {
  try {
    await fetch(`http://localhost:4000/api/v1/records/delete/${id}`, {
      method: 'DELETE',
    })
  } catch (err) {
    console.log(err)
  }
}
export async function updateRecord(id, data) {
  console.log(data)
  try {
    await fetch(`http://localhost:4000/api/v1/records/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (err) {
    console.log(err)
  }
}
