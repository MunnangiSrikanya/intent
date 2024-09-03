import React from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextareaAutosize, TextField } from '@material-ui/core';
import DateComponent from './DateComponent';
import TableComponent from './TableComponent';
 
// Define the type for column configuration
interface Column {
  field: string;
}
 
// Define the type for the columns prop
interface TableComponentProps {
  columns: Column[];
}
 
const CmsBid: React.FC = () => {
  // Define the columns configuration
  const columns: Column[] = [
    { field: 'File Name' },
    { field: 'Effective Date' },
    { field: 'Open Enrollment Date' },
    { field: 'Delete' }
  ];
 
  return (
<div>
<Grid container spacing={3}>
<Grid item xs={5}>
<label>Carrier Name</label>
<br />
<TextareaAutosize minRows={2} style={{ width: '90%' }} />
</Grid>
<Grid item xs={5}>
<label>Line of Business</label>
<p>--</p>
</Grid>
</Grid>
 
      <Grid container spacing={3} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
<Grid item xs={5}>
<DateComponent label='Effective Date' />
</Grid>
<Grid item xs={5}>
<DateComponent label='Open Enrollment Date' />
</Grid>
<Grid item xs={2}>
<FormControlLabel control={<Checkbox />} label='Apply Date to all Carriers' />
</Grid>
</Grid>
 
      <div style={{ marginBottom: '1rem' }}>
<Button variant='contained' size='small' className='button' style={{ marginRight: '1rem' }}>
          Upload
</Button>
<TextField label='Please upload CMS BID Long form in Excel format' variant='filled' disabled style={{ width: '50%' }} />
</div>
 
      <TableComponent columns={columns} />
</div>
  );
};
 
export default CmsBid;