import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, MenuItem, Snackbar, styled, TextField, Typography } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';
import CmsBid from './CmsBid';
import AdditionalMedicare from './AdditionalMedicare';
import ClinicalSupplement from './ClinicalSupplement';
import DateComponent from './DateComponent';
import './CreateIntent.css';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Alert } from '@material-ui/lab';
import SnackbarComponent from '../SnackbarComponent';

interface Client {
  pxObjClass: string;
  ResourceID: string;
  AccountName: string;
}

interface FileType {
  TypeName: string;
}

interface OpenMessage {
  open: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  severity: 'success' | 'error' | 'warning' | 'info';
  msg: string;
}

interface IntentProps {
  setNewIntentState: (state: boolean) => void;
}

const Intent: React.FC<IntentProps> = ({ setNewIntentState }) => {
  const [selectedFileType, setSelectedFileType] = useState<string>('Select');
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [selectedClientName, setSelectedClientName] = useState<string>('');
  const [ResourceID, setResourceId] = useState<string | null>(null);
  const [attachmentClick, setAttachmentClick] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [openMessage, setOpenMessage] = useState<OpenMessage>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    severity: 'success',
    msg: ''
  });

  const clientList: { data: Client[] } = {
    // The clientList object is static here, but you might be fetching it from an API
    data: [
      // Add your client data here
    ]
  };

  const handleClientNameChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedClientName(e.target.value as string);
  };

  const handleFileTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedFileType(e.target.value as string);
  };

  useEffect(() => {
    const fetchFileTypes = async () => {
      try {
        const resp = await axios.get<FileType[]>('https://mocki.io/v1/8d5f55b1-ac33-40f2-af3d-dea14e85d8fe');
        if (resp.data) {
          setFileTypes(resp.data.map(item => item.TypeName));
        }
      } catch (error) {
        console.error('Error fetching file types:', error);
      }
    };

    fetchFileTypes();
  }, []);

  const handleClick = async () => {
    const options = {
      ClientList: 'b7c2bdf4-3031-4b3d-ad35-135030a4fb33',
      FileTypeNew: selectedFileType
    };
    try {
      // Implement your API call logic here
      // const creatcase = await PCore.getMashupApi().createCase('ESI-Cust-PolarisEP-Work-Intent', 'app', options);
    } catch (e) {
      console.log(e);
    }
    setOpenMessage({ ...openMessage, open: true, msg: 'Intent Submitted Successfully' });
  };

  const handleAttachment = () => {
    setAttachmentClick(true);
  };

  const handleClose = () => {
    setAttachmentClick(false);
    setUploadedFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.csv, .xlsx, .xls',
    maxSize: 20 * 1024 * 1024,
    onDrop: (files: File[]) => {
      const validFiles = files.filter(file => 
        ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        .includes(file.type) || 
        ['.csv', '.xlsx', '.xls']
        .includes(file.name.slice(-4))
      );
      setUploadedFiles(validFiles);
    }
  });

  const handleUpload = () => {
    if (uploadedFiles.length > 0) {
      setAttachmentClick(false);
      setUploadedFiles([]);
      setOpenMessage({ ...openMessage, open: true, msg: 'File Uploaded Successfully!!' });
    }
  };

  const uploadButtonStyle = {
    backgroundColor: uploadedFiles.length > 0 ? '#035C67' : '',
    color: uploadedFiles.length > 0 ? 'white' : 'black',
    marginLeft: '1rem'
  };

  return (
    <>
      <Card className='card'>
        <div className='submit-intent-card-header'>
          <h2 style={{ color: '#035C67' }}>New Intent Request</h2>
          <Button variant='outlined' size='small' onClick={handleAttachment} style={{ borderRadius: '2rem' }}>
            Attach files and documents &nbsp;<AttachFileIcon style={{ transform: 'rotate(45deg)' }} fontSize='small' />
          </Button>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={attachmentClick}
            BackdropProps={{
              style: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            }}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{ padding: '1rem 1rem 0 1.5rem', margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" style={{ color: '#035C67', margin: 0 }}><b>Upload files and documents</b></Typography>
                <IconButton onClick={handleClose} style={{ padding: 0 }}><CloseIcon /></IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
              <div {...getRootProps()} style={{ textAlign: 'center' }}>
                <input {...getInputProps()} />
                <div style={{ border: '1px dashed black', padding: '1.75rem 4rem' }}>
                  {!isDragActive ? 'Drag and drop files here or choose files' : 'Drop files here'}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginTop: '0.5rem' }}>
                <p style={{ margin: 0 }}>Files supported: CSV, XLSX, XLS</p>
                <p style={{ margin: 0 }}>Maximum size: 20MB</p>
              </div>
              {uploadedFiles.length !== 0 && <b><p>Uploaded files</p></b>}
              {uploadedFiles.map((file) => (
                <Card key={file.name} style={{ padding: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}><AttachFileIcon style={{ transform: 'rotate(45deg)' }} fontSize='small' />&nbsp;{file.name}</p>
                  <CloseIcon onClick={() => setUploadedFiles([])} />
                </Card>
              ))}
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center', paddingTop: '1.75rem' }}>
              <Button autoFocus onClick={handleClose} color="default" variant='outlined' size='small'>
                Cancel
              </Button>
              <Button autoFocus onClick={handleUpload} color="default" variant='outlined' style={uploadButtonStyle} size='small'>
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Divider />
        <Card className='main-card'>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <span
              style={{
                backgroundColor: '#035C67',
                borderRadius: '50%',
                color: 'white',
                padding: '10px 14px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginRight: '1rem'
              }}
            >
              DS
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: '500' }}>Create Intent</span>
          </div>

          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                select
                label='Client Name'
                margin='normal'
                required
                variant='outlined'
                size='small'
                className='text-field'
                onChange={handleClientNameChange}
                value={selectedClientName}
              >
                {clientList.data.map((client) => (
                  <MenuItem key={client.ResourceID} value={client.AccountName}>{client.AccountName}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                select
                label='File Type'
                margin='normal'
                required
                variant='outlined'
                size='small'
                className='text-field'
                onChange={handleFileTypeChange}
                value={selectedFileType}
              >
                {fileTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <CmsBid />
          <AdditionalMedicare />
          <ClinicalSupplement />
          <DateComponent />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleClick}
              style={{ borderRadius: '2rem' }}
            >
              Submit Intent
            </Button>
          </div>
        </Card>
      </Card>
      <SnackbarComponent
        open={openMessage.open}
        severity={openMessage.severity}
        onClose={() => setOpenMessage({ ...openMessage, open: false })}
        message={openMessage.msg}
      />
    </>
  );
};

export default Intent;
