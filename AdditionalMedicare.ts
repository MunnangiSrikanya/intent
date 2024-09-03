import React from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import DateComponent from './DateComponent';
import TableComponent from './TableComponent';

const columns = [
  { field: 'Carrier Name' },
  { field: 'Line of Business' },
  { field: 'Delete' }
];

const columnsTwo = [
  { field: 'File Name' },
  { field: 'Effective Date' },
  { field: 'Open Enrollment Date' },import React from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import DateComponent from './DateComponent';
import TableComponent from './TableComponent';
 
// Define the type for column configuration
interface Column {
  field: string;
}
 
// Define columns with type annotations
const columns: Column[] = [
  { field: 'Carrier Name' },
  { field: 'Line of Business' },
  { field: 'Delete' }
];
 
const columnsTwo: Column[] = [
  { field: 'File Name' },
  { field: 'Effective Date' },
  { field: 'Open Enrollment Date' },
  { field: 'Delete' }
];
 
// Define the functional component
const AdditionalMedicare: React.FC = () => {
  return (
<div>
<div>
<FormControlLabel control={<Checkbox />} label='Apply to all Carriers' />
<TableComponent columns={columns} />
</div>
 
      <Grid container spacing={3} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
<Grid item xs={4}>
<DateComponent label='Effective Date' />
</Grid>
<Grid item xs={4}>
<DateComponent label='Open Enrollment Date' />
</Grid>
<Grid item xs={4}>
<FormControlLabel control={<Checkbox />} label='Apply Date to all Carriers' />
</Grid>
</Grid>
 
      <div style={{ marginBottom: '1rem' }}>
<Button variant='contained' size='small' className='button' style={{ marginRight: '1rem' }}>
          Upload
</Button>
<TextField 
          label='Please attach files in excel format' 
          variant='filled' 
          disabled 
          style={{ width: '25%' }} 
          size='small' 
        />
</div>
 
      <TableComponent columns={columnsTwo} />
</div>
  );
};
 
export default AdditionalMedicare;
  { field: 'Delete' }
];

const AdditionalMedicare = () => {
  return (
    <div>
      <div>
        <FormControlLabel control={<Checkbox />} label='Apply to all Carriers' />
        <TableComponent columns={columns} />
      </div>
      <Grid container spacing={3} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        <Grid item xs={4}>
          <DateComponent label='Effective Date' />
        </Grid>
        <Grid item xs={4}>
          <DateComponent label='Open Enrollment Date' />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox />} label='Apply Date to all Carriers' />
        </Grid>
      </Grid>
      <div style={{ marginBottom: '1rem' }}>
        <Button variant='contained' size='small' className='button' style={{ marginRight: '1rem' }}>
          Upload
        </Button>
        <TextField label='Please attach files in excel format' variant='filled' disabled style={{ width: '25%' }} size='small' />
      </div>
      <TableComponent columns={columnsTwo} />
    </div>
  );
};

export default AdditionalMedicare;
