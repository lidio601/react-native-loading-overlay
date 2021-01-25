import React, {
  createContext,
  createRef,
} from 'react';

import LoadingOverlay from '../components/LoadingOverlay';

const loadingRef = createRef<LoadingOverlay>();
export const Context = createContext(loadingRef);

export function withLoadingOverlay<T>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> {
  return (props: T) => (
    <Context.Provider value={loadingRef}>
      <WrappedComponent {...props} />

      {/*
       * the loading overlay will appear on top of everything else
       */}
      <LoadingOverlay loading={false} ref={loadingRef} />
    </Context.Provider>
  );
}

export default withLoadingOverlay;
