import uniqueId from 'lodash/uniqueId';
import { useMemo } from 'react';

/**
 * Returns a unique ID which is stable between re-renders.
 * @param prefix Prepended to the ID.
 */
export default function useUniqueId(prefix: string): string {
  return useMemo(() => uniqueId(prefix), [prefix]);
}
