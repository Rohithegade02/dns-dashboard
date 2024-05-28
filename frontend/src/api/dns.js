export async function listHostedZones(hostedZoneId) {
  try {
    const response = await fetch(
      `https://dns-dashboard-q1we.onrender.com/api/v1/dns/hostedZones/${hostedZoneId}`,
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
  }
}

export async function createDNSRecord(recordData, code) {
  console.log(recordData, code)
  try {
    const response = await fetch(
      `https://dns-dashboard-q1we.onrender.com/api/v1/dns/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...recordData, code }),
      },
    )

    const result = response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}

export async function updateDNSRecord(id, recordData) {
  console.log(id, recordData)
  try {
    const response = await fetch(
      `https://dns-dashboard-q1we.onrender.com/api/v1/dns/update/${recordData}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(id),
      },
    )
    const result = response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}

export async function deleteDNSRecord(record, id) {
  try {
    const response = await fetch(
      `https://dns-dashboard-q1we.onrender.com/api/v1/dns/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(record),
      },
    )
    const result = response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}
