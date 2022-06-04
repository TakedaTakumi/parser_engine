import { integer } from './integer';
import type { ParserOutput } from 'types';

describe('integer', () => {
	const parser = integer;

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'fail',
		});
	});
	test('input "true"', () => {
		const input = [...'true'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'fail',
		});
	});
	test('input "0"', () => {
		const input = [...'0'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 0,
			rest: [],
		});
	});
	test('input "42"', () => {
		const input = [...'42'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 42,
			rest: [],
		});
	});
	test('input "-273"', () => {
		const input = [...'-273'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: -273,
			rest: [],
		});
	});
	test('input "+37335928559"', () => {
		const input = [...'+37335928559'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 37335928559,
			rest: [],
		});
	});
});
