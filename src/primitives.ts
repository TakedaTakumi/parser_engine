import type { Parser } from 'types';

// 任意の1文字パーサ
export const anyChar: Parser<string> = (input) => {
	if (input.length > 0) {
		const [data, ...rest] = input;
		if (data) {
			return {
				result: 'success',
				data,
				rest,
			};
		}
	}
	return { result: 'fail' };
};

// 末尾パーサ
export const EndOfFile: Parser<null> = (input) => {
	if (input.length === 0) {
		return {
			result: 'success',
			data: null,
			rest: [],
		};
	}
	return { result: 'fail' };
};
