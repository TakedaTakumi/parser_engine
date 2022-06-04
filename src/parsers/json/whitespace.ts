import { character } from '../../character';
import { or, repeat } from '../../combinator';
import { map } from '../../utility';
import type { Parser } from 'types';

export const whitespace: Parser<null> = map(repeat(or([...'\t\n\r '].map(character))), () => null);
