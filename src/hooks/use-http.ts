import { useReducer, useCallback } from "react";

interface StateType {
  data: any;
  error: null | string;
  status: "pending" | "completed" | "fail" | boolean;
}

type ActionType =
  | { type: "SEND" }
  | { type: "SUCCESS"; responseData: any }
  | { type: "ERROR"; errorMessage: string };

const httpReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SEND":
      return {
        data: [],
        error: null,
        status: "pending",
      };
    case "SUCCESS":
      return {
        data: action.responseData,
        error: null,
        status: "completed",
      };

    case "ERROR":
      return {
        data: [],
        error: action.errorMessage,
        status: "fail",
      };

    default:
      return state;
  }
};

export const useHttp = <T extends Function>(
  requestFunction: T,
  startWithPending = false
) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: [],
    error: null,
    status: startWithPending && "pending",
  });

  const sendRequest = useCallback(
    async <A>(requestData?: A) => {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error: unknown) {
        dispatch({
          type: "ERROR",
          errorMessage:
            (error as Error).message ||
            "데이터를 정삭적으로 불러오지 못했습니다.",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};
