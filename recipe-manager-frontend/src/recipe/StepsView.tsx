import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListSubheader from "@mui/material/ListSubheader";
import { Step } from "../RecipeManagerClient";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const StepsView: React.FC<{ stepList: Step[] }> = ({ stepList }) => {
  const [checked, setChecked] = React.useState([0]);
  const [opened, setOpened] = React.useState([1]);

  const handleChecked = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleOpened = (value: number) => () => {
    const currentIndex = opened.indexOf(value);
    const newOpened = [...opened];

    if (currentIndex === -1) {
      newOpened.push(value);
    } else {
      newOpened.splice(currentIndex, 1);
    }

    setOpened(newOpened);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Steps
        </ListSubheader>
      }
    >
      {stepList.map((stepEntry, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleChecked(index)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
          >
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{stepEntry.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{stepEntry.description}</Typography>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        );
      })}
    </List>
  );
};

export default StepsView;
