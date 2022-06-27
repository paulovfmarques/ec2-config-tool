import './InstancesTable.styles.scss';
import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useObservableState } from 'observable-hooks';
import { ec2Instances$, vCpuOptions$, memoryOptions$ } from '_store';

function InstancesTable() {
  const [selectedRowsIDs, setSelectedRowsIDs] = useState<GridRowId[]>([]);
  const [selectedVcpu, setSelectedVcpu] = useState<number | null>();
  const [selectedMemory, setSelectedMemory] = useState<number | null>();

  const ec2Instances = useObservableState(ec2Instances$);
  const vCpuOptions = useObservableState(vCpuOptions$);
  const memoryOptions = useObservableState(memoryOptions$);

  const mappedRows = useMemo(
    () =>
      ec2Instances
        .map((instance) => ({
          id: instance.server_name,
          server_name: instance.server_name.split(' ')[0],
          vcpu: instance.vcpu,
          memory: instance.memory,
          pricing: instance.cashflows[0].value_per_server, // TODO: make it so there can be many cashflows
          recurring: instance.cashflows[0].recurring,
        }))
        .filter(({ vcpu }) => {
          if (!selectedVcpu) return true;
          return vcpu === selectedVcpu;
        })
        .filter(({ memory }) => {
          if (!selectedMemory) return true;
          return memory === selectedMemory;
        }),
    [ec2Instances, selectedVcpu, selectedMemory],
  );

  const columns: GridColDef[] = [
    {
      field: 'server_name',
      headerName: 'Server',
      width: 150,
      headerAlign: 'center',
    },
    { field: 'vcpu', headerName: 'vCPU', width: 110, headerAlign: 'center' },
    {
      field: 'memory',
      headerName: 'Memory (GIB)',
      width: 150,
      headerAlign: 'center',
    },
  ];

  return (
    <div className="InstancesTable__wrapper">
      <div className="InstanceGroupSelector__field">
        <Select
          aria-label="vCpu options"
          isClearable
          isSearchable
          onChange={(a) => setSelectedVcpu(a?.value)}
          options={vCpuOptions}
          isDisabled={!vCpuOptions}
        />
      </div>
      <div className="InstanceGroupSelector__field">
        <Select
          aria-label="Memory options"
          isClearable
          isSearchable
          onChange={(a) => setSelectedMemory(a?.value)}
          options={memoryOptions}
          isDisabled={!memoryOptions}
        />
      </div>
      <DataGrid
        rows={mappedRows}
        columns={columns}
        rowHeight={45}
        pageSize={5}
        rowsPerPageOptions={[5]}
        pagination
        checkboxSelection
        isRowSelectable={(params) => {
          if (
            selectedRowsIDs.length === 2 &&
            !selectedRowsIDs.includes(params.id)
          )
            return false;
          return true;
        }}
        onSelectionModelChange={(a) => {
          setSelectedRowsIDs(a);
        }}
        sx={{
          boxShadow: 2,
          '& .MuiDataGrid-cell': {
            cursor: 'pointer',
            justifyContent: 'center',
          },
        }}
      />
    </div>
  );
}

export default React.memo(InstancesTable);
