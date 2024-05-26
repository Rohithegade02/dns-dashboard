import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const DnsTableView = ({ domains, setDomains, onEdit }) => {
  const handleDelete = url => {
    const deleteItem = domains.filter(item => item.domainUrl !== url)
    setDomains(deleteItem)
  }
  return (
    <div>
      <h1>Hello</h1>
      {domains.length > 0 ? (
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
                  {domains.map(row => (
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
                      <TableCell align='right'>{row.name}</TableCell>
                      <TableCell align='right'>
                        <Button onClick={() => handleDelete(row.domainUrl)}>
                          Delete
                        </Button>
                        <Button onClick={onEdit}>Edit</Button>
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
