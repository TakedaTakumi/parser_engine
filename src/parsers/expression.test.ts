import { expression } from './expression';
import type { ParserOutput } from 'types';

describe('expression', () => {
	const parser = expression;

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
	test('input "42"', () => {
		const input = [...'42'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 42,
			rest: [],
		});
	});
	test('input "1+2"', () => {
		const input = [...'1+2'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 1 + 2,
			rest: [],
		});
	});
	test('input "7-3"', () => {
		const input = [...'7-3'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 7 - 3,
			rest: [],
		});
	});
	test('input "8*16"', () => {
		const input = [...'8*16'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 8 * 16,
			rest: [],
		});
	});
	test('input "1024/16"', () => {
		const input = [...'1024/16'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 1024 / 16,
			rest: [],
		});
	});
	test('input "3*(5-2)"', () => {
		const input = [...'3*(5-2)'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 3 * (5 - 2),
			rest: [],
		});
	});
	test('input "42+3*(2-5)"', () => {
		const input = [...'42+3*(2-5)'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<number>>({
			result: 'success',
			data: 42 + 3 * (2 - 5),
			rest: [],
		});
	});
});
