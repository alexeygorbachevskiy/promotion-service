import React, { useEffect } from "react";
import styled from "styled-components";

import { BlankState, Carousel as NativeCarousel } from "components";

import { PALETTE, toREM } from "constants/styles";

import Loader from "assets/icons/loader.svg";

import { Banner } from "./components";
import { mostPopularHooks } from "./duck";

import Error from "../../../components/error/Error";

const { useConnect } = mostPopularHooks;

const Wrapper = styled.div`
  min-height: 450px;
  height: 450px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: 0 40px;
  height: 50px;
  border-bottom: 2px solid ${PALETTE.getBorderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: ${toREM(24)};
  font-weight: 500;
  white-space: nowrap;
`;

const Carousel = styled(NativeCarousel)`
  margin-top: 40px;
`;

const StatesWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MostPopular = () => {
  const { banners, isLoading, error, loadBanners } = useConnect();

  useEffect(() => {
    loadBanners();
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Most popular</Title>
      </TitleWrapper>
      {error && <Error>Something went wrong. Try again later.</Error>}
      {!error &&
        (!banners.length ? (
          <StatesWrapper>
            {isLoading ? (
              <Loader />
            ) : (
              <BlankState>No banners exists</BlankState>
            )}
          </StatesWrapper>
        ) : (
          <Carousel>
            {banners.map(banner => (
              <Banner key={banner.id} {...banner} />
            ))}
          </Carousel>
        ))}
    </Wrapper>
  );
};

export default MostPopular;
