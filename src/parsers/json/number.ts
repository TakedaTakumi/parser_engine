import { character, digit } from '../../character';
import { concatenate, or, repeat } from '../../combinator';
import { diff, map, option } from '../../utility';
import type { Parser } from 'types';
import type { Option } from '../../utility';

const sign: Parser<'-'> = character('-');
const integer: Parser<string> = or([character('0'), map(concatenate([diff(digit, character('0')), repeat(digit)]), ([first, rest]) => [first, ...rest].join(''))]);
const fraction: Parser<string> = map(concatenate([character('.'), repeat(digit, 1)]), ([dot, digits]) => [dot, ...digits].join(''));
const exponent: Parser<string> = map(concatenate([or([character('E'), character('e')]), option(or([character('+'), character('-')])), repeat(digit, 1)]), ([e, sign, digits]) =>
	[e, sign.status === 'some' ? sign.value : '', ...digits].join('')
);

export const number: Parser<number> = map(concatenate([option(sign), integer, option(fraction), option(exponent)]), ([sign, integer, fraction, exponent]) => {
	const optOrEmpty = (opt: Option<string>) => (opt.status === 'some' ? opt.value : '');
	const numberString = [optOrEmpty(sign), integer, optOrEmpty(fraction), optOrEmpty(exponent)].join('');
	return Number.parseFloat(numberString);
});
