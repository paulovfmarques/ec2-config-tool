import { useEffect } from 'react';
import { useObservableState } from 'observable-hooks';
import { compositeSelection$ } from '_store';
import { InstanceGroupSelector, InstancesTable, Header } from '_components';
import { getEC2InstancesSubscription, getRawDataSubscrition } from '_services';

function App() {
  const compositeSelection = useObservableState(compositeSelection$, []);

  useEffect(() => {
    const subscription = getRawDataSubscrition();

    return () => subscription.unsubscribe();
  }, []);

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
          <InstanceGroupSelector />
        </div>

        <div className="App__row">
          <InstancesTable />
        </div>
      </div>
    </>
  );
}

export default App;
