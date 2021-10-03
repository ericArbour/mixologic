import { useEffect, useState } from 'react';
import { UseMutationResult } from 'react-query';

// Used to extend the loading state of a mutation to at least
// 500 ms to prevent animation flickering
export function useAnimateLoading<A, B, C>(
  mutation: UseMutationResult<A, B, C>
) {
  const [shouldAnimateLoading, setShouldAnimateLoading] = useState(false);

  useEffect(() => {
    if (mutation.isLoading) {
      setShouldAnimateLoading(true);
      setTimeout(() => {
        setShouldAnimateLoading(false);
      }, 500);
    }
  }, [mutation.isLoading]);

  return { shouldAnimateLoading };
}
