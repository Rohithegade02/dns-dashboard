import { useState, useEffect } from 'react'
import {
  createDNSRecord,
  deleteDNSRecord,
  listHostedZones,
  updateDNSRecord,
} from '../api/dns'
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import CreateDNSRecord from './createDNSRecord'
import UpdateDNSRecord from './UpdateDNSRecord'
// import { UserPlusIcon } from "@heroicons/react/24/solid";
// import CreateDNSRecord from "./createDNSpopup";
// import UpdateDNSRecord from "./updateDNSpopup";
// import { ToastContainer } from "react-toastify";
// import { useNavigate ,useLocation} from "react-router-dom";

function Dashboard() {
  const [dnsRecords, setDNSRecords] = useState([])
  const [openModal, setOpenModal] = useState(false)
  //   const [isCreateOrUpdateDNSRecordOpen, setIsCreateOrUpdateDNSRecordOpen] =
  //     useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null)
  //   const [searchQuery, setSearchQuery] = useState("");
  const params = new URLSearchParams(window.location.search)
  const code = params.get('id')
  //   console.log(code)
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const { title } = location.state || {};

  //   const handleSearch = (event) => {
  //     setSearchQuery(event.target.value);
  //   };

  // const filteredDNSRecords = dnsRecords.filter((record) =>
  //   record.Name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  useEffect(() => {
    fetchDNSRecords()
  }, [])

  async function fetchDNSRecords() {
    await listHostedZones(code).then(res => setDNSRecords(res))
  }
  const handleCreateOrUpdateDNSRecord = async recordData => {
    try {
      if (recordToUpdate) {
        console.log(code)
        await updateDNSRecord(recordData, code)
      } else {
        await createDNSRecord(recordData, code)
        fetchDNSRecords()
        setOpenModal(false) // Close the popup after successful creation or update
        setRecordToUpdate(null)
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
      await deleteDNSRecord(record, code)
      fetchDNSRecords() // Refresh DNS records after deletion
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='h-full w-full'>
        <div>
          <Button onClick={() => setOpenModal(true)}>Create New Record</Button>
        </div>
        <div>
          {openModal && (
            <CreateDNSRecord
              onSubmit={handleCreateOrUpdateDNSRecord}
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
              onSubmit={handleCreateOrUpdateDNSRecord}
              onClose={() => {
                setOpenModal(false)
                setRecordToUpdate(null)
              }}
            />
          )}
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Type</TableCell>
                <TableCell align='center'>Value</TableCell>
                <TableCell>TTL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dnsRecords?.length > 0 ? (
                dnsRecords.map(row => (
                  <TableRow
                    key={row.Name}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align='center'>{row.Name}</TableCell>
                    <TableCell align='center'>{row.Type}</TableCell>
                    <TableCell align='center'>
                      {row.ResourceRecords[0].Value}
                    </TableCell>
                    <TableCell>{row.TTL}</TableCell>
                    <div>
                      <Button onClick={() => handleUpdateDNSRecord(row)}>
                        Update
                      </Button>
                      <Button onClick={() => handleDeleteDNSRecord(row)}>
                        Delete
                      </Button>
                    </div>
                  </TableRow>
                ))
              ) : (
                <div>No DNS Record</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default Dashboard

{
  /* {isCreateOrUpdateDNSRecordOpen && (
          <CreateDNSRecord
            onSubmit={handleCreateOrUpdateDNSRecord}
            onClose={() => setIsCreateOrUpdateDNSRecordOpen(false)}
          />
        )}

        {/* Render the UpdateDNSRecord component as a popup */
}
// {recordToUpdate && (
//     <UpdateDNSRecord
//       initialDomainName={recordToUpdate.Name}
//       initialRecordType={recordToUpdate.Type}
//       initialRecordValue={recordToUpdate.ResourceRecords[0].Value}
//       initialTTL={recordToUpdate.TTL}
//       onSubmit={handleCreateOrUpdateDNSRecord}
//       onClose={() => {
//         setIsCreateOrUpdateDNSRecordOpen(false);
//         setRecordToUpdate(null);
//       }}
//     />
//   )} */}
