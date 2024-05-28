import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Modal } from '@mui/material'

const CreateDomain = ({ onSubmit, open, onClose }) => {
  const [domainName, setDomainName] = useState('')
  const [recordType, setRecordType] = useState('')
  const [recordValue, setRecordValue] = useState('')
  const [description, setDescription] = useState('')

  const recordTypeChange = e => {
    const selectedType = e.target.value
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

  const handleSubmit = () => {
    const newDomain = {
      domainName,
      desc: description,
    }
    onSubmit(newDomain)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ background: '#d2d2d2', height: '100vh', width: '50vw' }}
    >
      <div>
        <Typography variant='h6' gutterBottom>
          Create HostedZone
        </Typography>
        <Typography>Domain Name</Typography>
        <TextField
          fullWidth
          id='domain-name'
          className='mb-2'
          value={domainName}
          onChange={e => setDomainName(e.target.value)}
        />
        <Typography>Description</Typography>
        <TextField
          fullWidth
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <Button variant='contained' onClick={handleSubmit}>
          Create HostedZone
        </Button>
      </div>
    </Modal>
  )
}

export default CreateDomain
