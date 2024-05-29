export async function getDomain() {
  try {
    const response = await fetch(
      'https://dns-dashboard-q1we.onrender.com/api/v1/domain/getdomain',
    )
    const data = await response.json()
    return data.hostedZones
  } catch (error) {
    console.error(error.message)
  }
}

export async function addDomain(data) {
  try {
    const response = await fetch(
      'https://dns-dashboard-q1we.onrender.com/api/v1/domain/createdomain',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
    return response
  } catch (error) {
    console.error(error.message)
  }
}

export async function updateDomainRecord(hostedZoneId, comment) {
  try {
    const response = await fetch(
      `https://dns-dashboard-q1we.onrender.com/api/v1/domain/updatedomain/${hostedZoneId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ comment }), // Sending comment in the request body
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
      },
    )
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}

export async function deleteDomain(hostedZoneId) {
  try {
    const response = await fetch(
      `https://dns-dashboard-q1we.onrender.com/api/v1/domain/deletedomain/${hostedZoneId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}

export async function bulkUploadDomains(file) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(
      'https://dns-dashboard-q1we.onrender.com/api/v1/domain/createdomain/bulkupload',
      {
        method: 'POST',
        body: formData,
      },
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during bulk upload:', error.message)
  }
}
