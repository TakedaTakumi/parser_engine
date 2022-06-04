import { character } from '../character';
import { numbers } from './integer';
import { concatenate, or, repeat } from '../combinator';
import { map } from '../utility';
import type { ParserInput, ParserOutput } from 'types';

export function expression(input: ParserInput): ParserOutput<number> {
	return map(concatenate([term, repeat(concatenate([or([character('+'), character('-')]), term]))]), ([first, rest]) => {
		return rest.reduce((lhs, [op, rhs]) => {
			if (op === '+') {
				return lhs + rhs;
			}
			return lhs - rhs;
		}, first);
	})(input);
}

function term(input: ParserInput): ParserOutput<number> {
	return map(concatenate([factor, repeat(concatenate([or([character('*'), character('/')]), factor]))]), ([first, rest]) => {
		return rest.reduce((lhs, [op, rhs]) => {
			if (op === '*') {
				return lhs * rhs;
			}
			return lhs / rhs;
		}, first);
	})(input);
}

function factor(input: ParserInput): ParserOutput<number> {
	return or([numbers, map(concatenate([character('('), expression, character(')')]), ([, n]) => n)])(input);
}
