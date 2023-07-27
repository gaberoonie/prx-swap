import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { alpha, styled } from "@mui/material/styles";
import Badge from '@mui/material/Badge';
import {
  Box,
  Link,
  Stack,
  Button,
  Drawer,
  Tooltip,
  Typography,
  CardActionArea,
  Hidden,
  IconButton,
} from "@mui/material";

import { Icon } from "@iconify/react";
import twitter from "@iconify/icons-cib/twitter";
import discord from "@iconify/icons-cib/discord";
import medium from "@iconify/icons-cib/medium";
import telegram from "@iconify/icons-cib/telegram";
import instagram from "@iconify/icons-cib/instagram";
import reddit from "@iconify/icons-cib/reddit";
import tiktok from "@iconify/icons-cib/tiktok";
// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
// routes
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "./NavSection";
import Label from "components/Label";
//
import sidebarConfig from "./SidebarConfig";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.complex,
    }),
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

IconCollapse.propTypes = {
  onToggleCollapse: PropTypes.func,
  collapseClick: PropTypes.bool,
};

function IconCollapse({ onToggleCollapse, collapseClick }) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: "flex",
          cursor: "pointer",
          borderRadius: "50%",
          alignItems: "center",
          color: "text.primary",
          justifyContent: "center",
          border: "solid 1px currentColor",
          ...(collapseClick && {
            borderWidth: 2,
          }),
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "currentColor",
            transition: (theme) => theme.transitions.create("all"),
            ...(collapseClick && {
              width: 0,
              height: 0,
            }),
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pb: 2,
          ...(isCollapse && {
            alignItems: "center",
          }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* <Box component={RouterLink} to="/" sx={{ display: "inline-flex" }}>
            <Logo />
          </Box> */}

          {/* <Hidden lgDown>
            {!isCollapse && (
              <IconCollapse
                onToggleCollapse={onToggleCollapse}
                collapseClick={collapseClick}
              />
            )}
          </Hidden> */}
        </Stack>
      </Stack>

      <Stack alignItems="center" spacing={1}>
        {/* <Typography color="warning.main">Meta Ruffy Price: 0,0007</Typography> */}
        {/* <Stack direction="row" spacing={1}>
            <RouterLink to="/mystaking/v1" sx={{textDecoration:'none'}}>
                  <Badge badgeContent="Full" sx={{backgroundColor:"#f00", color:'#f00', position:'relative', top:'-24px', right:'-37px', fontWeight:'bolder'}}></Badge>
                  <Button sx={{background:'#003a2d'}}>V1
                  </Button>   
            </RouterLink>
            <RouterLink to="/mystaking/v2" sx={{textDecoration:'none'}}>
              <Badge badgeContent="Full" sx={{backgroundColor:"#f00", color:'#f00', position:'relative', top:'-24px', right:'-37px', fontWeight:'bolder'}}></Badge>
              <Button sx={{background:'#003a2d'}}>V2</Button>   
            </RouterLink>
            <RouterLink to="/mystaking/v3" sx={{textDecoration:'none'}}>
              <Badge badgeContent="Full" sx={{backgroundColor:"#f00", color:'#f00', position:'relative', top:'-24px', right:'-37px', fontWeight:'bolder'}}></Badge>
              <Button sx={{background:'#003a2d'}}>V3</Button>   
            </RouterLink>
            <RouterLink to="/mystaking/v4" sx={{textDecoration:'none'}}>
              <Badge badgeContent="Full" sx={{backgroundColor:"#f00", color:'#f00', position:'relative', top:'-24px', right:'-37px', fontWeight:'bolder'}}></Badge>
              <Button sx={{background:'#003a2d'}}>V4</Button>   
            </RouterLink>
        </Stack> */}
      </Stack>

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />

      <Box sx={{ flexGrow: 1 }} />

      <Stack alignItems="left" spacing={1} sx={{ mb: 5 }}>
        {/* <Typography color="warning.main">Meta Ruffy Price: 0,0007</Typography> */}
        <Stack direction="row" spacing={1}>
          {/* <IconButton target="_blank" href="https://twitter.com/Bybarterio">
            <Icon icon={twitter} fontSize={16} color="white" />
          </IconButton>
          <IconButton target="_blank" href="https://t.me/+Ob-mVTakrCFkMzM0">
            <Icon icon={telegram} fontSize={16} color="white" />
          </IconButton> */}
          {/* <IconButton target="_blank" href="https://twitter.com/Bybarterio">
            <Icon icon={discord} fontSize={16} color="white" />
          </IconButton>
          <IconButton target="_blank" href="https://twitter.com/Bybarterio">
            <Icon icon={instagram} fontSize={16} color="white" />
          </IconButton>
          <IconButton target="_blank" href="https://twitter.com/Bybarterio">
            <Icon icon={reddit} fontSize={16} color="white" />
          </IconButton>
          <IconButton target="_blank" href="https://twitter.com/Bybarterio">
            <Icon icon={tiktok} fontSize={16} color="white" />
          </IconButton> */}
        </Stack>
      </Stack>

      {/* <Box sx={{ position: 'fixed', boxShadow: '0 0 10px 2px #5BE584', color: 'black', bottom: '8px', left: '8px', px: 1, fontSize: 14, background: '#5BE584', width: 60, borderRadius: '4px' }}>Dapp v1</Box> */}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
    >
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>

      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              ...(isCollapse && {
                width: COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) =>
                  alpha(theme.palette.background.default, 0.88),
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
}
