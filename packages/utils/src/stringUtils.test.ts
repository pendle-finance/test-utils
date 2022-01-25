import { findIgnoreCase } from '@/stringUtils';

describe(String.prototype.equalsIgnoreCase, () => {
  it('returns true for strings of the same characters, ignoring case', () => {
    expect('ab'.equalsIgnoreCase('ab')).toBe(true);
    expect('aB'.equalsIgnoreCase('Ab')).toBe(true);
    expect('Ab'.equalsIgnoreCase('aB')).toBe(true);
    expect('Ab'.equalsIgnoreCase('Ab')).toBe(true);
  });

  it('returns false for strings of different characters', () => {
    expect('ab'.equalsIgnoreCase('ac')).toBe(false);
    expect('aB'.equalsIgnoreCase('Ac')).toBe(false);
    expect('Ab'.equalsIgnoreCase('aC')).toBe(false);
    expect('Ab'.equalsIgnoreCase('Ac')).toBe(false);
  });
});

describe(Array.prototype.includesIgnoreCase, () => {
  const arr = [123, 'abc'];
  it('should return true for items in array ignoring case', () => {
    expect(arr.includesIgnoreCase(123)).toBe(true);
    expect(arr.includesIgnoreCase('abc')).toBe(true);
    expect(arr.includesIgnoreCase('ABC')).toBe(true);
    expect(arr.includesIgnoreCase('AbC')).toBe(true);
  });

  it('should return false for items not in array ignoring case', () => {
    expect(arr.includesIgnoreCase(456)).toBe(false);
    expect(arr.includesIgnoreCase('def')).toBe(false);
    expect(arr.includesIgnoreCase('DEf')).toBe(false);
  });
});

describe(findIgnoreCase, () => {
  const obj: Record<any, string> = {
    a: 'a',
    [1]: 'b',
  };

  it('finds the required value in the record, ignoring case', () => {
    expect(findIgnoreCase(obj, 'a')).toBe('a');
    expect(findIgnoreCase(obj, 'A')).toBe('a');
    expect(findIgnoreCase(obj, '1')).toBe('b');
    expect(findIgnoreCase(obj, 1)).toBe('b');
  });
});
