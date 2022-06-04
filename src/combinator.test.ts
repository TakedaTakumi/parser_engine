import { not, or, concatenate, repeat } from './combinator';
import { character } from './character';
import type { ParserOutput } from 'types';

describe('not(char("a"))', () => {
	const parser = not(character('a'));

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<null>>({
			result: 'success',
			data: null,
			rest: [],
		});
	});
	test('input "a"', () => {
		const input = [...'a'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<null>>({
			result: 'fail',
		});
	});
	test('input "A"', () => {
		const input = [...'A'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<null>>({
			result: 'success',
			data: null,
			rest: [...'A'],
		});
	});
	test('input "huge"', () => {
		const input = [...'huge'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<null>>({
			result: 'success',
			data: null,
			rest: [...'huge'],
		});
	});
	test('input "apply"', () => {
		const input = [...'apply'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<null>>({
			result: 'fail',
		});
	});
});

describe('or()', () => {
	describe('or([])', () => {
		const parser = or([]);

		test('Empty input', () => {
			const input = [] as const;
			const output = parser(input);
			expect(output).toEqual<ParserOutput<unknown>>({
				result: 'fail',
			});
		});
		test('input "a"', () => {
			const input = [...'a'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<unknown>>({
				result: 'fail',
			});
		});
	});
	describe('or([character("a"), character("b")])', () => {
		const parser = or([character('a'), character('b')]);

		test('Empty input', () => {
			const input = [] as const;
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a' | 'b'>>({
				result: 'fail',
			});
		});
		test('input "a"', () => {
			const input = [...'a'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a' | 'b'>>({
				result: 'success',
				data: 'a',
				rest: [],
			});
		});
		test('input "b"', () => {
			const input = [...'b'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a' | 'b'>>({
				result: 'success',
				data: 'b',
				rest: [],
			});
		});
		test('input "A"', () => {
			const input = [...'A'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a' | 'b'>>({
				result: 'fail',
			});
		});
	});
});

describe('concatenate()', () => {
	describe('concatenate([])', () => {
		const parser = concatenate([]);

		test('Empty input', () => {
			const input = [] as const;
			const output = parser(input);
			expect(output).toEqual<ParserOutput<[]>>({
				result: 'success',
				data: [],
				rest: [],
			});
		});
		test('input "a"', () => {
			const input = [...'a'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<[]>>({
				result: 'success',
				data: [],
				rest: [...'a'],
			});
		});
	});
	describe('concatenate([character("a"), character("b")])', () => {
		const parser = concatenate([character('a'), character('b')]);

		test('Empty input', () => {
			const input = [] as const;
			const output = parser(input);
			expect(output).toEqual<ParserOutput<['a', 'b']>>({
				result: 'fail',
			});
		});
		test('input "a"', () => {
			const input = [...'a'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<['a', 'b']>>({
				result: 'fail',
			});
		});
		test('input "abc"', () => {
			const input = [...'abc'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<['a', 'b']>>({
				result: 'success',
				data: ['a', 'b'],
				rest: [...'c'],
			});
		});
		test('input "A"', () => {
			const input = [...'A'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<['a', 'b']>>({
				result: 'fail',
			});
		});
	});
});

describe('repeat()', () => {
	describe('repeat(character("a"))', () => {
		const parser = repeat(character('a'));

		test('Empty input', () => {
			const input = [] as const;
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: [],
				rest: [],
			});
		});
		test('input "a"', () => {
			const input = [...'a'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: ['a'],
				rest: [],
			});
		});
		test('input "aa"', () => {
			const input = [...'aa'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: ['a', 'a'],
				rest: [],
			});
		});
		test('input "aab"', () => {
			const input = [...'aab'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: ['a', 'a'],
				rest: [...'b'],
			});
		});
	});
	describe('repeat(character("a"), 1)', () => {
		const parser = repeat(character('a'), 1);

		test('Empty input', () => {
			const input = [] as const;
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'fail',
			});
		});
		test('input "a"', () => {
			const input = [...'a'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: ['a'],
				rest: [],
			});
		});
		test('input "aa"', () => {
			const input = [...'aa'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: ['a', 'a'],
				rest: [],
			});
		});
		test('input "aab"', () => {
			const input = [...'aab'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: ['a', 'a'],
				rest: [...'b'],
			});
		});
	});
	describe('repeat(character("a"), 1, 2)', () => {
		const parser = repeat(character('a'), 1, 2);

		test('Empty input', () => {
			const input = [] as const;
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'fail',
			});
		});
		test('input "a"', () => {
			const input = [...'a'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: ['a'],
				rest: [],
			});
		});
		test('input "aa"', () => {
			const input = [...'aa'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: ['a', 'a'],
				rest: [],
			});
		});
		test('input "aaa"', () => {
			const input = [...'aaa'];
			const output = parser(input);
			expect(output).toEqual<ParserOutput<'a'[]>>({
				result: 'success',
				data: ['a', 'a'],
				rest: [...'a'],
			});
		});
	});
});
