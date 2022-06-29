interface Cashflows {
  recurring: string;
  flowtype: string;
  flowname: string;
  value_per_server: number;
  value_per_kwh?: any;
  value_per_ru?: any;
  value_cagr: number;
  active: boolean;
  discount: number;
}

export type EC2InstancesType = {
  family: string;
  operating_system: string;
  location: string;
  server_name: string;
  vcpu: number;
  memory: number;
  power: number;
  ru: number;
  decommissiontime: number;
  description: string;
  cashflows: Cashflows[];
};

export type RawDataType = {
  family: string;
  filename: string;
  location: string;
  operating_system: string;
};

export type TableRowsType = {
  id: string;
  server_name: string;
  vcpu: number;
  memory: number;
  details: string;
};

export type SelectOptionsType = {
  value: string;
  label: string;
};

export type FilterOptionsType = {
  value: number;
  label: number;
};
