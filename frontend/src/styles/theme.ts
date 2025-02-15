import { MantineThemeOverride, rem } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colorScheme: "light",
  lineHeight: 1.5,
  colors: {
    ebony: ["#51513d", "#51513d", "#51513d", "#51513d", "#51513d", "#51513d", "#51513d", "#51513d", "#51513d"],
    eerie: ['#1b2021', '#1b2021', '#1b2021', '#1b2021', '#1b2021', '#1b2021', '#1b2021', '#1b2021', '#1b2021'],
    moss: ['#a6a867', '#a6a867', '#a6a867', '#a6a867', '#a6a867', '#a6a867', '#a6a867', '#a6a867', '#a6a867'],
    vanilla: ['#E3DC95','#E3DC95','#E3DC95','#E3DC95','#E3DC95','#E3DC95','#E3DC95','#E3DC95','#E3DC95'],
    snow: ['#fffafb','#EFC9B1','#E19C71','#F2E1D6','#CE7F4E','#fffafb','#fffafb','#fffafb','#fffafb'],
    // 0, 3,1,2, 4
  },
  fontSizes: {
    xs: rem(10),
    sm: rem(11),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
    xxl: rem(24),
  },

  // fontFamily: "Helveticaneue roman, sans-serif",
};
