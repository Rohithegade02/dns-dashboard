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
import { addRecord, getAllRecord, updateRecord } from '../api/record'
import FileUpload from './FileUpload'

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
  const [data, setData] = useState({
    domainUrl: '',
    recordType: '',
    name: '',
    value: '',
  })
  const [editMode, setEditMode] = useState('add')
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [uploadOpen, setUploadOpen] = useState(false)

  const handleUploadOpen = () => setUploadOpen(true)
  const handleUploadClose = () => setUploadOpen(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setData({ domainUrl: '', recordType: '', name: '', value: '' })
    setEditIndex(null)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setData(prevValues => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editMode === 'add') {
        const newRecord = await addRecord(data)
        setDomains(prevDomains => [...prevDomains, newRecord])
      } else {
        await updateRecord(data._id, data)
        await getAllRecord()
      }
    } catch (error) {
      console.error('Error:', error)
    }
    handleClose()
  }

  return (
    <div>
      <h1>DNS Records</h1>
      <Button onClick={handleUploadOpen}>Upload CSV/JSON</Button>
      <FileUpload open={uploadOpen} handleClose={handleUploadClose} />
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
      <DnsTableView
        domains={domains}
        setDomains={setDomains}
        setEditMode={setEditMode}
        setData={setData}
        setOpen={setOpen}
      />
    </div>
  )
}

export default DnsForm
