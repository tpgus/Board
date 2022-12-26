import { useState, useCallback } from "react";

import axios from "axios";

type StatusType = "ready" | "loading" | "completed";

interface ErrorType {
  error: {
    message: string;
  };
}

type RequestFunctionType<T> = (value?: any) => Promise<T>;

export const useHttp = <T>(
  requestFunction: RequestFunctionType<T>,
  initialData: T
) => {
  
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType>("ready");

  const sendRequest = useCallback(
    async <A>(requestData?: A) => {
      setStatus("loading");
      try {
        const responseData = await requestFunction(requestData);
        setData(responseData);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          //네트워크 요청에 관련한 에러
          //과연 axios 요청에 대한 에러가 모두 이 형식일까?
          setError((error.response.data as ErrorType).error.message);
        } else {
          //내가 의도적으로 발생시킬 수 있는 에러 : auth api 등 어딘가에서 throw new Error('에러')를 발생시키면 여기로 진입.
          setError((error as Error).message);
        }
      } finally {
        setStatus("completed");
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    data,
    error,
    status,
  };
};
