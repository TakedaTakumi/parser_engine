import { anyChar } from '../../primitives';
import { character, digit, is } from '../../character';
import { concatenate, or, repeat } from '../../combinator';
import { diff, map, str } from '../../utility';
import type { Digit } from '../../character';
import type { Parser } from 'types';

const control: Parser<string> = is((c): c is string => (c.codePointAt(0) || 0) <= 0x1f);

type HexUpperAlphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
type HexLowerAlphabet = Lowercase<HexUpperAlphabet>;
type HexAlphabet = HexUpperAlphabet | HexLowerAlphabet;
type HexDigit = Digit | HexAlphabet;
const hex: Parser<HexDigit> = or([digit, is((c): c is HexAlphabet => /^[A-Fa-f]$/.test(c))]);
const codePoint: Parser<string> = map(concatenate([str('\\u'), repeat(hex, 4, 4)]), ([, code]) => String.fromCodePoint(Number.parseInt(code.join(''), 16)));

const escape: Parser<string> = or([
	map(str('\\b'), () => '\b'),
	map(str('\\t'), () => '\t'),
	map(str('\\n'), () => '\n'),
	map(str('\\f'), () => '\f'),
	map(str('\\r'), () => '\r'),
	map(str('\\"'), () => '"'),
	map(str('\\/'), () => '/'),
	map(str('\\\\'), () => '\\'),
	codePoint,
]);

const stringContent: Parser<string> = map(repeat(or([diff(anyChar, or([character('"'), character('\\'), control])), escape])), (strs) => strs.join(''));
export const string: Parser<string> = map(concatenate([character('"'), stringContent, character('"')]), ([, s]) => s);
