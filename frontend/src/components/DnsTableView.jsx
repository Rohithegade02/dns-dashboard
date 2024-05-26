import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { deleteRecord, getAllRecord } from '../api/record'

const DnsTableView = ({ domains, setEditMode, setData, setOpen }) => {
  const [domainsData, setDomainsData] = useState([])

  const getAllRecordData = async () => {
    try {
      const data = await getAllRecord()
      console.log(data)
      setDomainsData(data.message)
    } catch (err) {
      console.error(err)
    }
  }
  const handleDelete = async id => {
    try {
      await deleteRecord(id)
      await getAllRecordData()
    } catch (err) {
      console.log(err)
    }
  }
  const handleEdit = record => {
    setEditMode('edit')
    setData(record)
    setOpen(true)
  }

  useEffect(() => {
    getAllRecordData()
  }, [domains])
  return (
    <div>
      {domainsData?.length > 0 ? (
        <div>
          <div>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Domain</TableCell>
                    <TableCell align='right'>Record Type</TableCell>
                    <TableCell align='right'>Name</TableCell>
                    <TableCell align='right'>Value</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {domainsData.map(row => (
                    <TableRow
                      key={row.domainUrl}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell align='right'>{row.domainUrl}</TableCell>
                      <TableCell align='right'>{row.recordType}</TableCell>
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.value}</TableCell>
                      <TableCell align='right'>
                        <Button onClick={() => handleDelete(row._id)}>
                          Delete
                        </Button>
                        <Button onClick={() => handleEdit(row)}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default DnsTableView
