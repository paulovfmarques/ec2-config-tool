import React, { useEffect, Suspense } from 'react';
import { useObservableState } from 'observable-hooks';
import { compositeSelection$ } from '_store';
import { Header } from '_components';
import { getEC2InstancesSubscription, getRawDataSubscrition } from '_services';

const InstancesTable = React.lazy(() =>
  import('_components').then((module) => ({ default: module.InstancesTable })),
);

const InstanceGroupSelector = React.lazy(() =>
  import('_components').then((module) => ({
    default: module.InstanceGroupSelector,
  })),
);

function App() {
  const compositeSelection = useObservableState(compositeSelection$, []);

  /** Fetch the json file containing the selectors' combinations */
  useEffect(() => {
    const subscription = getRawDataSubscrition();

    return () => subscription.unsubscribe();
  }, []);

  /** Fetch the instances json file from a selected combination */
  useEffect(() => {
    if (compositeSelection[0]?.filename) {
      const subscription = getEC2InstancesSubscription(
        compositeSelection[0].filename,
      );

      return () => subscription.unsubscribe();
    }
  }, [compositeSelection]);

  return (
    <>
      <Header />
      <div className="App">
        <div className="App__row">
          <h1 className="App__title">EC2 Config Tool</h1>
        </div>

        <div className="App__row App__description">
          <p>
            Select a location, operating system and instance type to view the
            virtual machines available.
          </p>
          <p>
            You can sort them out by vCPU and memory, and check the details for
            costs information.
          </p>
        </div>

        <div className="App__row">
          <Suspense fallback="">
            <InstanceGroupSelector />
          </Suspense>
        </div>

        <div className="App__row">
          <Suspense fallback="">
            <InstancesTable />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
