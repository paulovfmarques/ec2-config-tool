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
