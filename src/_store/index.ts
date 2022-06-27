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

export const ec2Instances$ = new BehaviorSubject<EC2InstancesType[] | boolean>([]);

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index;
}

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
