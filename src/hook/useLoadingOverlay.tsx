import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Context } from '../hoc/withLoadingOverlay';

export function useLoadingOverlay(): [
  Dispatch<SetStateAction<boolean>>,
  boolean
  ] {
  const context = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (context.current) {
      if (loading) {
        context.current.start();
      } else {
        context.current.stop();
      }
    }
  }, [loading, context]);

  return [setLoading, loading];
}

export default useLoadingOverlay;
