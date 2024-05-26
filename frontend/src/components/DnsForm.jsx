import { useState } from 'react'
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import DnsTableView from './DnsTableView'

const dnsRecordTypes = [
  'A',
  'AAAA',
  'CNAME',
  'MX',
  'NS',
  'PTR',
  'SOA',
  'SRV',
  'TXT',
  'DNSSEC',
]

const DnsForm = () => {
  const [domains, setDomains] = useState([])
  const [data, setdata] = useState({
    domainUrl: '',
    recordType: '',
    name: '',
    value: '',
  })
  const [editMode, setMode] = useState('add')
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setdata({ domainUrl: '', recordType: '', name: '', value: '' })
    setEditIndex(null)
  }
  console.log(domains)
  const handleChange = e => {
    const { name, value } = e.target
    setdata(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (editMode === 'add') {
      setDomains(prevDomains => [...prevDomains, data])
    } else {
      const updatedDomains = domains.map((domain, index) =>
        index === editIndex ? data : domain,
      )
      setDomains(updatedDomains)
    }
    handleClose()
  }

  return (
    <div>
      <h1>DNS Records</h1>
      <Button onClick={handleOpen}>Add a Record</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            backgroundColor: '#000',
            height: '100vh',
            width: '40vw',
            p: 4,
            color: '#fff',
          }}
        >
          <Typography variant='h4'>
            {editMode === 'add' ? 'Add' : 'Update'} Record
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name='domainUrl'
              label='Domain URL'
              value={data.domainUrl}
              onChange={handleChange}
              fullWidth
              sx={{ backgroundColor: '#fff', marginBottom: 2 }}
            />
            <Select
              name='recordType'
              value={data.recordType}
              onChange={handleChange}
              fullWidth
              sx={{ backgroundColor: '#fff', marginBottom: 2 }}
            >
              {dnsRecordTypes.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <TextField
              name='name'
              label='Name'
              value={data.name}
              onChange={handleChange}
              fullWidth
              sx={{ backgroundColor: '#fff', marginBottom: 2 }}
            />
            <TextField
              name='value'
              label='Value'
              value={data.value}
              onChange={handleChange}
              fullWidth
              sx={{ backgroundColor: '#fff', marginBottom: 2 }}
            />
            <Button type='submit' variant='contained' color='primary'>
              {editMode === 'add' ? 'Add' : 'Update'}
            </Button>
            <Button onClick={handleClose} variant='contained' color='secondary'>
              Close
            </Button>
          </form>
        </Box>
      </Modal>
      <DnsTableView domains={domains} setDomains={setDomains} />
    </div>
  )
}

export default DnsForm
