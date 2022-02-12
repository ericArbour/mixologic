import { getMainHeading } from '../support/app.po';

describe('ui', () => {
  beforeEach(() => cy.visit('/'));

  it('shows the main heading', () => {
    getMainHeading().contains('Mixologic');
  });
});
