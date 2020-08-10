import { useEffect, useLayoutEffect } from "react";
import { canUseBrowser } from "./useBrowser";

const useIsomorphicLayoutEffect = canUseBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;