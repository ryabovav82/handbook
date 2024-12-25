import { menuItemsSlice } from './menuItemSlice';
import { TMenuItemsState } from './menuItemSlice';
import { initialState } from './menuItemSlice';

const menuItemsReducer = menuItemsSlice.reducer;

describe('Проверка setSelectedMenuItem', () => {
  let state: TMenuItemsState;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('Проверка обновления выбранного элемента меню при передаче нового объекта', () => {
    const newSelectedMenuItem = {
      id: 1,
      name: 'item_1',
      cards: []
    };

    const action =
      menuItemsSlice.actions.setSelectedMenuItem(newSelectedMenuItem);

    const nextState = menuItemsSlice.reducer(state, action);

    expect(nextState.isSelected).toEqual(newSelectedMenuItem);
  });

  it('Проверка сброса выбранного элемента меню на null, если передан null', () => {
    state.isSelected = {
      id: 1,
      name: 'item_1',
      cards: []
    };

    const action = menuItemsSlice.actions.setSelectedMenuItem(null);

    const nextState = menuItemsSlice.reducer(state, action);

    expect(nextState.isSelected).toBeNull();
  });
});
