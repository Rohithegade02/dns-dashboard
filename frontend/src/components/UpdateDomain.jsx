import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Modal } from '@mui/material'

const UpdateDomain = ({
  initialDomainName,
  initialComment,
  onSubmit,
  onClose,
}) => {
  const [domainName, setDomainName] = useState(initialDomainName)

  const [newDescription, setNewDescription] = useState(initialComment)

  const handleSubmit = () => {
    const newDomain = {
      domainName,
      description: newDescription,
    }
    onSubmit(newDomain)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ background: '#d2d2d2', height: '100vh', width: '50vw' }}
    >
      <div>
        <Typography variant='h6' gutterBottom>
          Create HostedZone
        </Typography>
        <Typography>Domain Name</Typography>
        <TextField
          fullWidth
          id='domain-name'
          className='mb-2'
          value={domainName}
          disabled={true}
        />
        <Typography>Description</Typography>
        <TextField
          fullWidth
          id='description'
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />

        <Button variant='contained' onClick={handleSubmit}>
          Update HostedZone
        </Button>
      </div>
    </Modal>
  )
}

export default UpdateDomain
