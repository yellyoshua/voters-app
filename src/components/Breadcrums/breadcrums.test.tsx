import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { render } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import Breadcrums from 'components/Breadcrums';

test('renders breadcrumbs links', () => {
  const history = createMemoryHistory({
    initialEntries: ['/starting/point']
  });
  const { getByText } = render(
    <Router history={history} >
      <Breadcrums breadcrumbs={[
        { name: "Inicio", pathname: "/home" },
        { name: "Contacto", pathname: "/contact" }
      ]} />
    </Router>
  );
  const homeLink = getByText(/Inicio/i);
  const contactLink = getByText(/Contacto/i);

  expect(homeLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
  expect(history.location.pathname).toEqual("/starting/point");
  fireEvent.click(homeLink);
  expect(history.location.pathname).toEqual("/home");
  fireEvent.click(contactLink);
  expect(history.location.pathname).toEqual("/contact");
});
