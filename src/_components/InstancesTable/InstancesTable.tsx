import './InstancesTable.styles.scss';
import React, { useMemo, useState, useEffect, Suspense } from 'react';
import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { useObservableState } from 'observable-hooks';
import { ec2InstancesWithLoading$, vCpuOptions$, memoryOptions$ } from '_store';
import { DetailsCard } from '_components';
import { TableRowsType, FilterOptionsType } from '_types';

const DataGrid = React.lazy(() =>
  import('@mui/x-data-grid').then((module) => ({ default: module.DataGrid })),
);

const Select = React.lazy(() => import('react-select'));

function InstancesTable() {
  const [selectedRowsID, setSelectedRowsID] = useState<GridRowId | null>(null);
  const [selectedVcpu, setSelectedVcpu] = useState<number | null>();
  const [selectedMemory, setSelectedMemory] = useState<number | null>();

  const ec2Instances = useObservableState(ec2InstancesWithLoading$);
  const vCpuOptions = useObservableState(vCpuOptions$);
  const memoryOptions = useObservableState(memoryOptions$);

  useEffect(() => {
    setSelectedRowsID(null);
  }, [ec2Instances]);

  const mappedRows: TableRowsType[] =
    useMemo(
      () =>
        ec2Instances.data
          ?.map((instance) => ({
            id: instance.server_name,
            server_name: instance.server_name.split(' ')[0],
            vcpu: instance.vcpu,
            memory: instance.memory,
            details: 'show',
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
    ) || [];

  const columns: GridColDef[] = useMemo(
    () => [
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
      {
        field: 'details',
        headerName: 'Details',
        renderCell: (params) => (
          <button
            className={`
          InstancesTable__details-button
          ${
            selectedRowsID === params.row.id &&
            'InstancesTable__details--active'
          }
          `}
            onClick={() => setSelectedRowsID(params.row.id)}
          >
            {params.value}
          </button>
        ),
        width: 90,
        headerAlign: 'center',
      },
    ],
    [selectedRowsID, setSelectedRowsID],
  );

  return (
    <div className="InstancesTable__wrapper">
      <div className="InstancesTable__container">
        <div className="InstancesTable__field-wrapper">
          {/** vCPU FILTER SELECTOR */}
          <div className="InstancesTable__field">
            <label className="InstanceGroupSelector__label" htmlFor="vcpu">
              vCPU
            </label>
            <Suspense fallback="">
              <Select
                id="vcpu"
                placeholder="Filter..."
                aria-label="vCpu options"
                isClearable
                isSearchable
                onChange={(a) =>
                  setSelectedVcpu((a as FilterOptionsType)?.value)
                }
                options={vCpuOptions}
                isDisabled={!vCpuOptions}
              />
            </Suspense>
          </div>

          {/** MEMORY FILTER SELECTOR */}
          <div className="InstancesTable__field">
            <label className="InstanceGroupSelector__label" htmlFor="memory">
              Memory
            </label>
            <Suspense fallback="">
              <Select
                id="memory"
                placeholder="Filter..."
                aria-label="Memory options"
                isClearable
                isSearchable
                onChange={(a) =>
                  setSelectedMemory((a as FilterOptionsType)?.value)
                }
                options={memoryOptions}
                isDisabled={!memoryOptions}
              />
            </Suspense>
          </div>
        </div>

        {/** INSTANCES TABLE */}
        <Suspense fallback="">
          <DataGrid
            loading={ec2Instances.loading}
            rows={mappedRows}
            columns={columns}
            rowHeight={45}
            pageSize={5}
            rowsPerPageOptions={[5]}
            pagination
            disableSelectionOnClick
            checkboxSelection
            onSelectionModelChange={(_selection) => {
              // for future actions
            }}
            sx={{
              boxShadow: 1,
              '& .MuiDataGrid-cell': {
                justifyContent: 'center',
              },
            }}
          />
        </Suspense>
      </div>

      {/** INSTANCE'S DETAILS CARD */}
      {selectedRowsID && ec2Instances.data.length > 0 && (
        <DetailsCard
          close={() => setSelectedRowsID(null)}
          details={ec2Instances.data?.filter(
            (i) => i?.server_name === selectedRowsID,
          )}
        />
      )}
    </div>
  );
}

export default React.memo(InstancesTable);
