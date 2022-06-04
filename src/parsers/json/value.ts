import { concatenate, or } from '../../combinator';
import { map, str } from '../../utility';
import { bool } from '../bool';
import { number } from './number';
import { string } from './string';
import { whitespace } from './whitespace';
import type { Parser, ParserInput, ParserOutput } from 'types';

export type ValueType = string | number | boolean | null;

const parseNull: Parser<null> = map(str('null'), () => null);

const valueContent: Parser<ValueType> = or<ValueType>([string, number, bool, parseNull]);
export function value(input: ParserInput): ParserOutput<ValueType> {
	return map(concatenate([whitespace, valueContent, whitespace]), ([, v]) => v)(input);
}
