import * as React from "react";
import { Recipe } from "../RecipeManagerClient";
import Header from "../Header"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SoupKitchenTwoToneIcon from "@mui/icons-material/SoupKitchenTwoTone";
import DinnerDiningTwoToneIcon from "@mui/icons-material/DinnerDiningTwoTone";
import StepsView from "./StepsView";

const theme = createTheme();

const Step: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <>
    <h3>{title}</h3>
    <p>{description}</p>
  </>
);

const RecipeView: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [iOpen, setIOpen] = React.useState(true);
  const [eOpen, setEOpen] = React.useState(true);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {recipe.title}
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {recipe.description}
              </ListSubheader>
            }
          >
            <ListItemButton
              onClick={() => {
                setIOpen(!iOpen);
              }}
            >
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Ingredients" />
              {iOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={iOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {recipe.ingredients.map((ingredient) => (
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <DinnerDiningTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        ingredient.amount +
                        " " +
                        ingredient.unit +
                        " of " +
                        ingredient.name
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            <ListItemButton
              onClick={() => {
                setEOpen(!eOpen);
              }}
            >
              <ListItemIcon>
                <SoupKitchenTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Equipment" />
              {eOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={eOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {recipe.equipment.map((equipment) => (
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <LocalDiningIcon />
                    </ListItemIcon>
                    <ListItemText primary={equipment.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
          <StepsView stepList={recipe.steps} />
        </Paper>
      </Container>
      </ThemeProvider>
    </>
  );
};

export default RecipeView;
