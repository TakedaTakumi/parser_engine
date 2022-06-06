import { concatenate, or } from '../../combinator';
import { list, map, str } from '../../utility';
import { bool } from '../bool';
import { number } from './number';
import { string } from './string';
import { whitespace } from './whitespace';
import type { Parser, ParserInput, ParserOutput } from 'types';
import { character } from '../../character';

export type ValueType = string | number | boolean | null | ValueType[];

const parseNull: Parser<null> = map(str('null'), () => null);

const valueContent: Parser<ValueType> = or<ValueType>([string, number, bool, parseNull, array]);
export function value(input: ParserInput): ParserOutput<ValueType> {
	return map(concatenate([whitespace, valueContent, whitespace]), ([, v]) => v)(input);
}

// 配列
const arrayContent: Parser<ValueType[]> = map(or([list(value, character(',')), whitespace]), (a) => a ?? []);
export function array(input: ParserInput): ParserOutput<ValueType[]> {
	return map(concatenate([character('['), arrayContent, character(']')]), ([, a]) => a)(input);
}
