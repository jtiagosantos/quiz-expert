import { useState } from 'react';

export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const enableLoading = () => setIsLoading(true);

  const disableLoading = () => setIsLoading(false);

  return {
    isLoading,
    enableLoading,
    disableLoading,
  };
};
