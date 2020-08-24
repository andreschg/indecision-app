import React from 'react';

const Header = ({ title = "Title", subtitle }) => (
  <div>
    <h1>{ title }</h1>
    { subtitle && <h2>{ subtitle }</h2>}
  </div>
);

export default Header;