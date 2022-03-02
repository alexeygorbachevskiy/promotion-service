import React from "react";
import styled, { ThemeProvider } from "styled-components";

import "assets/fonts/fonts.css";

import { AppStyles } from "styles";

import { PALETTE, SIZE } from "constants/styles";
import { MODAL_OVERLAY_ID } from "constants/overlays";

import { ErrorBoundary, NavHeader } from "components";

import { TaskList } from "features";

const Wrapper = styled.div``;

const Main = styled.main`
  min-height: 100vh;
  height: calc(100vh - ${SIZE.header}px);
  padding-top: ${SIZE.header}px;
  background-color: ${PALETTE.getPageBackground};
  overflow-x: hidden;
`;

const ModalWrapper = styled.div``;

const App = () => (
  <ErrorBoundary>
    {/* TODO: connect it to redux */}
    <ThemeProvider theme={{ isDarkMode: true }}>
      <Wrapper>
        <AppStyles />
        <Main>
          <NavHeader />
          <TaskList />
        </Main>
        <ModalWrapper id={MODAL_OVERLAY_ID} />
      </Wrapper>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
