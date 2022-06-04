import type { Parser } from 'types';
import { character } from './character';
import { concatenate, not, repeat } from './combinator';

// 解析結果のmap
type MapFunc = <T, U>(p: Parser<T>, f: (a: T) => U) => Parser<U>;
export const map: MapFunc = (p, f) => {
	return (input) => {
		const r = p(input);
		if (r.result === 'fail') {
			return r;
		}
		return {
			result: 'success',
			data: f(r.data),
			rest: r.rest,
		};
	};
};

// 文字列のパーサ
type StrFunc = <T extends string>(s: T) => Parser<T>;
export const str: StrFunc = (s) => {
	return (input) => {
		const p = concatenate([...s].map(character));
		const r = p(input);
		if (r.result === 'fail') {
			return r;
		}

		return {
			result: 'success',
			data: s,
			rest: r.rest,
		};
	};
};

// オプション演算子
interface Some<T> {
	status: 'some';
	value: T;
}
interface None {
	status: 'none';
}
export type Option<T> = Some<T> | None;

type OptFunc = <T>(p: Parser<T>) => Parser<Option<T>>;
export const option: OptFunc = (p) => {
	return (input) => {
		const r = repeat(p, 0, 1)(input);
		if (r.result === 'fail') {
			return r;
		}

		return {
			result: 'success',
			data: (r.data[0] && { status: 'some', value: r.data[0] }) || { status: 'none' },
			rest: r.rest,
		};
	};
};

// 差分演算子
type DiffFunc = <T, U>(p: Parser<T>, q: Parser<U>) => Parser<T>;
export const diff: DiffFunc = (p, q) => map(concatenate([not(q), p]), ([, r]) => r);

// リストパーサ
// 要素数1以上のリストに対応
// 末尾のカンマ（ケツカンマ）非対応
type ListFunc = <T>(p: Parser<T>, delimiter: Parser<unknown>) => Parser<T[]>;
export const list: ListFunc = (p, delimiter) => map(concatenate([p, repeat(concatenate([delimiter, p]))]), ([first, rest]) => [first, ...rest.map(([, r]) => r)]);
