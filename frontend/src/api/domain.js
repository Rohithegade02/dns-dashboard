const baseUrl = 'https://dns-dashboard-q1we.onrender.com/api/v1/domain'
//api to fetch all domain
export async function getDomain() {
  try {
    const response = await fetch(`${baseUrl}/getdomain`)
    const data = await response.json()
    return data.hostedZones
  } catch (error) {
    console.error(error.message)
  }
}
//api to add domain data
export async function addDomain(data) {
  try {
    const response = await fetch(`${baseUrl}/createdomain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response
  } catch (error) {
    console.error(error.message)
  }
}
//api to update domain data
export async function updateDomainRecord(hostedZoneId, comment) {
  try {
    const response = await fetch(`${baseUrl}/updatedomain/${hostedZoneId}`, {
      method: 'PUT',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}
//api to delete domain data
export async function deleteDomain(hostedZoneId) {
  try {
    const response = await fetch(`${baseUrl}/deletedomain/${hostedZoneId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
    const response = await fetch(`${baseUrl}/createdomain/bulkupload`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error during bulk upload:', error.message)
  }
}
