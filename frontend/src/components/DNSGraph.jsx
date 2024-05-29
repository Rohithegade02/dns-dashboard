import { Modal, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
const recordTypeOption = [
  { value: 'A', name: 'A ' },
  { value: 'AAAA', name: 'AAAA' },
  { value: 'CNAME', name: 'CNAME' },
  { value: 'MX', name: 'MX ' },
  { value: 'NS', name: 'NS ' },
  { value: 'PTR', name: 'PTR ' },
  { value: 'SOA', name: 'SOA ' },
  { value: 'SRV', name: 'SRV ' },
  { value: 'TXT', name: 'TXT ' },
  { value: 'DNSSEC', name: 'DNSSEC' },
]
const DNSGraph = ({ dnsRecords, open, onClose }) => {
  const seriesData = recordTypeOption?.map(option => {
    const recordFound = dnsRecords?.some(
      record => record?.Type === option?.value,
    )
    return recordFound ? 1 : 0
  })

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        width: '50vw',
        height: '70vh',
        background: '#fff',
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <div className='flex justify-center mb-5'>
          <Typography fontSize={'20px'} fontWeight={600} color={'#004CBE'}>
            Name vs RecordType{' '}
          </Typography>
        </div>
        <div>
          <BarChart
            series={[{ data: seriesData }]}
            height={290}
            width={500}
            xAxis={[
              {
                data: recordTypeOption?.map(res => res?.name),
                scaleType: 'band',
              },
            ]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default DNSGraph
