import { character, is, upperAlphabet, lowerAlphabet, alphabet, digit } from './character';
import type { UpperAlphabet, LowerAlphabet, Alphabet, Digit } from './character';
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

describe('upperAlpha', () => {
	const parser = upperAlphabet;

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<UpperAlphabet>>({
			result: 'fail',
		});
	});
	test('input "a"', () => {
		const input = [...'a'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<UpperAlphabet>>({
			result: 'fail',
		});
	});
	test('input "A"', () => {
		const input = [...'A'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<UpperAlphabet>>({
			result: 'success',
			data: 'A',
			rest: [],
		});
	});
});

describe('lowerAlpha', () => {
	const parser = lowerAlphabet;

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<LowerAlphabet>>({
			result: 'fail',
		});
	});
	test('input "a"', () => {
		const input = [...'a'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<LowerAlphabet>>({
			result: 'success',
			data: 'a',
			rest: [],
		});
	});
	test('input "A"', () => {
		const input = [...'A'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<LowerAlphabet>>({
			result: 'fail',
		});
	});
});

describe('alpha', () => {
	const parser = alphabet;

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<Alphabet>>({
			result: 'fail',
		});
	});
	test('input "a"', () => {
		const input = [...'a'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<Alphabet>>({
			result: 'success',
			data: 'a',
			rest: [],
		});
	});
	test('input "A"', () => {
		const input = [...'A'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<Alphabet>>({
			result: 'success',
			data: 'A',
			rest: [],
		});
	});
	test('input "1"', () => {
		const input = [...'1'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<UpperAlphabet>>({
			result: 'fail',
		});
	});
});

describe('digit', () => {
	const parser = digit;

	test('Empty input', () => {
		const input = [] as const;
		const output = parser(input);
		expect(output).toEqual<ParserOutput<Digit>>({
			result: 'fail',
		});
	});
	test('input "5"', () => {
		const input = [...'5'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<Digit>>({
			result: 'success',
			data: '5',
			rest: [],
		});
	});
	test('input "a"', () => {
		const input = [...'a'];
		const output = parser(input);
		expect(output).toEqual<ParserOutput<Digit>>({
			result: 'fail',
		});
	});
});
