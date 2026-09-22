import enPlayground from '@/shared/i18n/locales/en.playground.json';
import { demos } from './demos';

test('데모 id가 겹치지 않는다', () => {
  const ids = demos.map((demo) => demo.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('모든 데모에 영문 제목·설명이 있다', () => {
  for (const demo of demos) {
    expect(enPlayground.demos[demo.id]).toMatchObject({ title: expect.any(String), description: expect.any(String) });
  }
});
