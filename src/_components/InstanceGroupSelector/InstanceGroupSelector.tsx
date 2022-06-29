import './InstanceGroupSelector.styles.scss';
import React, { useMemo, Suspense } from 'react';
import { useObservableState } from 'observable-hooks';
import {
  compositeSelection$,
  family$,
  location$,
  operatingSystem$,
  selected$,
} from '_store';
import { SelectOptionsType } from '_types';

const Select = React.lazy(() => import('react-select'));

export default function InstanceGroupSelector() {
  const location = useObservableState(location$, []);
  const family = useObservableState(family$, []);
  const operatingSystem = useObservableState(operatingSystem$, []);

  const selected = useObservableState(selected$);
  const compositeSelection = useObservableState(compositeSelection$, []);

  const isAllOptionsSelected = useMemo(
    () => selected?.family && selected?.location && selected?.operating_system,
    [selected],
  );

  return (
    <div role="group" className="InstanceGroupSelector__wrapper">
      {/** LOCATION SELECTOR */}
      <div className="InstanceGroupSelector__field">
        <label className="InstanceGroupSelector__label" htmlFor="location">
          Location
        </label>
        <Suspense fallback="">
          <Select
            id="location"
            aria-label="Location options"
            placeholder="Select location..."
            isClearable
            isSearchable
            onChange={(a) =>
              selected$.next({
                ...selected$.value,
                location: (a as SelectOptionsType)?.value,
              })
            }
            options={location}
          />
        </Suspense>
      </div>

      {/** FAMILY SELECTOR */}
      <div className="InstanceGroupSelector__field">
        <label className="InstanceGroupSelector__label" htmlFor="type">
          Type
        </label>
        <Suspense fallback="">
          <Select
            id="type"
            aria-label="Type options"
            placeholder="Select type..."
            isClearable
            isSearchable
            onChange={(a) =>
              selected$.next({
                ...selected$.value,
                family: (a as SelectOptionsType)?.value,
              })
            }
            options={family}
          />
        </Suspense>
      </div>

      {/** OS SELECTOR */}
      <div className="InstanceGroupSelector__field">
        <label className="InstanceGroupSelector__label" htmlFor="os">
          Operating system
        </label>
        <Suspense fallback="">
          <Select
            id="os"
            placeholder="Select operating system..."
            aria-label="Operating system options"
            isClearable
            isSearchable
            onChange={(a) =>
              selected$.next({
                ...selected$.value,
                operating_system: (a as SelectOptionsType)?.value,
              })
            }
            options={operatingSystem}
          />
        </Suspense>
      </div>
      {compositeSelection.length === 0 && isAllOptionsSelected && (
        <p className="InstanceGroupSelector__warning">No instances found</p>
      )}
    </div>
  );
}
