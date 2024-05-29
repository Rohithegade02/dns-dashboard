import { useState, useEffect, useContext } from 'react'
import {
  createDNSRecord,
  deleteDNSRecord,
  getAllDNSRecord,
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
import CreateDNSRecord from '../components/CreateDNSRecord'
import UpdateDNSRecord from '../components/UpdateDNSRecord'
import SearchIcon from '@mui/icons-material/Search'
import { AuthContext } from '../context/AuthProvider'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import DNSGraph from '../components/DNSGraph'

function DNSDashboard() {
  const [dnsRecords, setDNSRecords] = useState([])
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [openGraph, setOpenGraph] = useState(false)
  const [recordIndex, setRecordIndex] = useState(null)
  const params = new URLSearchParams(window.location.search)
  const code = params.get('id')
  const { logout } = useContext(AuthContext) //logout context to remove token on logout
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDNSRecords()
  }, [])
  //FUnction to fetch DNS Records
  async function fetchDNSRecords() {
    setLoading(true)
    try {
      const data = await getAllDNSRecord(code)
      setDNSRecords(data)
    } catch (error) {
      console.error('Error fetching DNS records:', error)
    } finally {
      setLoading(false)
    }
  }
  //Function to update or add DNS Record
  const handleEditOrAddDns = async recordData => {
    try {
      if (recordIndex) {
        const res = await updateDNSRecord(recordData, code)
        if (res.success) {
          toast.success(res.message)
          setOpenModal(false)
          fetchDNSRecords()
          setRecordIndex(null)
        } else {
          toast.error(res.message)
          setOpenModal(false)
        }
      } else {
        const res = await createDNSRecord(recordData, code)

        if (res.success) {
          toast.success(res.message)
          setOpenModal(false)
          fetchDNSRecords()
          setRecordIndex(null)
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
    setRecordIndex(record)
    setOpenModal(true)
  }
  //Function to delete DNs Record
  const handleDeleteDNSRecord = async record => {
    try {
      const res = await deleteDNSRecord(record, code)
      if (res.success) {
        toast.success(res.message)
        fetchDNSRecords()
      } else {
        toast.error(res?.message?.message || res.message)
        setOpenModal(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  //filtering data by search
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
            placeholder='Search By Name'
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
        <div className='flex justify-between w-[70vw] mb-5'>
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
          <div>
            <Button
              onClick={() => setOpenGraph(true)}
              sx={{
                padding: '10px',
                background: '#004CBE',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  background: '#004CBE',
                },
              }}
            >
              <SignalCellularAltIcon sx={{ marginRight: '5px' }} />
              Graph
            </Button>
          </div>
        </div>
        <div>
          {openModal && (
            <CreateDNSRecord
              domainName={dnsRecords[0]?.Name}
              onSubmit={handleEditOrAddDns}
              open={openModal}
              onClose={() => setOpenModal(false)}
            />
          )}
          {recordIndex && (
            <UpdateDNSRecord
              open={openModal}
              DomainName={recordIndex?.Name}
              RecordType={recordIndex?.Type}
              RecordValue={recordIndex?.ResourceRecords[0]?.Value}
              TTL={recordIndex?.TTL}
              onSubmit={handleEditOrAddDns}
              onClose={() => {
                setOpenModal(false)
                setRecordIndex(null)
              }}
            />
          )}

          {openGraph && (
            <DNSGraph
              dnsRecords={dnsRecords}
              open={openGraph}
              onClose={() => setOpenGraph(false)}
            />
          )}
        </div>
        <div>
          {loading ? (
            <div>
              <Typography>Loading ...</Typography>
            </div>
          ) : (
            <TableContainer>
              <Table sx={{ maxWidth: '70vw' }} aria-label='simple table'>
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
                    filteredData.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': {
                            backgroundColor: '#FBE7D7',
                          },
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
                            <Button
                              sx={{ background: '#fff', color: '#6366F1' }}
                              onClick={() => handleUpdateDNSRecord(row)}
                            >
                              Update
                            </Button>
                            <Button
                              sx={{ background: '#fff', color: '#6366F1' }}
                              onClick={() => handleDeleteDNSRecord(row)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <div className='w-[100%] text-center  flex justify-center items-center'>
                      <Typography>No DNS Record</Typography>
                    </div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default DNSDashboard
