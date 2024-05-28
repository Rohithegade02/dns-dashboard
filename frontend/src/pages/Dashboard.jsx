import { useState, useEffect, useContext } from 'react'
import {
  createDNSRecord,
  deleteDNSRecord,
  listHostedZones,
  updateDNSRecord,
} from '../api/dns'
import {
  Button,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import CreateDNSRecord from '../components/createDNSRecord'
import UpdateDNSRecord from '../components/UpdateDNSRecord'
import SearchIcon from '@mui/icons-material/Search'
import { AuthContext } from '../context/AuthProvider'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Dashboard() {
  const [dnsRecords, setDNSRecords] = useState([])
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [recordToUpdate, setRecordToUpdate] = useState(null)
  const params = new URLSearchParams(window.location.search)
  const code = params.get('id')
  const { logout } = useContext(AuthContext)
  const [search, setSearch] = useState('')
  console.log(dnsRecords)
  useEffect(() => {
    fetchDNSRecords()
  }, [])

  async function fetchDNSRecords() {
    await listHostedZones(code).then(res => setDNSRecords(res))
  }

  const handleEditOrAddDns = async recordData => {
    try {
      if (recordToUpdate) {
        const res = await updateDNSRecord(recordData, code)
        if (res.success) {
          toast.success(res.message)
          setOpenModal(false)
          fetchDNSRecords()
          setRecordToUpdate(null)
        } else {
          toast.error(res.message)
          setOpenModal(false)
        }
      } else {
        const res = await createDNSRecord(recordData, code)
        console.log(res)
        if (res.success) {
          toast.success(res.message)
          setOpenModal(false)
          fetchDNSRecords()
          setRecordToUpdate(null)
        } else {
          toast.error(res.message)
          setOpenModal(false)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleUpdateDNSRecord = record => {
    setRecordToUpdate(record)
    setOpenModal(true)
  }

  const handleDeleteDNSRecord = async record => {
    try {
      const res = await deleteDNSRecord(record, code)
      if (res.success) {
        toast.success(res.message)
        fetchDNSRecords()
      } else {
        toast.error(res.message)
        setOpenModal(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const filteredData = dnsRecords.filter(data =>
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
            '&:hover': {
              background: '#09326E',
            },
          }}
        >
          Logout
        </Button>
      </div>
      <div className='absolute left-10 top-5 '>
        <IconButton sx={{ background: '#fff' }} onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </div>
      <div className=' pt-5 flex flex-col  items-center'>
        <div className='h-20 flex justify-center items-center w-[50%] bg-[#fff] rounded-lg border-4 border-[#E5E7EB]'>
          <Typography
            textAlign={'center'}
            fontSize={'20px'}
            fontWeight={600}
            color={'#7672F1'}
          >
            DNS Dashboard
          </Typography>
        </div>
        <div className='mt-10'>
          <TextField
            placeholder='Search'
            value={search}
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
        <div className='flex justify-start w-[70vw] mb-5'>
          <div>
            <Button
              sx={{
                padding: '10px',
                background: '#004CBE',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  background: '#004CBE',
                },
              }}
              onClick={() => setOpenModal(true)}
            >
              Create New Record
            </Button>
          </div>
        </div>
        <div>
          {openModal && (
            <CreateDNSRecord
              onSubmit={handleEditOrAddDns}
              open={openModal}
              onClose={() => setOpenModal(false)}
            />
          )}
          {recordToUpdate && (
            <UpdateDNSRecord
              initialDomainName={recordToUpdate.Name}
              initialRecordType={recordToUpdate.Type}
              initialRecordValue={recordToUpdate.ResourceRecords[0].Value}
              initialTTL={recordToUpdate.TTL}
              onSubmit={handleEditOrAddDns}
              onClose={() => {
                setOpenModal(false)
                setRecordToUpdate(null)
              }}
            />
          )}
        </div>
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
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}
                    align='center'
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}
                    align='center'
                  >
                    Value
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}
                    align='center'
                  >
                    TTL
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}
                    align='center'
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
                      key={row.Name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell
                        align='center'
                        sx={{ color: '#8B859B', fontSize: '15px' }}
                      >
                        {row.Name}
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ color: '#8B859B', fontSize: '15px' }}
                      >
                        {row.Type}
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ color: '#8B859B', fontSize: '15px' }}
                      >
                        {row.ResourceRecords[0].Value}
                      </TableCell>
                      <TableCell>{row.TTL}</TableCell>
                      <TableCell>
                        <div className='flex justify-center gap-4 items-center'>
                          <Button onClick={() => handleUpdateDNSRecord(row)}>
                            Update
                          </Button>
                          <Button onClick={() => handleDeleteDNSRecord(row)}>
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div className='flex justify-center'>
                    <Typography>No DNS Record</Typography>
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

export default Dashboard
