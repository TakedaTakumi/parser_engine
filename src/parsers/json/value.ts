import { concatenate, or } from '../../combinator';
import { list, map, str } from '../../utility';
import { bool } from '../bool';
import { number } from './number';
import { string } from './string';
import { whitespace } from './whitespace';
import type { Parser, ParserInput, ParserOutput } from 'types';
import { character } from '../../character';

export type ValueType = string | number | boolean | null | ValueType[] | ObjectType;

// nullパーサ
const parseNull: Parser<null> = map(str('null'), () => null);

// 値パーサ
const valueContent: Parser<ValueType> = or<ValueType>([string, number, bool, parseNull, array, object]);
export function value(input: ParserInput): ParserOutput<ValueType> {
	return map(concatenate([whitespace, valueContent, whitespace]), ([, v]) => v)(input);
}

// 配列パーサ
const arrayContent: Parser<ValueType[]> = map(or([list(value, character(',')), whitespace]), (a) => a ?? []);
export function array(input: ParserInput): ParserOutput<ValueType[]> {
	return map(concatenate([character('['), arrayContent, character(']')]), ([, a]) => a)(input);
}

// オブジェクトパーサ
export type ObjectType = { [key: string]: ValueType };
const objectKeyValue: Parser<ObjectType> = map(concatenate([whitespace, string, whitespace, character(':'), value]), ([, k, , , v]) => ({ [k]: v }));
const objectContent: Parser<ObjectType> = map(or([list(objectKeyValue, character(',')), whitespace]), (a) => (a ?? []).reduce((obj, kv) => ({ ...obj, ...kv }), {}));
export function object(input: ParserInput): ParserOutput<ObjectType> {
	return map(concatenate([character('{'), objectContent, character('}')]), ([, o]) => o)(input);
}
