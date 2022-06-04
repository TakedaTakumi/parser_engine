import { whitespace } from './whitespace';
import type { ParserOutput } from 'types';

describe('whitespace', () => {
	const parser = whitespace;

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<null>>({
			result: 'success',
			data: null,
			rest: [],
		});
	});
	test('input "abc"', () => {
		const input = [...'abc'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<null>>({
			result: 'success',
			data: null,
			rest: [...'abc'],
		});
	});
	test('input "\\t\\n\\r huge"', () => {
		const input = [...'\t\n\r huge'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<null>>({
			result: 'success',
			data: null,
			rest: [...'huge'],
		});
	});
});
