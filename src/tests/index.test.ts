import { describe, expect, test } from '@jest/globals';

import { add, sub } from '@/lib/math';

describe('Math', () => {
    test('add', () => {
        expect(add(1, 2)).toBe(3);
    });
    test('sub', () => {
        expect(sub(1, 2)).toBe(-1);
    });
});