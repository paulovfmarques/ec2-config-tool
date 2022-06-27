import { useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { EC2InstancesType } from '_types';
import { useObservableState } from 'observable-hooks';
import { ec2Instances$ } from '_store';

export default function InstancesTable() {
  const ec2Instances: EC2InstancesType[] = useObservableState(
    ec2Instances$,
    [],
  );

  const mappedRows = useMemo(
    () =>
      ec2Instances.map((instance) => ({
        id: instance.server_name.split(' ')[0],
        server_name: instance.server_name.split(' ')[0],
        vcpu: instance.vcpu,
        memory: instance.memory,
        pricing: instance.cashflows[0].value_per_server, // TODO: make it so there can be many cashflows
        recurring: instance.cashflows[0].recurring,
      })),
    [ec2Instances],
  );

  const columns: GridColDef[] = [
    {
      field: 'server_name',
      headerName: 'Server',
      width: 150,
      headerAlign: 'center',
    },
    { field: 'vcpu', headerName: 'vCPU', width: 80, headerAlign: 'center' },
    {
      field: 'memory',
      headerName: 'Memory (GIB)',
      width: 150,
      headerAlign: 'center',
    },
    {
      field: 'pricing',
      headerName: 'Pricing $',
      type: 'number',
      width: 150,
      headerAlign: 'center',
    },
    {
      field: 'recurring',
      headerName: 'Recurring',
      sortable: false,
      width: 150,
      headerAlign: 'center',
    },
  ];

  return (
    <div style={{ height: 385, width: 735 }}>
      <DataGrid
        rows={mappedRows}
        columns={columns}
        rowHeight={45}
        pageSize={6}
        rowsPerPageOptions={[6]}
        onRowClick={(params, event, details) => {
          console.log('params', params);
          console.log('details', details);
        }}
        sx={{
          boxShadow: 2,
          '& .MuiDataGrid-cell:hover': {
            cursor: 'pointer',
          },
        }}
      />
    </div>
  );
}
