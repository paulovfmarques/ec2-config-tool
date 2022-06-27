import { timer } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { combineLatestWith, mergeMap, startWith } from 'rxjs/operators';
import { BASE_URL } from '_global';
import { ec2Instances$, rawData$ } from '_store';

export function getRawDataSubscrition() {
  return fromFetch(`${BASE_URL}/index.json`)
    .pipe(mergeMap((response) => response.json()))
    .subscribe((data) => rawData$.next(data));
}

export function getEC2InstancesSubscription(vmGroupOptions: string) {
  return fromFetch(`${BASE_URL}/${vmGroupOptions}`)
    .pipe(
      combineLatestWith(timer(1000)),
      mergeMap(([response]) => response.json()),
      startWith(false),
    )
    .subscribe((data) => ec2Instances$.next(data));
}
