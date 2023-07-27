import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
// material
import {
  Stack,
  Container,
  Typography,
  Link,
  Paper,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/styles";
import ConnectButton from "components/ConnectButton";
// import Whitepaper from "./whitepaper.pdf";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "components/Logo";
import { Icon } from "@iconify/react";
import discordIcon from "@iconify/icons-cib/discord";
import twitter from "@iconify/icons-cib/twitter";
import linkedin from "@iconify/icons-cib/linkedin";
import instagram from "@iconify/icons-cib/instagram";
// ----------------------------------------------------------------------

const LinkStyle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: 900,
  letterSpacing: 2,
  fontSize: 20,
  padding: 8,
  border: "3px solid transparent",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s",
  "&:hover": { color: "yellow", borderBottom: "3px solid yellow" },
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={5}
      sx={{ width: 1, position: "relative" }}
    >
      <Box>
        <Logo sx={{ position: "absolute", top: 0, zIndex: 1 }} />
      </Box>
      <Stack direction="row" spacing={4}>
        <LinkStyle
          component={RouterLink}
          to="/"
          spy
          smooth
          fontSize={16}
          fontWeight={500}
        >
          Home
        </LinkStyle>

        <LinkStyle
          component={ScrollLink}
          to="about"
          spy
          smooth
          fontSize={16}
          fontWeight={500}
        >
          About
        </LinkStyle>

        <LinkStyle
          component={ScrollLink}
          to="features"
          spy={true}
          smooth={true}
          fontSize={16}
          fontWeight={500}
        >
          Tokenomics
        </LinkStyle>

        <LinkStyle
          component={ScrollLink}
          to="roadmap"
          spy={true}
          smooth={true}
          fontSize={16}
          fontWeight={500}
        >
          Roadmap
        </LinkStyle>

        <LinkStyle
          component={ScrollLink}
          to="team"
          spy={true}
          smooth={true}
          fontSize={16}
          fontWeight={500}
        >
          Partners
        </LinkStyle>

        <LinkStyle
          component={ScrollLink}
          to="faq"
          spy={true}
          smooth={true}
          fontSize={16}
          fontWeight={500}
        >
          Faq
        </LinkStyle>
      </Stack>
      <Button
        href="/presale"
        sx={{
          position: "relative",
          color: "#00FF75",
          border: "1px solid #00FF75",
          borderRadius: 0,
          fontSize: 18,
          px: 4,
          py: 0.5,
          "&:before": {
            position: "absolute",
            content: '""',
            width: "20px",
            height: "20px",
            bottom: "-10px",
            left: "-10px",
            transform: "rotate(45deg)",
            borderTop: "1px solid #00FF75",
          },
        }}
      >
        Presale
      </Button>
      <ConnectButton />
    </Stack>
  );
}
