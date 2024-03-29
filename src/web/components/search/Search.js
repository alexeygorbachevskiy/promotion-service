import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";

import { BlankButton } from "basics/buttons";
import { BlankInput } from "basics/inputs";

import { PALETTE } from "constants/styles";
import { KEY_CODES } from "constants/keyCodes";

import Media from "helpers/media";

import NativeSearchIcon from "assets/icons/search.svg";
import CrossIcon from "assets/icons/cross.svg";

const Wrapper = styled.div`
  width: ${({ $isOpened }) => ($isOpened ? 600 : 200)}px;
  height: 42px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.5s;

  ${Media.smallerThan.tabletLarge`
     width: 380px;
  `}

  ${Media.smallerThan.mobileMedium`
     width: 100%;
  `}
`;

const Input = styled(BlankInput)`
  width: 100%;
  height: 100%;
  padding: 0 55px 0 45px;
  border-radius: 15px;
  background-color: ${PALETTE.getEmptyItemBackground};

  cursor: ${({ disabled }) => disabled && "not-allowed"};

  &:focus {
    border: 2px solid ${PALETTE.blue};
  }

  &::placeholder {
    color: ${PALETTE.getText};
    opacity: 0.5;
  }
`;

const SearchIcon = styled(NativeSearchIcon)`
  position: absolute;
  margin-left: 12px;
  color: ${PALETTE.getText};
  opacity: 0.5;
`;

const CloseButton = styled(BlankButton)`
  position: absolute;
  right: 25px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${PALETTE.getText};
  opacity: 0.5;
  transition: all 0.5s;

  &:focus {
    opacity: 1;
    border: 2px solid ${PALETTE.blue};
  }

  @keyframes appearance {
    0% {
      transform: rotateX(-0.2turn);
    }
    100% {
      transform: rotateX(0);
    }
  }
  animation-name: appearance;
  animation-duration: 0.5s;
`;

const Search = ({ isDisabled, onSearchChange, className }) => {
  const [value, setValue] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef(null);

  const onSearchChangeLazy = useCallback(
    debounce(text => {
      onSearchChange(text);
    }, 1000),
    [],
  );

  useEffect(() => () => onSearchChangeLazy.cancel(), []);

  let timeOutId = null;

  const onFocus = () => {
    clearTimeout(timeOutId);
    setIsOpened(true);
  };

  const onBlur = () => {
    timeOutId = setTimeout(() => {
      if (!value) {
        setIsOpened(false);
      }
    });
  };

  const onChange = e => {
    const searchText = e.target.value;
    setValue(searchText);
    onSearchChangeLazy(searchText);
  };

  const onClear = () => {
    onSearchChangeLazy.cancel();
    setValue("");
    onSearchChange("");
    setIsOpened(false);
  };

  const onKeyDown = e => {
    if (e.keyCode === KEY_CODES.esc) {
      onClear();
      // for opportunity to make focus again after blur event when KEY_CODES.esc was pressed
      ref.current.blur();
    }
  };

  return (
    <Wrapper
      $isOpened={isOpened}
      aria-expanded={isOpened}
      className={className}
    >
      <SearchIcon />
      <Input
        ref={ref}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Search"
        disabled={isDisabled}
      />
      {isOpened && (
        <CloseButton
          disabled={isDisabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onClear}
        >
          <CrossIcon />
        </CloseButton>
      )}
    </Wrapper>
  );
};

export default Search;
