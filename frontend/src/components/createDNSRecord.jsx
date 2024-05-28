import React, { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useLocation } from 'react-router-dom'
import { Modal } from '@mui/material'
import { listHostedZones } from '../api/dns'
const recordTypeOption = [
  { value: 'A', name: 'A (Address)' },
  { value: 'AAAA', name: 'AAAA (IPV6 Address)' },
  { value: 'CNAME', name: 'CNAME' },
  { value: 'MX', name: 'MX Record' },
  { value: 'NS', name: 'NS Record' },
  { value: 'PTR', name: 'PTR Record' },
  { value: 'SOA', name: 'SOA Record' },
  { value: 'SRV', name: 'SRV Record' },
  { value: 'TXT', name: 'TXT Record' },
  { value: 'DNSSEC', name: 'DNSSEC' },
]
const CreateDNSRecord = ({ onSubmit, open, onClose }) => {
  const [domainName, setDomainName] = useState('')
  console.log(domainName)
  const [recordType, setRecordType] = useState('')
  const [recordValue, setRecordValue] = useState('')
  const location = useLocation()
  const { title } = location.state || {}
  const params = new URLSearchParams(window.location.search)
  const code = params.get('id')
  console.log(code)

  const handleRecordTypeChange = event => {
    const selectedType = event.target.value
    setRecordType(selectedType)
    switch (selectedType) {
      case 'A':
        setRecordValue('192.0.2.1')
        break
      case 'AAAA':
        setRecordValue('2001:0db8:85a3:0000:0000:8a2e:0370:7334')
        break
      case 'CNAME':
        setRecordValue('example.com')
        break
      case 'MX':
        setRecordValue('10 mail.example.com')
        break
      case 'NS':
        setRecordValue('ns1.example.com')
        break
      case 'PTR':
        setRecordValue('example.com')
        break
      case 'SOA':
        setRecordValue(
          'ns1.example.com hostmaster.example.com 2022032801 7200 3600 1209600 3600',
        )
        break
      case 'SRV':
        setRecordValue('0 5 5269 xmpp-server.example.com')
        break
      case 'TXT':
        setRecordValue('sample text')
        break
      case 'DNSSEC':
        setRecordValue('true')
        break
      default:
        setRecordValue('')
    }
  }
  async function fetchDNSRecords() {
    await listHostedZones(code).then(res => setDomainName(res[0].Name))

    // console.log(data)
    // setDNSRecords(response)
  }
  useEffect(() => {
    fetchDNSRecords()
  }, [])
  const handleSubmit = () => {
    const newDNSRecord = {
      recordData: {
        domainName: domainName,
        recordType,
        recordValue,
      },
      code: code,
    }

    onSubmit(newDNSRecord)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ background: 'white', width: '50vw' }}
    >
      <div>
        <Typography variant='h6' gutterBottom>
          Create DNS Record
        </Typography>
        <Typography>Domain Name</Typography>
        <TextField
          fullWidth
          placeholder='domain Name'
          value={domainName}
          disabled
        />
        <Typography>Record Type</Typography>
        <Select
          value={recordType}
          onChange={handleRecordTypeChange}
          fullWidth
          id='record-type'
        >
          {recordTypeOption.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <Typography variant='body1' gutterBottom>
          Record Value
        </Typography>
        <TextField
          fullWidth
          id='record-value'
          value={recordValue}
          onChange={e => setRecordValue(e.target.value)}
        />
        <Button variant='contained' onClick={handleSubmit}>
          Create DNS Record
        </Button>
      </div>
    </Modal>
  )
}

export default CreateDNSRecord
