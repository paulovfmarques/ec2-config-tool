import { BehaviorSubject, map, combineLatestWith } from 'rxjs';
import { EC2InstancesType, RawDataType } from '_types';

type SelectedType = {
  location?: string | null;
  family?: string | null;
  operating_system?: string | null;
};

export const rawData$ = new BehaviorSubject<RawDataType[]>([]);

export const selected$ = new BehaviorSubject<SelectedType>({
  location: null,
  family: null,
  operating_system: null,
});

export const ec2Instances$ = new BehaviorSubject<EC2InstancesType[]>([]);

export const ec2InstancesWithLoading$ = new BehaviorSubject<{
  data: EC2InstancesType[];
  loading: boolean;
}>({
  data: [],
  loading: false,
});

function onlyUnique(
  value: string | number,
  index: number,
  self: (string | number)[],
) {
  return self.indexOf(value) === index;
}

export const vCpuOptions$ = ec2Instances$.pipe(
  map((ec2Instances) =>
    (ec2Instances as EC2InstancesType[])
      .map(({ vcpu }) => vcpu)
      .filter(onlyUnique)
      .sort((a, b) => a - b)
      .map((uniqueVcpu) => ({
        value: uniqueVcpu,
        label: uniqueVcpu,
      })),
  ),
);

export const memoryOptions$ = ec2Instances$.pipe(
  map((ec2Instances) =>
    (ec2Instances as EC2InstancesType[])
      .map(({ memory }) => memory)
      .filter(onlyUnique)
      .sort((a, b) => a - b)
      .map((uniqueMemory) => ({
        value: uniqueMemory,
        label: uniqueMemory,
      })),
  ),
);

export const location$ = rawData$.pipe(
  map((data) =>
    data
      .map(({ location }) => location)
      .filter(onlyUnique)
      .map((uniqueLocation) => ({
        value: uniqueLocation,
        label: uniqueLocation,
      })),
  ),
);

export const family$ = rawData$.pipe(
  map((data) =>
    data
      .map(({ family }) => family)
      .filter(onlyUnique)
      .map((uniqueFamily) => ({
        value: uniqueFamily,
        label: uniqueFamily,
      })),
  ),
);

export const operatingSystem$ = rawData$.pipe(
  map((data) =>
    data
      .map(({ operating_system }) => operating_system)
      .filter(onlyUnique)
      .map((uniqueOS) => ({
        value: uniqueOS,
        label: uniqueOS,
      })),
  ),
);

export const compositeSelection$ = rawData$.pipe(
  combineLatestWith(selected$),
  map(([rawData, selection]) => {
    let filteredData = rawData;

    if (selection.location && selection.family && selection.operating_system) {
      filteredData = filteredData.filter(
        ({ location, family, operating_system }) =>
          location === selection.location &&
          family === selection.family &&
          operating_system === selection.operating_system,
      );
    } else filteredData = [];

    return filteredData;
  }),
);
