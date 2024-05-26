// DomainChart.js
import { useEffect, useState } from 'react'
import { PieChart, Pie } from '@mui/x-charts'
import { Box } from '@mui/material'

const DomainChart = () => {
  const [domainData, setDomainData] = useState([])
  console.log(domainData)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://localhost:4000/api/v1/records/domain-distribution',
      )
      const data = await response.json()
      setDomainData(data.map(d => ({ name: d._id, value: d.count })))
    }
    fetchData()
  }, [])

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <PieChart width={400} height={400}>
          <Pie
            data={domainData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={150}
            fill='#8884d8'
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          />
        </PieChart>
      </Box>
    </div>
  )
}

export default DomainChart
