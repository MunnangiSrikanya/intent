import React, { useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import { useDropzone, DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';

interface FileUploadComponentProps {
  attachmentClick: boolean;
  setAttachmentClick: (value: boolean) => void;
}

interface OpenMessage {
  open: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  severity: 'success' | 'error' | 'info' | 'warning';
  msg: string;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ attachmentClick, setAttachmentClick }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [openMessage, setOpenMessage] = useState<OpenMessage>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    severity: 'success',
    msg: ''
  });

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
        <div {...(getRootProps() as DropzoneRootProps)} style={{ textAlign: 'center' }}>
          <input {...(getInputProps() as DropzoneInputProps)} />
          <div style={{ border: '1px dashed black', padding: '1.75rem 4rem' }}>
            {!isDragActive ? 'Drag and drop files here' : 'Drop files here'}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginTop: '0.5rem' }}>
          <p style={{ margin: 0 }}>Files supported: CSV, XLSX, XLS</p>
          <p style={{ margin: 0 }}>Maximum size: 20MB</p>
        </div>
        {uploadedFiles.length !== 0 && <b><p>Uploaded files</p></b>}
        {uploadedFiles.map((file) => (
          <Card key={file.name} style={{ padding: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <AttachFileIcon style={{ transform: 'rotate(45deg)' }} fontSize='small' />&nbsp;{file.name}
            </p>
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
  );
}

export default FileUploadComponent;
