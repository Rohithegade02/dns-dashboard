import { useState } from 'react'
import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { InputLabel, Modal } from '@mui/material'

const UpdateDomain = ({ DomainName, Comment, onSubmit, onClose, open }) => {
  const [newDomainName, setDomainName] = useState(DomainName)

  const [newDescription, setNewDescription] = useState(Comment)

  const handleSubmit = () => {
    const data = {
      newDomainName,
      description: newDescription,
    }
    onSubmit(data)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ background: '#6366F1', height: '100vh', width: '30vw' }}
    >
      <div className='p-5 flex flex-col  justify-center h-[100vh]  gap-10'>
        <div className='mx-auto'>
          <Typography fontSize={'20px'} fontWeight={600} color={'#fff'}>
            Update DNS Record
          </Typography>
        </div>

        <div>
          <InputLabel sx={{ color: '#fff' }}>Domain Name</InputLabel>
          <TextField
            fullWidth
            value={newDomainName}
            placeholder='Domain Name'
            sx={{ color: '#fff', background: '#fff', borderRadius: '10px' }}
            disabled={true}
          />
        </div>
        <div>
          <InputLabel sx={{ color: '#fff' }}>Description</InputLabel>
          <TextField
            fullWidth
            value={newDescription}
            sx={{ color: '#fff', background: '#fff', borderRadius: '10px' }}
            onChange={e => setNewDescription(e.target.value)}
          />
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{
              padding: '10px',
              background: '#fff',
              color: '#6366F1',
              textTransform: 'none',
              '&:hover': {
                background: '#fff',
              },
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateDomain
