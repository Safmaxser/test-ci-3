import { getLevel } from "../character";
import fetchData from "../http";
jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('testing the getLevel function to run with the required attribute', () => {
  fetchData.mockReturnValue(JSON.stringify({}));
  getLevel(5);
  expect(fetchData).toHaveBeenCalledWith('https://server/user/5');
});

test.each([
  [{status: 'ok', level: 5}, 'Ваш текущий уровень: 5'],
  [{status: 'no', level: 5}, 'Информация об уровне временно недоступна'],
])
('testing getLevel function for response %o', (response, expected) => {
  fetchData.mockReturnValue(response);
  const result = getLevel(1);
  expect(result).toBe(expected);
});