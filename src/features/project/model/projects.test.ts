import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { projects } from './projects';

test('프로젝트 id(slug)가 겹치지 않는다', () => {
  const ids = projects.map((project) => project.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('썸네일 경로가 public/에 실제로 있다', () => {
  const missing = projects.filter((project) => !existsSync(resolve('public', `.${project.thumbnail}`)));
  expect(missing.map((project) => project.thumbnail)).toEqual([]);
});
