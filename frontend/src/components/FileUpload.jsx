// FileUpload.js
import React, { useState } from 'react'
import { Button, Modal, Typography } from '@mui/material'

const FileUpload = ({ open, handleClose }) => {
  const [file, setFile] = useState(null)

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/records/upload/${
          file.type === 'application/json' ? 'json' : 'csv'
        }`,
        {
          method: 'POST',
          body: formData,
        },
      )

      if (response.ok) {
        console.log('File uploaded successfully')
        handleClose()
      } else {
        console.error('File upload failed')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          margin: '100px auto',
          width: '50%',
        }}
      >
        <Typography variant='h6'>Upload CSV or JSON File</Typography>
        <input type='file' onChange={handleFileChange} accept='.csv, .json' />
        <Button onClick={handleUpload} disabled={!file}>
          Upload
        </Button>
      </div>
    </Modal>
  )
}

export default FileUpload
