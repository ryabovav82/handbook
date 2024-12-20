import cypress from 'cypress';
import { deleteCookie, setCookie } from '../../src/utils/cookie';

const URLDB = 'http://localhost:3001';
const URL = 'https://norma.nomoreparties.space/api';

describe('Проверяем', () => {
  beforeEach(() => {
    // Перехват запросов
    cy.intercept('GET', `${URLDB}/menuitem`, { fixture: 'menuitem.json' });
    cy.intercept('GET', `${URLDB}/menuitem/card/1`, { fixture: 'cards.json' });
    cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' });
  });

    it('проверка  карточек и навигации', () => {
        cy.visit('/'); 
        cy.get('div').contains('item_1').should('exist');
        cy.get('div').contains('item_2').should('exist');
        cy.get('div').contains('item_1').click();
        cy.get('textarea').first().contains('text_1_1').should('exist');
        cy.get('textarea').first().clear({ force: true }).type('new_text', { force: true });
        cy.get('textarea').contains('new_text').should('exist');
        cy.get('button').contains('Сохранить').should('exist');
        cy.get('button').contains('Удалить').should('exist');
        cy.get('button').contains('Удалить').click();
        cy.get('textarea').contains('new_text').should('have.length', 0);
        cy.get('span').eq(1).contains('+').should('exist');
        cy.get('span').eq(1).contains('+').click();
        cy.get('span').eq(0).contains('+').should('exist');
        cy.get('span').eq(0).contains('+').click();
        cy.get('button').contains('⋮').should('exist');
        cy.get('button').contains('⋮').click();
        cy.get('button').contains('Изменить').should('exist');
        cy.get('button').contains('Изменить').click();
        cy.get('input').eq(0).should('exist');
        cy.get('input').eq(0).type('new_text', { force: true });
        cy.get('button').contains('Сохранить').should('exist');
        cy.get('button').contains('Сохранить').click();

    })

    it('проверка faq', () => {
      // Значения в случае необходимости тестирования надо поменять... тестовый вариант
       cy.visit('/faq'); 
       cy.get('textarea').first().contains('some text').should('exist');
        cy.get('textarea').first().clear({ force: true }).type('some text222', { force: true });
        cy.get('textarea').contains('some text222').should('exist');
        cy.get('button').contains('Удалить').click();
        cy.get('textarea').contains('some text222').should('have.length', 0);
        cy.get('input').eq(2).should('exist');
        cy.get('input').eq(2).type('new_text2', { force: true });
        cy.get('button').eq(2).contains('Сохранить').should('exist');
        cy.get('button').eq(2).contains('Сохранить').click();
        cy.get('span').eq(0).contains('+').should('exist');
        cy.get('span').eq(0).contains('+').click();
  })
        
})


