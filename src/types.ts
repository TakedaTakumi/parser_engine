// パーサの入力
export type ParserInput = readonly string[];

// パーサの出力
// 成功
interface ParseSuccess<T> {
	result: 'success';
	data: T;
	rest: ParserInput;
}

// 失敗
interface ParseFail {
	result: 'fail';
}

export type ParserOutput<T> = Readonly<ParseSuccess<T> | ParseFail>;

//パーサ関数
export type Parser<T> = (input: ParserInput) => ParserOutput<T>;

// ユーティリティ型
// パーサ型からデータ型を取り出す。
export type ParserData<P> = P extends Parser<infer T> ? T : never;
