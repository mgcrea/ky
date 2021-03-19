/* eslint-disable @typescript-eslint/promise-function-async */
/*! MIT License © Sindre Sorhus */

import {Ky, requestMethods, stop} from './core/index.js';
import {HTTPError, TimeoutError} from './errors/index.js';
import {Input, Options, ky as KyInterface} from './types/index.js';
import {validateAndMerge} from './utils/index.js';

const createInstance = (defaults?: Partial<Options>): KyInterface => {
	const ky = (input: Input, options?: Options) => Ky.create(input, validateAndMerge(defaults, options));

	for (const method of requestMethods) {
		// @ts-expect-error not sure how to properly type this!
		ky[method] = (input: Input, options: Options) => Ky.create(input, validateAndMerge(defaults, options, {method}));
	}

	ky.HTTPError = HTTPError;
	ky.TimeoutError = TimeoutError;
	ky.create = (newDefaults?: Partial<Options>) => createInstance(validateAndMerge(newDefaults));
	ky.extend = (newDefaults?: Partial<Options>) => createInstance(validateAndMerge(defaults, newDefaults));
	ky.stop = stop;

	return ky as KyInterface;
};

const ky = createInstance();

export default ky;
