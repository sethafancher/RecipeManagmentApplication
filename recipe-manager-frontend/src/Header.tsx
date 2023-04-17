import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import { Link } from "react-router-dom";

const Header: React.FC<{}> = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            <OutdoorGrillIcon sx={{ mr: 2 }} />
            Home
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
