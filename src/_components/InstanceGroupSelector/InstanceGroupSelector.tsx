import './InstanceGroupSelector.styles.scss';
import { useMemo } from 'react';
import Select from 'react-select';
import { useObservableState } from 'observable-hooks';
import {
  compositeSelection$,
  family$,
  location$,
  operatingSystem$,
  selected$,
} from '_store';

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
    <div className="InstanceGroupSelector__wrapper">
      {/** LOCATION SELECTOR */}
      <div className="InstanceGroupSelector__field">
        <label className="InstanceGroupSelector__label" htmlFor="location">
          Location
        </label>
        <Select
          id="location"
          aria-label="Location options"
          placeholder="Select location..."
          isClearable
          isSearchable
          onChange={(a) =>
            selected$.next({ ...selected$.value, location: a?.value })
          }
          options={location}
        />
      </div>

      {/** FAMILY SELECTOR */}
      <div className="InstanceGroupSelector__field">
        <label className="InstanceGroupSelector__label" htmlFor="type">
          Type
        </label>
        <Select
          id="type"
          aria-label="Type options"
          placeholder="Select type..."
          isClearable
          isSearchable
          onChange={(a) =>
            selected$.next({ ...selected$.value, family: a?.value })
          }
          options={family}
        />
      </div>

      {/** OS SELECTOR */}
      <div className="InstanceGroupSelector__field">
        <label className="InstanceGroupSelector__label" htmlFor="os">
          Operating system
        </label>
        <Select
          id="os"
          placeholder="Select operating system..."
          aria-label="Operating system options"
          isClearable
          isSearchable
          onChange={(a) =>
            selected$.next({ ...selected$.value, operating_system: a?.value })
          }
          options={operatingSystem}
        />
      </div>
      {compositeSelection.length === 0 && isAllOptionsSelected && (
        <p className="InstanceGroupSelector__warning">No instances found</p>
      )}
    </div>
  );
}
