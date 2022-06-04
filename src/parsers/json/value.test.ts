import { value } from './value';
import type { ValueType } from './value';
import type { ParserOutput } from 'types';

describe('value', () => {
	const parser = value;

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<ValueType>>({
			result: 'fail',
		});
	});
	test('input "hello"', () => {
		const input = [...'hello'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<ValueType>>({
			result: 'fail',
		});
	});
	test('input ""hello""', () => {
		const input = [...'"hello"'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<ValueType>>({
			result: 'success',
			data: 'hello',
			rest: [],
		});
	});
	test('input "\t"hello"\t"', () => {
		const input = [...'\t"hello"\t'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<ValueType>>({
			result: 'success',
			data: 'hello',
			rest: [],
		});
	});
	test('input "42"', () => {
		const input = [...'42'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<ValueType>>({
			result: 'success',
			data: 42,
			rest: [],
		});
	});
	test('input "true"', () => {
		const input = [...'true'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<ValueType>>({
			result: 'success',
			data: true,
			rest: [],
		});
	});
	test('input "false"', () => {
		const input = [...'false'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<ValueType>>({
			result: 'success',
			data: false,
			rest: [],
		});
	});
	test('input "null"', () => {
		const input = [...'null'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<ValueType>>({
			result: 'success',
			data: null,
			rest: [],
		});
	});
	test('input "[1, 2, 3]"', () => {
		const input = [...'[1, 2, 3]'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<ValueType>>({
			result: 'success',
			data: [1, 2, 3],
			rest: [],
		});
	});

	test.todo('Test object');
});
