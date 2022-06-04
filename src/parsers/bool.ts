import { map, str } from '../utility';
import type { Parser } from 'types';
import { or } from '../combinator';

const parseTrue: Parser<true> = map(str('true'), () => true);
const parseFalse: Parser<false> = map(str('false'), () => false);

export const bool: Parser<boolean> = or([parseTrue, parseFalse]);
