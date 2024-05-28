import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from '@mui/material'
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
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})
const DomainDashboard = () => {
  const [domainsData, setDomainsData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [recordToUpdate, setRecordToUpdate] = useState(null)
  const [file, setFile] = useState(null)
  console.log(recordToUpdate)
  const getAllRecordData = async () => {
    try {
      const data = await getDomain()
      console.log(data)
      setDomainsData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateOrUpdateDomain = async data => {
    try {
      if (recordToUpdate) {
        const id = recordToUpdate.Id?.split('/')?.pop()
        await updateDomainRecord(id, data.description)
      } else {
        await addDomain(data)
        getDomain()
        setOpenModal(false) // Close the popup after successful creation or update
        setRecordToUpdate(null)
        ///  await addDomain(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleDeleteDomain = async domainId => {
    console.log(domainId)
    try {
      const id = domainId?.split('/')?.pop()
      await deleteDomain(id)
      getAllRecordData()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllRecordData()
  }, [])
  const handleUpdateDomain = record => {
    console.log(record)
    setRecordToUpdate(record)
    setOpenModal(true)
  }
  const handleBulkUpload = async () => {
    if (file) {
      const result = await bulkUploadDomains(file)
      console.log('Bulk upload result:', result)
    } else {
      console.error('No file selected for upload')
    }
  }
  return (
    <div>
      <div>
        <input type='file' onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleBulkUpload}>Upload Domains</button>
      </div>
      <Button onClick={() => setOpenModal(true)}>Create Domain</Button>
      {openModal && (
        <CreateDomain
          onSubmit={handleCreateOrUpdateDomain}
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      {recordToUpdate && (
        <UpdateDomain
          initialDomainName={recordToUpdate.Name}
          initialComment={recordToUpdate?.Config?.Comment}
          onSubmit={handleCreateOrUpdateDomain}
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
                {domainsData?.length > 0 ? (
                  domainsData.map(row => (
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
                          You can delete Zone only after deleting all records
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
