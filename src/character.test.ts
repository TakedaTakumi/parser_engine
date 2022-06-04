import { character, is } from './character';
import type { ParserOutput } from 'types';

describe('character("a")', () => {
	const parser = character('a');

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<'a'>>({
			result: 'fail',
		});
	});
	test('input "a"', () => {
		const input = [...'a'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<'a'>>({
			result: 'success',
			data: 'a',
			rest: [],
		});
	});
	test('input "A"', () => {
		const input = [...'A'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<'a'>>({
			result: 'fail',
		});
	});
	test('input "huge"', () => {
		const input = [...'huge'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<'a'>>({
			result: 'fail',
		});
	});
	test('input "apply"', () => {
		const input = [...'apply'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<'a'>>({
			result: 'success',
			data: 'a',
			rest: [...'pply'],
		});
	});
});

describe('is()', () => {
	describe('is(c => c == "a")', () => {
		const parser = is((c): c is 'a' => c === 'a');

		test('Empty input', () => {
			const input = [] as const;
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'>>({
				result: 'fail',
			});
		});
		test('input "a"', () => {
			const input = [...'a'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'>>({
				result: 'success',
				data: 'a',
				rest: [],
			});
		});
		test('input "A"', () => {
			const input = [...'A'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'>>({
				result: 'fail',
			});
		});
	});
	describe('is(c => c === "0" || c === "1")', () => {
		const parser = is((c): c is '0' | '1' => c === '0' || c === '1');

		test('Empty input', () => {
			const input = [] as const;
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'0' | '1'>>({
				result: 'fail',
			});
		});
		test('input "0"', () => {
			const input = [...'0'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'0' | '1'>>({
				result: 'success',
				data: '0',
				rest: [],
			});
		});
		test('input "1"', () => {
			const input = [...'1'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'0' | '1'>>({
				result: 'success',
				data: '1',
				rest: [],
			});
		});
		test('input "A"', () => {
			const input = [...'A'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'0' | '1'>>({
				result: 'fail',
			});
		});
	});
});
