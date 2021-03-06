import { v4 } from "uuid";

import { PALETTE } from "constants/styles";

import LikeIcon from "assets/icons/personal-statistic/like.svg";
import AddPersonIcon from "assets/icons/personal-statistic/person-add.svg";
import CalendarIcon from "assets/icons/personal-statistic/calendar.svg";
import MoneyIcon from "assets/icons/personal-statistic/money.svg";

export const PERSONAL_STATISTIC = [
  {
    id: v4(),
    name: "like",
    icon: LikeIcon,
    description: "Likes delivered for all time",
    iconBackground: PALETTE.lightPink,
    statistic: "2 562",
  },
  {
    id: v4(),
    name: "followers",
    icon: AddPersonIcon,
    description: "New users invited",
    iconBackground: PALETTE.lightPurple,
    statistic: "15",
  },
  {
    id: v4(),
    name: "calendar",
    icon: CalendarIcon,
    description: "Days since registration",
    iconBackground: PALETTE.lightGreen,
    statistic: "329",
  },
  {
    id: v4(),
    name: "money",
    icon: MoneyIcon,
    description: "Real money spent",
    iconBackground: PALETTE.lightOrange,
    statistic: "$ 1456,23",
  },
];
