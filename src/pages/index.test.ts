import { NAV_SCREEN_IDS } from '@/configs/navigation';
import { Pages } from '@/pages';

test('내비게이션의 모든 화면이 pages 폴더로 등록돼 있다', () => {
  expect(Object.keys(Pages)).toEqual(expect.arrayContaining([...NAV_SCREEN_IDS]));
});
