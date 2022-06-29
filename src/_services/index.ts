import { fromFetch } from 'rxjs/fetch';
import { combineLatestWith, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BASE_URL } from '_global';
import { ec2InstancesWithLoading$, rawData$ } from '_store';

export function getRawDataSubscrition() {
  return fromFetch(`${BASE_URL}/index.json`)
    .pipe(mergeMap((response) => response.json()))
    .subscribe((data) => rawData$.next(data));
}

export function getEC2InstancesSubscription(vmGroupOptions: string) {
  /** Setting initial value, for loading state control */
  ec2InstancesWithLoading$.next({ data: [], loading: true });

  return fromFetch(`${BASE_URL}/${vmGroupOptions}`)
    .pipe(
      /** Since the API call is fast, we're delaying
       * it so that the layout doesn't shift too quicly
       *  from the load spinner */
      combineLatestWith(timer(500)),
      mergeMap(([response]) => response.json()),
    )
    .subscribe((data) =>
      ec2InstancesWithLoading$.next({ data, loading: false }),
    );
}
