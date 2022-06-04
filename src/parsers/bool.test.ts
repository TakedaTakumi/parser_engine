import { bool } from './bool';
import type { ParserOutput } from 'types';

describe('bool', () => {
	const parser = bool;

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<boolean>>({
			result: 'fail',
		});
	});
	test('input "true"', () => {
		const input = [...'true'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<boolean>>({
			result: 'success',
			data: true,
			rest: [],
		});
	});
	test('input "false"', () => {
		const input = [...'false'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<boolean>>({
			result: 'success',
			data: false,
			rest: [],
		});
	});
	test('input "null"', () => {
		const input = [...'null'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<boolean>>({
			result: 'fail',
		});
	});
});
