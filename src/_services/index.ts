import { fromFetch } from 'rxjs/fetch';
import { mergeMap, startWith } from 'rxjs/operators';
import { BASE_URL } from '_global';
import { ec2Instances$, rawData$ } from '_store';

export function getRawDataSubscrition() {
  return fromFetch(`${BASE_URL}/index.json`)
    .pipe(
      mergeMap((response) => response.json()),
    )
    .subscribe((data) => rawData$.next(data));
}

export function getEC2InstancesSubscription(vmGroupOptions: string) {
  return fromFetch(`${BASE_URL}/${vmGroupOptions}`)
    .pipe(
      mergeMap((response) => response.json()),
      startWith([]),
    )
    .subscribe((data) => ec2Instances$.next(data));
}