import './InstanceGroupSelector.styles.scss';
import Select from 'react-select';
import { useObservableState } from 'observable-hooks';
import { family$, location$, operatingSystem$, selected$ } from '_store';

export default function InstanceGroupSelector() {
  const location = useObservableState(location$, []);
  const family = useObservableState(family$, []);
  const operatingSystem = useObservableState(operatingSystem$, []);

  return (
    <div className="InstanceGroupSelector__wrapper">
      {/** LOCATION SELECTOR */}
      <div className="InstanceGroupSelector__field">
        <Select
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
        <Select
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
        <Select
          isClearable
          isSearchable
          onChange={(a) =>
            selected$.next({ ...selected$.value, operating_system: a?.value })
          }
          options={operatingSystem}
        />
      </div>
    </div>
  );
}
