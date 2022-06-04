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

// アルファベットのパーサ
export type UpperAlphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
export type LowerAlphabet = Lowercase<UpperAlphabet>;
export type Alphabet = UpperAlphabet | LowerAlphabet;

export const upperAlphabet: Parser<UpperAlphabet> = is((c): c is UpperAlphabet => /^[A-Z]$/.test(c));
export const lowerAlphabet: Parser<LowerAlphabet> = is((c): c is LowerAlphabet => /^[a-z]$/.test(c));
export const alphabet: Parser<Alphabet> = is((c): c is Alphabet => /^[A-Za-z]$/.test(c));

// 数字のパーサ
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export const digit: Parser<Digit> = is((c): c is Digit => /^\d$/.test(c));
