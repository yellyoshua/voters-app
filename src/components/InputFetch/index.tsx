import React, { useState, useEffect, memo } from "react";
import { useDebounce } from "react-use";

type PropsInputFetch = {
  beforeChange: ((val: any) => void) | null;
  onChange: (val: any) => Promise<any>;
  initialValue: string;
  resolveData: (val: string) => any;
};

export default memo(function InputFetch(props: PropsInputFetch) {
  const [inputState, setInputState] = useState<string>(props.initialValue);

  const [, cancelDebounceRequest] = useDebounce(
    async () => {
      const data = props.resolveData(inputState);
      try {
        await props.onChange(data);
        return props.beforeChange ? props.beforeChange(data) : null;
      } catch (error) {
        return props.beforeChange ? props.beforeChange(data) : null;
      }
    },
    800,
    [inputState]
  );

  useEffect(
    function () {
      return () => cancelDebounceRequest();
    },
    [cancelDebounceRequest]
  );

  return <input value={inputState} onChange={({ target: { value } }) => setInputState(value)} type='text' />;
});
