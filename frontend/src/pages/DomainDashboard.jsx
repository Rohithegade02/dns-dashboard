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
  Typography,
  styled,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useContext, useEffect, useState } from 'react'
import CreateDomain from '../components/CreateDomain'
import UpdateDomain from '../components/UpdateDomain'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthProvider'
import {
  addDomain,
  bulkUploadDomains,
  deleteDomain,
  getDomain,
  updateDomainRecord,
} from '../api/domain'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

const DomainDashboard = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
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
  const handleFileChange = event => {
    setFile(event.target.files[0])
  }

  const handleButtonClick = () => {
    document.getElementById('fileInput').click()
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
    <div className='bg-gradient-to-r min-h-[100vh]  from-slate-50 via-[#FCE7D6] to-[#EFEEF3]'>
      <div className='absolute right-10 top-5 '>
        <Button
          onClick={logout}
          sx={{
            padding: '10px',
            fontSize: '16px',
            background: '#09326E',
            color: '#fff',
            textTransform: 'none',
          }}
        >
          Logout
        </Button>
      </div>
      <div className=' pt-5 flex flex-col  items-center'>
        <div className='h-20 flex justify-center items-center w-[50%] bg-[#fff] rounded-lg border-4 border-[#E5E7EB]'>
          <Typography
            textAlign={'center'}
            fontSize={'20px'}
            fontWeight={600}
            color={'#7672F1'}
          >
            Domain Dashboard
          </Typography>
        </div>
        <div className='mt-10'>
          <div>
            <TextField
              value={search}
              placeholder='Search by Url'
              onChange={e => setSearch(e.target.value)}
              sx={{ width: '30vw', background: '#fff' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className='flex justify-between w-[70vw] mb-5'>
          <div>
            <Button
              onClick={() => setOpenModal(true)}
              sx={{
                padding: '10px',
                background: '#004CBE',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  background: 'none',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AddIcon />
                  </InputAdornment>
                ),
              }}
            >
              Create Domain
            </Button>
          </div>
          <div>
            <input
              id='fileInput'
              type='file'
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button
              sx={{ background: '#004CBE', color: '#fff', padding: '10px' }}
              onClick={handleButtonClick}
            >
              Bulk JSON File
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleBulkUpload}
              disabled={!file}
              style={{ marginLeft: '10px', padding: '10px' }}
            >
              Upload
            </Button>
          </div>
        </div>
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
          <TableContainer>
            <Table sx={{ width: '70vw' }} aria-label='simple table'>
              <TableHead sx={{ background: '#6366F1' }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}
                    align='center'
                  >
                    NAME
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}
                  >
                    ResourceRecordSetCount
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}
                  >
                    Comment
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  background: '#F8FAFC',
                  color: '#8B859B',
                }}
              >
                {filteredData?.length > 0 ? (
                  filteredData.map(row => (
                    <TableRow
                      key={row.Id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': {
                          backgroundColor: '#FBE7D7',
                        },
                      }}
                    >
                      <TableCell
                        align='center'
                        sx={{
                          color: '#8B859B',
                          fontSize: '15px',
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline',
                            textDecorationThickness: '1px',
                          },
                        }}
                        onClick={() =>
                          navigate(`/dns?id=${row.Id?.split('/').pop()}`)
                        }
                      >
                        {row.Name}
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ color: '#8B859B', fontSize: '15px' }}
                      >
                        {row.ResourceRecordSetCount}
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ color: '#8B859B', fontSize: '15px' }}
                      >
                        {row?.Config?.Comment}
                      </TableCell>
                      <TableCell>
                        {row.ResourceRecordSetCount <= 2 ? (
                          <div className='flex justify-center gap-4 items-center'>
                            <Button
                              onClick={() => handleUpdateDomain(row)}
                              sx={{ background: '#fff', color: '#6366F1' }}
                            >
                              Update
                            </Button>
                            <Button
                              sx={{ background: '#fff', color: '#6366F1' }}
                              onClick={() => handleDeleteDomain(row?.Id)}
                            >
                              Delete
                            </Button>
                          </div>
                        ) : (
                          <Typography color={'#8B859B'} fontSize={'15px'}>
                            delete after deleting all records
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div className='w-[100%] text-center  flex justify-center items-center'>
                    <Typography
                      color={'#8B859B'}
                      textAlign={'center'}
                      fontSize={'20px'}
                    >
                      No DNS Record
                    </Typography>
                  </div>
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
