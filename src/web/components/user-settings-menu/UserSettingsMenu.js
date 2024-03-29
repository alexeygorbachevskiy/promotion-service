import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { PALETTE } from "constants/styles";
import { KEY_CODES } from "constants/keyCodes";

import Media from "helpers/media";

import PlusIcon from "assets/icons/plus.svg";
import NativeCoinsIcon from "assets/icons/coins.svg";
import AvatarIcon from "assets/icons/avatars/avatar-main40.svg";
import NativeArrowDownIcon from "assets/icons/arrow-down.svg";

import { BlankButton } from "basics/buttons";

import { UserSettingsPopup } from "./components";

const Wrapper = styled.div`
  position: relative;
  width: 240px;
  height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${Media.smallerThan.mobileLarge`
     width: initial;
  `}
`;

const BalanceWrapper = styled.div`
  width: 146px;
  height: 100%;
  background-color: ${PALETTE.getEmptyItemBackground};
  border-radius: 15px;

  display: flex;
  align-items: center;

  ${Media.smallerThan.mobileLarge`
     display: none;
  `}
`;

const AddIconButton = styled(BlankButton)`
  margin: 0 19px 0 5px;
  width: 30px;
  height: 30px;

  border-radius: 12px;
  background-color: ${PALETTE.blue};
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid transparent;

  &:focus {
    border: 2px solid ${PALETTE.getHeaderBackground};
  }
`;

const CoinsIcon = styled(NativeCoinsIcon)`
  margin-right: 5px;
`;

const ArrowDownIcon = styled(NativeArrowDownIcon)`
  color: ${({ $isDropdownOpened }) =>
    $isDropdownOpened ? PALETTE.blue : PALETTE.getNotSelectedTextColor};
  transition: color 0.15s ease-out;

  transform: ${({ $isDropdownOpened }) =>
    $isDropdownOpened && `rotate(180deg)`};
`;

const UserSettingsButton = styled(BlankButton)`
  width: 76px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 2px solid transparent;

  &:focus {
    border: 2px solid ${PALETTE.blue};
  }
`;

const UserSettingsMenu = () => {
  const dropdownRef = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const onOpenCloseDropdown = () => {
    setIsDropdownOpened(prevIsOpened => !prevIsOpened);
  };

  useEffect(() => {
    const onCloseDropdown = e => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsDropdownOpened(false);
      }
    };

    const onEscKeyDown = e => {
      if (e.keyCode === KEY_CODES.esc) {
        onOpenCloseDropdown();
      }
    };

    if (isDropdownOpened) {
      window.addEventListener("click", onCloseDropdown);
      window.addEventListener("keydown", onEscKeyDown);
    }

    return () => {
      window.removeEventListener("click", onCloseDropdown);
      window.removeEventListener("keydown", onEscKeyDown);
    };
  }, [isDropdownOpened]);

  return (
    <Wrapper>
      <BalanceWrapper>
        <AddIconButton disabled>
          <PlusIcon />
        </AddIconButton>
        <CoinsIcon />
        2023
      </BalanceWrapper>
      <UserSettingsButton onClick={onOpenCloseDropdown}>
        <AvatarIcon />
        <ArrowDownIcon $isDropdownOpened={isDropdownOpened} />
      </UserSettingsButton>
      <UserSettingsPopup ref={dropdownRef} isOpened={isDropdownOpened} />
    </Wrapper>
  );
};

export default UserSettingsMenu;
