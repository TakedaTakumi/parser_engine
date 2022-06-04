import { anyChar } from './primitives';
import { Parser, ParserInput } from 'types';

// 任意の1文字のみのパーサ
type CharFunc = <T extends ParserInput[0]>(c: T) => Parser<T>;
export const character: CharFunc = (c) => {
	return (input) => {
		const r = anyChar(input);
		if (r.result === 'fail') {
			return r;
		}
		if (r.data !== c) {
			return { result: 'fail' };
		}
		return {
			result: 'success',
			data: c,
			rest: r.rest,
		};
	};
};

// 条件を満たす1文字のパーサ
type IsFunc = <T extends string>(func: (c: ParserInput[0]) => c is T) => Parser<T>;
export const is: IsFunc = (func) => {
	return (input) => {
		const r = anyChar(input);
		if (r.result === 'fail') {
			return r;
		}
		if (!func(r.data)) {
			return { result: 'fail' };
		}
		return {
			result: 'success',
			data: r.data,
			rest: r.rest,
		};
	};
};
