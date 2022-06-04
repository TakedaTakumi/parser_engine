import { concatenate, or, repeat } from '../combinator';
import type { Parser } from 'types';
import { character, digit, Digit } from '../character';
import { diff, map, option } from '../utility';

const nonZeroDigit: Parser<Digit> = diff(digit, character('0'));
const zeroNumber: Parser<0> = map(character('0'), () => 0);
const nonZeroNumber: Parser<number> = map(concatenate([nonZeroDigit, repeat(digit)]), ([first, rest]) => Number.parseInt([first, ...rest].join(''), 10));

// 数値
export const numbers: Parser<number> = or([zeroNumber, nonZeroNumber]);

// 符号
const sign: Parser<1 | -1> = map(option(or([character('+'), character('-')])), (s) => (s.status === 'some' ? (s.value === '+' ? 1 : -1) : 1));

// 整数
export const integer: Parser<number> = map(concatenate([sign, numbers]), ([s, n]) => s * n);
