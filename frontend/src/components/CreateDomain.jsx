import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { InputLabel, Modal } from '@mui/material'

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
    const data = {
      domainName,
      desc: description,
    }
    onSubmit(data)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ background: '#6366F1', height: '100vh', width: '30vw' }}
    >
      <div className='p-5 flex flex-col  justify-center h-[100vh]  gap-10'>
        <div className='mx-auto'>
          <Typography fontSize={'20px'} fontWeight={600} color={'#fff'}>
            Create DNS Record
          </Typography>
        </div>
        <div>
          <InputLabel sx={{ color: '#fff' }}>Domain Name</InputLabel>
          <TextField
            fullWidth
            value={domainName}
            placeholder='Domain Name'
            sx={{ color: '#fff', background: '#fff', borderRadius: '10px' }}
            onChange={e => setDomainName(e.target.value)}
          />
        </div>
        <div>
          <InputLabel sx={{ color: '#fff' }}>Description</InputLabel>
          <TextField
            fullWidth
            value={description}
            placeholder='Description'
            sx={{ color: '#fff', background: '#fff', borderRadius: '10px' }}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{
              padding: '10px',
              background: '#fff',
              color: '#6366F1',
              textTransform: 'none',
              '&:hover': {
                background: '#fff',
              },
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateDomain
