import { BehaviorSubject, map, combineLatestWith } from 'rxjs';
import { EC2InstancesType, RawDataType } from '_types';

type SelectedType = {
  location?: string | null;
  family?: string | null;
  operating_system?: string | null;
};

function onlyUnique(
  value: string | number,
  index: number,
  self: (string | number)[],
) {
  return self.indexOf(value) === index;
}

/** Combination: array of objects containing the combination of
 * all possible values for location, family and operating_system.
 * Also contains a unique file name used to fetch the instances with an API call
 * */

/** Stores the list of possible combinations*/
export const rawData$ = new BehaviorSubject<RawDataType[]>([]);

/** Stores the selected values from the 3 required fields*/
export const selected$ = new BehaviorSubject<SelectedType>({
  location: null,
  family: null,
  operating_system: null,
});

/** Stores all the instances resulting from a combination */
export const ec2Instances$ = new BehaviorSubject<EC2InstancesType[]>([]);

/** A structure to control the loading state for the ec2Instance's API request  */
export const ec2InstancesWithLoading$ = new BehaviorSubject<{
  data: EC2InstancesType[];
  loading: boolean;
}>({
  data: [],
  loading: false,
});

/** Stores all unique vCPU values from the loaded combination */
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

/** Stores all unique memory values from the loaded combination */
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

/** Stores all unique location values */
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

/** Stores all unique family values */
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

/** Stores all unique operating_system values */
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

/** Stores the combinations of all 3 selected input fields */
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
