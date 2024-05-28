import {
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import {
  addDomain,
  bulkUploadDomains,
  deleteDomain,
  getDomain,
  updateDomainRecord,
} from '../api/domain'
import CreateDomain from './CreateDomain'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UpdateDomain from './UpdateDomain'
import { toast } from 'react-toastify'
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// })
const DomainDashboard = () => {
  const [domainsData, setDomainsData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [recordToUpdate, setRecordToUpdate] = useState(null)
  const [file, setFile] = useState(null)
  const [search, setSearch] = useState('')
  console.log(domainsData)
  const getAllRecordData = async () => {
    try {
      const data = await getDomain()
      setDomainsData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleEditOrAddDomain = async data => {
    try {
      if (recordToUpdate) {
        const id = recordToUpdate.Id?.split('/')?.pop()
        const res = await updateDomainRecord(id, data.description)
        if (res.success) {
          toast.success(res.message)
          setOpenModal(false)
          setRecordToUpdate(null)
          getAllRecordData()
        } else {
          toast.error(res.message)
          setOpenModal(false)
        }
      } else {
        const res = await addDomain(data)
        if (res.ok) {
          toast.success('Created  Successfully')
          setOpenModal(false)
          setRecordToUpdate(null)
          getAllRecordData()
        } else {
          toast.error('Failed to Create ')
          setOpenModal(false)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleDeleteDomain = async domainId => {
    console.log(domainId)
    try {
      const id = domainId?.split('/')?.pop()
      const res = await deleteDomain(id)
      if (res.success) {
        toast.success(res.message)
        getAllRecordData()
      } else {
        toast.error(res.message)
        setOpenModal(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllRecordData()
  }, [])
  const handleUpdateDomain = record => {
    setRecordToUpdate(record)
    setOpenModal(true)
  }
  const handleBulkUpload = async () => {
    if (file) {
      const res = await bulkUploadDomains(file)
      if (res.success) {
        toast.success(res.message)
        getAllRecordData()
      } else {
        toast.error(res.message)
        setOpenModal(false)
      }
    } else {
      console.error('No file selected for upload')
    }
  }
  const filteredData = domainsData.filter(data =>
    data.Name.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <div>
      <div>
        <TextField
          value={search}
          placeholder='Search by Url'
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <input type='file' onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleBulkUpload}>Upload Domains</button>
      </div>
      <Button onClick={() => setOpenModal(true)}>Create Domain</Button>
      {openModal && (
        <CreateDomain
          onSubmit={handleEditOrAddDomain}
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      {recordToUpdate && (
        <UpdateDomain
          initialDomainName={recordToUpdate.Name}
          initialComment={recordToUpdate?.Config?.Comment}
          onSubmit={handleEditOrAddDomain}
          onClose={() => {
            setOpenModal(false)
            setRecordToUpdate(null)
          }}
        />
      )}
      <div>
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>ResourceRecordSetCount</TableCell>
                  <TableCell align='center'>Comment</TableCell>
                  <TableCell align='center'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData?.length > 0 ? (
                  filteredData.map(row => (
                    <TableRow
                      key={row.Id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell align='center'>{row.Name}</TableCell>
                      <TableCell align='center'>
                        {row.ResourceRecordSetCount}
                      </TableCell>
                      <TableCell align='center'>
                        {row?.Config?.Comment}
                      </TableCell>
                      {row.ResourceRecordSetCount <= 2 ? (
                        <div className='mt-4 gap-2'>
                          <Button
                            onClick={() => handleUpdateDomain(row)}
                            size='sm'
                            className='bg-blue-500 mr-3'
                          >
                            Update
                          </Button>
                          <Button onClick={() => handleDeleteDomain(row?.Id)}>
                            Delete
                          </Button>
                        </div>
                      ) : (
                        <h2 className='mt-4 gap-2'>
                          You can only delete after deleting all records
                        </h2>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <div>No DNS Record</div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default DomainDashboard
