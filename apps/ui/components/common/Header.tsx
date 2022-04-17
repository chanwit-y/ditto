import { FC, Dispatch, SetStateAction } from "react";
import {
  Toolbar,
  styled,
  Avatar,
  Box,
  Typography,
  Divider as MuiDivider,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { grey } from "@mui/material/colors";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { drawerWidth } from "../../libs/constants";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "white",
  borderBottom: 1,
  borderBottomColor: "lightgrey",
  borderBottomStyle: "solid",
  zIndex: theme.zIndex.drawer + 1,
  ...(open
    ? {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    : {
        marginLeft: 74,
        width: `calc(100% - ${74}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
}));

const ProfileAvatar = styled(Avatar)<{ size?: number; marginLeft?: number }>(
  ({ size = 40, marginLeft = 30 }) => ({
    marginLeft: marginLeft,
    marginRight: 5,
    width: size,
    height: size,
  })
);

const Divider = styled(MuiDivider)`
  margin-left: 15px;
  margin-right: 15px;
`;

type Props = {
  open: boolean;
  onOpen?: Dispatch<SetStateAction<boolean>>;
};

export const Header: FC<Props> = ({ open, onOpen }) => {

  return (
    <AppBar elevation={0} open={open}>
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          flexGrow={1}
          py={1}
          mx={1}
          color="black"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
          >
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
          >
            <Typography variant="subtitle2" mx={1}>
              Back Office
            </Typography>
            <Divider orientation="vertical" />
            <NotificationsNoneIcon color="disabled" />
            <Typography variant="body2" color={grey[600]} ml={2}>
              Role:
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
