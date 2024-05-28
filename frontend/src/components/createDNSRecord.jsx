import React, { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useLocation } from 'react-router-dom'
import { InputLabel, Modal } from '@mui/material'
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
  const params = new URLSearchParams(window.location.search)
  const code = params.get('id')
  console.log(code)

  const handleChangeRecordType = event => {
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
      sx={{ background: '#000', height: '100vh', width: '50vw' }}
    >
      <div className='p-5 flex flex-col  justify-center h-[100vh]  gap-10'>
        <div className='mx-auto'>
          <Typography fontSize={'20px'} fontWeight={600} color={'#fff'}>
            Create Domain Record
          </Typography>
        </div>
        <div>
          <InputLabel sx={{ color: '#fff' }}>Domain Name</InputLabel>
          <TextField
            fullWidth
            value={domainName}
            placeholder='Domain Name'
            sx={{ color: '#fff', background: '#fff', borderRadius: '10px' }}
            disabled={true}
          />
        </div>
        <div>
          <InputLabel sx={{ color: '#fff' }}>Record Type</InputLabel>
          <Select
            value={recordType}
            onChange={handleChangeRecordType}
            fullWidth
            placeholder='Record Type'
            sx={{ background: '#fff', borderRadius: '10px' }}
          >
            {recordTypeOption.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel sx={{ color: '#fff' }}>Description</InputLabel>
          <TextField
            fullWidth
            value={recordValue}
            placeholder='Description'
            sx={{ color: '#fff', background: '#fff', borderRadius: '10px' }}
            onChange={e => setRecordValue(e.target.value)}
          />
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{ background: 'blue', color: '#fff', textTransform: 'none' }}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateDNSRecord
