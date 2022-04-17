import {
  Box,
  CSSObject,
  Divider as MuiDivider,
  Drawer as MuiDrawer,
  IconButton,
  ListItemText as MuiListItemText,
  styled,
  Theme,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { FC, Dispatch, SetStateAction } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FadeIn } from ".";
// import { Menu } from "../../@types/MenuType";
import { drawerWidth } from "../../libs/constants";
import { Colors } from "../../libs/constants/Colors";

const Divider = styled(MuiDivider)({
  margin: 10,
  borderColor: Colors.menuGroup,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  //   padding: theme.spacing(0, 1),
  color: "white",
  marginBottom: 20,
  ...theme.mixins.toolbar,
}));

const ListItemText = styled(MuiListItemText)(() => ({
  color: "#fff",
  letterSpacing: 1,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: Colors.backgroundColor,
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: Colors.backgroundColor,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const BoxListItem = styled(Box)<{ active?: boolean }>(({ active = false }) => ({
  borderRadius: 5,
  background: active ? "linear-gradient(45deg, #00B490 30%, #472F92 90%)" : "",
}));

type Props = {
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar: FC<Props> = ({ open, onOpen }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {!open ? (
          <IconButton
            color="inherit"
            onClick={() => {
              onOpen((prev) => !prev);
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        ) : (
          <FadeIn width="90%">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              // px={2}
              width="100%"
            >
              <Typography variant="h6" fontWeight={700}>
                [App Name]
              </Typography>

              <IconButton
                color="inherit"
                onClick={() => {
                  onOpen((prev) => !prev);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
          </FadeIn>
        )}
      </DrawerHeader>
    </Drawer>
  );
};
