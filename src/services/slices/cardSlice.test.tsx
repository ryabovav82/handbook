import { error } from 'console';
import { cardsSlice } from './cardSlice';
import { TCardsState } from './cardSlice';
import { initialState } from './cardSlice';
import {
  getCards,
  delCard,
  addCard,
  changeCardText,
  changeCardImage
} from './cardSlice';
import { getCardsApi } from 'src/utils/handbook-api';
import store from '../store';

// jest.mock('../../utils/handbook-api', () => ({
//   getCardsApi: jest.fn(),
//   addCardApi: jest.fn(),
//   delCardApi: jest.fn(),
//   changeCardTextApi: jest.fn(),
//   changeCardImageApi: jest.fn()
// }));
// СДЕЛАТЬ тесты для extraReducers

const cardSliceReducer = cardsSlice.reducer;

const testCard = {
  id: 21,
  menuItemId: 2,
  serialNumber: 1,
  image: 'http://localhost:3001/menuitem/card/images/21.jpg',
  text: 'text_2_1'
};

const mockData = [
  {
    id: 11,
    menuItemId: 1,
    serialNumber: 1,
    image: 'http://localhost:3001/menuitem/card/images/11.jpg',
    text: 'text_1_1'
  },
  {
    id: 12,
    menuItemId: 1,
    serialNumber: 1,
    image: 'http://localhost:3001/menuitem/card/images/12.jpg',
    text: 'text_1_222'
  },
  {
    id: 13,
    menuItemId: 1,
    serialNumber: 1,
    image: 'http://localhost:3001/menuitem/card/images/13.jpg',
    text: 'text_1_3'
  },
  {
    id: 14,
    menuItemId: 1,
    serialNumber: 1,
    image: 'http://localhost:3001/menuitem/card/images/14.jpg',
    text: 'text_1_4'
  }
];

jest.mock('../../utils/handbook-api', () => ({
  getCardsApi: jest.fn(() => Promise.resolve(mockData))
  // addCardApi: jest.fn() => Promise....),
  // delCardApi: jest.fn() => Promise....),
  //changeCardTextApi: jest.fn() => Promise....),
  // changeCardImageApi: jest.fn()=> Promise....),
}));
const mockGetCardsApi = require('../../utils/handbook-api')
  .getCardsApi as jest.MockedFunction<typeof getCardsApi>;

afterEach(() => {
  mockGetCardsApi.mockClear();
});

describe('проверка getCards', () => {
  it('проверка getCards  pending', async () => {
    store.dispatch(getCards(1));

    expect(store.getState().cardReducer.isLoading).toBe(true);
    expect(store.getState().cardReducer.error).toBeNull();
  });

  it('Проверка getCards fulfilled', async () => {
    await store.dispatch(getCards(1));

    expect(store.getState().cardReducer.isLoading).toBe(false);
    expect(store.getState().cardReducer.error).toBeNull();
    expect(store.getState().cardReducer.data).toEqual(mockData);
  });

  it('Проверка getCards rejected', async () => {
    const error = 'Ошибка';
    mockGetCardsApi.mockImplementationOnce(() =>
      Promise.reject(new Error(error))
    );

    try {
      await store.dispatch(getCards(1));
    } catch (e) {}

    expect(store.getState().cardReducer.isLoading).toBe(false);
    // expect(store.getState().cardReducer.error).toContain(error);
  });
});

describe('проверка cardSliceReducer', () => {
  let state: TCardsState;
  beforeEach(() => {
    state = initialState;
  });

  it('проверка добавления карточки', () => {
    const newState = cardSliceReducer(initialState, {
      type: 'cards/addCard',
      payload: testCard
    });
    expect(newState.data).toHaveLength(1);
    expect(newState.data[newState.data.length - 1]).toEqual(testCard);
  });

  it('проверка удаления карточки', () => {
    const actionBefore = cardsSlice.actions.addCard(testCard);
    state = cardSliceReducer(state, actionBefore);
    const action = {
      type: 'cards/removeCard',
      payload: testCard.id
    };
    const newState = cardSliceReducer(state, action);
    expect(newState.data).toHaveLength(1);
    expect(newState.data.map((card) => card.id)).not.toContain('testCard.id');
  });

  it('проверка редактирования карточки', () => {
    const testCardEdit = {
      ...testCard,
      text: 'NewText'
    };
    const modifiedInitialState = {
      ...initialState,
      data: [testCard]
    };

    const newState = cardSliceReducer(modifiedInitialState, {
      type: 'cards/changeCard',
      payload: testCardEdit
    });
    expect(newState.data[0].text).toBe(testCardEdit.text);
  });
});
