
  interface RequestData {
  pyID: string;
  pxCreateDateTime: string;
  pyStatusWork: string;
  ClientsName: string | null;
  pxUpdateDateTime: string;
  pxUpdateOpName: string;
  pxCreateOpName: string;
}

const getColumns = (): ColDef[] => [
  { headerName: 'Case ID', field: 'pyID' },
  { headerName: 'Clients Name', field: 'ClientsName' },
  { headerName: 'Updated Date', field: 'pxUpdateDateTime' },
  { headerName: 'Updated Name', field: 'pxUpdateOpName' },
  { headerName: 'Created Name', field: 'pxCreateOpName' },
  { headerName: 'Created Date', field: 'pxCreateDateTime' },
  {
    headerName: 'Status',
    field: 'pyStatusWork',
    cellRenderer: (params: any) => {
      const { textColor, backgroundColor } = getStatusStyles(params.value);
      const icon = getStatusIcon(params.value);
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginTop: '0.2rem',
            backgroundColor,
            lineHeight: 0,
            padding: '4px',
            borderRadius: '4px'
          }}
        >
          {icon}
          <span style={{ color: textColor }}>{params.value}</span>
        </div>
      );
    }
  }
];

useEffect(() => {
    const fetchData = async () => {
      try {
        const ItemList = await PCore.getDataApiUtils().getData('D_IntentList_1', '', 'app/polaris-ec'); // Replace with your actual data fetching logic
        if (ItemList?.status === 200) {
          setRequestData(ItemList?.data?.data || []);
          console.log(ItemList?.data?.data, 'Received Created list for Intent');
        }
      } catch (error) {
        console.error('Error fetching intent list:', error);
      }
    };
    fetchData();
  }, []);
  
  {alignment === 'tableView' && (
          <>
                        <ButtonGroupComponent setPageCard={setPageCard} setPageTable={setPageTable} alignment={alignment} setAlignment={setAlignment} />

            <div className='ag-theme-alpine table-view'>
              <AgGridReact ref={gridRef} rowData={currentPageRowsTable} columnDefs={getColumns()} pagination={false} domLayout='autoHeight' />
            </div>
            <CustomPagination count={Math.ceil(requestData.length / rowsPerPage)} page={pageTable} onChange={handleChangePageTable} />
          </>
        )}

        {alignment === 'gridView' && (
          <>
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ display: 'flex', justifyContent: 'flex-start' ,alignItems:'center' }}
              >
                <h2 className='reasearch-filters'><ExpandMore fontSize="large" sx={{ marginRight: 1 }} /></h2>
                <h2 className='reasearch-filters'>Research Filters</h2>
              </AccordionSummary>
              <AccordionDetails>
                <img src={ResearchFilter} alt="Research Filter" width="100%" height="auto" />
              </AccordionDetails>
            </Accordion>
            <ButtonGroupComponent setPageCard={setPageCard} setPageTable={setPageTable} alignment={alignment} setAlignment={setAlignment} />
            {currentPageRowsCard.map(item => (
              <Card key={item.pyID} className='grid-view'>
                <div className='card-display'>
                  <div>
                    <p>Case #</p>
                    <LightTooltip title={item.pyID} placement='top-start'>
                      <h4 className='id-display'> {item.pyID}</h4>
                    </LightTooltip>
                    <p>
                      {' '}
                      On {item.pxCreateDateTime} | For {item.pxCreateOpName}
                    </p>
                  </div>
                  <div>
                    {' '}
                    <p>Case Type</p>
                    {/* <LightTooltip title={item} placement='top-start'>
                      <p>{item}</p>
                      </LightTooltip> */}
                  </div>
                </div>
                <div className='card-display'>
                  <div>
                    <p>Filename</p>
                    {/* <LightTooltip title={item} placement='top-start' className='custom-tooltip'>
                      <p>{item}</p>
                      </LightTooltip> */}
                  </div>
                  <div>
                    <p>Effective Date</p>
                    <LightTooltip title={item.pxUpdateDateTime} placement='top-start'>
                      <p>{item.pxUpdateDateTime}</p>
                    </LightTooltip>
                  </div>
                </div>
                <Divider />
                <div
                  className='status-display'
                  style={{
                    backgroundColor: getStatusStyles(item.pyStatusWork).backgroundColor
                  }}
                >
                  {getStatusIcon(item.pyStatusWork)}
                  <p style={{ color: getStatusStyles(item.pyStatusWork).textColor }}>{item.pyStatusWork}</p>
                </div>
              </Card>
            ))}
            <CustomPagination count={Math.ceil(requestData.length / rowsPerPage)} page={pageCard} onChange={handleChangePageCard} />
          </>
        )}
