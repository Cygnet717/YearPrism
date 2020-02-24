import React from 'react';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import UserProvider from './Context/user-provider'

describe(`App rendering`, () => {
  it(`renders without crashing`, () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserProvider />, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('renders the UI as expected', () => {
  const tree= renderer
  .create(<UserProvider name="App" />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
it(`renders DeleteAccount without crashing`, () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserProvider name="DeleteAccount"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('renders the footer as expected', () => {
  const tree= renderer
  .create(<UserProvider name="Footer" />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders the header as expected', () => {
  const tree= renderer
  .create(<UserProvider name="Header" />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders the HomePage as expected', () => {
  const tree= renderer
  .create(<UserProvider name="HomePage" />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders the LandingPage as expected', () => {
  const tree= renderer
  .create(<UserProvider name="LandingPage" />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders the LoginPage as expected', () => {
  const tree= renderer
  .create(<UserProvider name="LoginPage" />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders the RegisterPage as expected', () => {
  const tree= renderer
  .create(<UserProvider name="RegisterPage" />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders the SearchResults as expected', () => {
  const tree= renderer
  .create(<UserProvider name="SearchResults" />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders the YearViewPage as expected', () => {
  const tree= renderer
  .create(<UserProvider name="YearViewPage" />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
})