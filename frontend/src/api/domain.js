export async function getDomain() {
  try {
    const response = await fetch(
      'http://localhost:4000/api/v1/domain/getdomain',
    )
    const data = await response.json()
    return data.hostedZones
  } catch (error) {
    console.error(error.message)
  }
}

export async function addDomain(data) {
  console.log(data)
  try {
    await fetch('http://localhost:4000/api/v1/domain/createdomain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error(error.message)
  }
}

export async function updateDomainRecord(hostedZoneId, comment) {
  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/domain/updatedomain/${hostedZoneId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ comment }), // Sending comment in the request body
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error.message)
  }
}

export async function deleteDomain(hostedZoneId) {
  console.log(hostedZoneId)
  try {
    await fetch(
      `http://localhost:4000/api/v1/domain/deletedomain/${hostedZoneId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error(error.message)
  }
}

export async function bulkUploadDomains(file) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(
      'http://localhost:4000/api/v1/domain/createdomain/bulkupload',
      {
        method: 'POST',
        body: formData,
      },
    )

    if (!response.ok) {
      throw new Error('Failed to upload domains')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during bulk upload:', error.message)
  }
}
