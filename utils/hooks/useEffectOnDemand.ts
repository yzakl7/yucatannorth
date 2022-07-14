import { useEffect, EffectCallback, DependencyList, useRef } from "react";

/**
 * This hook gets called only when the dependencies change but not during initial render.
 *
 * @param {EffectCallback} effect The `useEffect` callback function.
 * @param {DependencyList} deps An array of dependencies.
 *
 * @example
 * ```
 *  useEffectOnDemand(()=>{
 *      alert("Dependency changed!");
 * },[dependency]);
 * ```
 */
export const useEffectOnDemand = (effect: EffectCallback, deps?: DependencyList) => {
	const initialRender = useRef(true);
	useEffect(() => {
		let effectReturns: any = () => {};

        if (initialRender.current) {
			initialRender.current = false;
		} else {
			effectReturns = effect();
		}

		if (effectReturns && typeof effectReturns === "function") {
			return effectReturns;
		}
	}, deps);
};