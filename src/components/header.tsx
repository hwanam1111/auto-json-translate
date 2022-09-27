import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.header`
  padding: 0.625rem;
  border-bottom: 1px solid #efefef;
`;

function Header() {
  return (
    <HeaderBlock>
      <img src="./logo.png" alt="" />
    </HeaderBlock>
  );
}

export default Header;
