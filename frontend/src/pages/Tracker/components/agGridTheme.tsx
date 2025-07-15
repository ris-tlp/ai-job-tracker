import { themeQuartz } from "ag-grid-community";

export const theme = themeQuartz.withParams({
  accentColor: "#FFFFFF",
  backgroundColor: "#FFFFFF",
  borderColor: "#000000",
  borderRadius: 4,
  browserColorScheme: "light",
  cellHorizontalPaddingScale: 1,
  columnBorder: false,
  fontFamily: {
    googleFont: "IBM Plex Sans",
  },
  headerFontSize: 14,
  headerFontWeight: 700,
  headerRowBorder: true,
  headerTextColor: "#6C63FF",
  headerVerticalPaddingScale: 1,
  oddRowBackgroundColor: "#F9F9FF",
  rowBorder: true,
  rowVerticalPaddingScale: 1.5,
  wrapperBorderRadius: 24,
});
