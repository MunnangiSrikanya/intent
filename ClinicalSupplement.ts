import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';
import DateComponent from './DateComponent';
import TableComponent from './TableComponent';

// Define the types for the state variables
interface FileType {
  type: string;
}

interface CodeType {
  code: string;
}

interface Column {
  field: string;
}

const ClinicalSupplement: React.FC = () => {
  const columns: Column[] = [
    { field: 'Carrier Name' },
    { field: 'Line of Business' },
    { field: 'Delete' }
  ];

  const [clinicalFileTypes, setClinicalFileTypes] = useState<FileType[]>([
    { type: 'type 1' },
    { type: 'type 2' },
    { type: 'type 3' }
  ]);

  const [codes, setCodes] = useState<CodeType[]>([
    { code: 'code 1' },
    { code: 'code 2' },
    { code: 'code 3' }
  ]);

  const [selectedFileType, setSelectedFileType] = useState<string>('Select');
  const [selectedCode, setSelectedCode] = useState<string>('Select');

  const handleFileTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedFileType(e.target.value as string);
  };

  const handleCodeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCode(e.target.value as string);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <TextField
            select
            label='State Code'
            size='small'
            margin='normal'
            variant='outlined'
            value={selectedCode}
            onChange={handleCodeChange}
            className='text-field'
          >
            <MenuItem value='Select'>Select</MenuItem>
            {codes.map(c => (
              <MenuItem key={c.code} value={c.code}>
                {c.code}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <TextField
            select
            label='Clinical File Type'
            size='small'
            margin='normal'
            variant='outlined'
            value={selectedFileType}
            onChange={handleFileTypeChange}
            className='text-field'
          >
            <MenuItem value='Select'>Select</MenuItem>
            {clinicalFileTypes.map(fileType => (
              <MenuItem key={fileType.type} value={fileType.type}>
                {fileType.type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <FormControlLabel control={<Checkbox />} label='Apply to all Carriers' />
      <TableComponent columns={columns} />
      <div style={{ margin: '1rem 0rem' }}>
        <DateComponent label='Effective Date' />
      </div>
      <div>
        <Button variant='contained' size='small' className='button' style={{ marginRight: '1rem' }}>
          Upload
        </Button>
        <TextField label='Please attach files in excel format' variant='filled' disabled style={{ width: '35%' }} size='small' />
      </div>
    </div>
  );
};

export default ClinicalSupplement;
