const baseUrl = 'https://dns-dashboard-q1we.onrender.com/api/v1/dns'
//api to fetch all dns record
export async function getAllDNSRecord(hostedZoneId) {
  try {
    const response = await fetch(`${baseUrl}/hostedZones/${hostedZoneId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
  }
}
//api to create DNS record
export async function createDNSRecord(recordData, code) {
  try {
    const response = await fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...recordData, code }),
    })

    const result = response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}
//api to update dns record
export async function updateDNSRecord(id, recordData) {
  try {
    const response = await fetch(`${baseUrl}/update/${recordData}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(id),
    })
    const result = response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}
//api to delete DNS Record
export async function deleteDNSRecord(record, id) {
  try {
    const response = await fetch(`${baseUrl}/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(record),
    })
    const result = response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}
