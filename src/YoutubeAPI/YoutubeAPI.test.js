import React from 'react';
import ReactDOM from 'react-dom';
import YoutubeAPI from './YoutubeAPI';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<YoutubeAPI />, div);
  ReactDOM.unmountComponentAtNode(div);
});
