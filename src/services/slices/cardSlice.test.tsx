import { error } from 'console';
import { cardsSlice } from './cardSlice';
import { TCardsState } from './cardSlice';
import { initialState } from './cardSlice';
import { getCards, delCard, addCard, changeCardText, changeCardImage } from './cardSlice';

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
