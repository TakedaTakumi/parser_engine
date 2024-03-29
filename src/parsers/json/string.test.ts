import { string } from './string';
import type { ParserOutput } from 'types';

describe('string', () => {
	const parser = string;

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<string>>({
			result: 'fail',
		});
	});
	test('input "hello"', () => {
		const input = [...'hello'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<string>>({
			result: 'fail',
		});
	});
	test('input "\'hello\'"', () => {
		const input = [...'\'hello\''];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<string>>({
			result: 'fail',
		});
	});
	test('input ""hello\tfog""', () => {
		const input = [...'"hello\tfog"'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<string>>({
			result: 'fail',
		});
	});
	test('input ""hello""', () => {
		const input = [...'"hello"'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<string>>({
			result: 'success',
			data: 'hello',
			rest: [],
		});
	});
	test('input ""\\a""', () => {
		const input = [...'"\\a"'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<string>>({
			result: 'fail',
		});
	});
	test('input ""\\b\\t\\n\\f\\r\\"\\/\\\\""', () => {
		const input = [...'"\\b\\t\\n\\f\\r\\"\\/\\\\"'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<string>>({
			result: 'success',
			data: '\b\t\n\f\r"/\\',
			rest: [],
		});
	});
	test('input ""[/\\/\\u002F\\u002f]""', () => {
		const input = [...'"[/\\/\\u002F\\u002f]"'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<string>>({
			result: 'success',
			data: '[////]',
			rest: [],
		});
	});
	test('input ""\\ud83c\\udf63""', () => {
		const input = [...'"\\ud83c\\udf63"'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<string>>({
			result: 'success',
			data: '🍣',
			rest: [],
		});
	});
});
