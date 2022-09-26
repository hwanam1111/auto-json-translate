import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --main-color: #15ADEC;
  }

  body {
    font-family: 'Roboto', 'Noto Sans KR', sans-serif;
    padding: 0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);

    @media only screen and (max-width: 1024px) and (min-width: 280px) {
      padding: 0 env(safe-area-inset-right) calc(env(safe-area-inset-bottom) + 3.125rem) env(safe-area-inset-left); // bottom add footer height
    }
  }

  a {
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }

  p {
    line-height: 1.3;
  }
`;
