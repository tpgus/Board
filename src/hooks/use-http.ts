import { useState, useCallback } from "react";

export const useHttp = <T>(requestFunction: Function) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async <A>(requestData?: A) => {
      setIsLoading(true);
      try {
        const responseData = await requestFunction(requestData);
        setData(responseData);
      } catch (error: unknown) {
        setError(
          (error as Error).message || "데이터를 정상적으로 불러오지 못했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    data,
    error,
    isLoading,
  };
};
