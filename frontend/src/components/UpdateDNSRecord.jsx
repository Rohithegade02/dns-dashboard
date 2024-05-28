import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { InputLabel, Modal } from '@mui/material'

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
const UpdateDNSRecord = ({
  initialDomainName,
  initialRecordType,
  initialRecordValue,
  onSubmit,
  onClose,
}) => {
  const [domainName, setDomainName] = useState(initialDomainName)
  const [newRecordType, setNewRecordType] = useState(initialRecordType)
  const [newRecordValue, setNewRecordValue] = useState(initialRecordValue)
  const [ttl, setTTL] = useState('3600')
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

  // Function to handle changes in record type
  const handleChangeRecordType = event => {
    const selectedType = event.target.value
    setNewRecordType(selectedType)
    // Set record value and TTL based on record type
    switch (selectedType) {
      case 'A':
        setNewRecordValue('192.0.2.1')
        setTTL('3600')
        break
      case 'AAAA':
        setNewRecordValue('2001:0db8:85a3:0000:0000:8a2e:0370:7334')
        setTTL('3600')
        break
      case 'CNAME':
        setNewRecordValue('example.com')
        setTTL('3600')
        break
      case 'MX':
        setNewRecordValue('10 mail.example.com')
        setTTL('3600')
        break
      case 'NS':
        setNewRecordValue('ns1.example.com')
        setTTL('3600')
        break
      case 'PTR':
        setNewRecordValue('example.com')
        setTTL('3600')
        break
      case 'SOA':
        setNewRecordValue(
          'ns1.example.com hostmaster.example.com 2022032801 7200 3600 1209600 3600',
        )
        setTTL('3600')
        break
      case 'SRV':
        setNewRecordValue('0 5 5269 xmpp-server.example.com')
        setTTL('3600')
        break
      case 'TXT':
        setNewRecordValue('sample text')
        setTTL('3600')
        break
      case 'DNSSEC':
        setNewRecordValue('true')
        setTTL('3600')
        break
      default:
        setNewRecordValue('')
        setTTL('3600')
    }
  }

  const handleSubmit = () => {
    const updatedDNSRecord = {
      recordData: {
        Name: domainName,
        Type: newRecordType,
        Value: newRecordValue,
        ttl,
      },
    }

    onSubmit(updatedDNSRecord)
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
            Update DNS Record
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
            value={newRecordType}
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
            value={newRecordValue}
            placeholder='Description'
            sx={{ color: '#fff', background: '#fff', borderRadius: '10px' }}
            onChange={e => setNewRecordValue(e.target.value)}
          />
        </div>
        <div>
          <InputLabel sx={{ color: '#fff' }}>TTL</InputLabel>
          <TextField
            fullWidth
            value={ttl}
            sx={{ color: '#fff', background: '#fff', borderRadius: '10px' }}
            disabled={true}
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
            Update
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateDNSRecord
