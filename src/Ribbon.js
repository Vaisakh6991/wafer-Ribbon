import { Box, IconButton, makeStyles } from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  SkipNext,
  SkipPrevious,
} from "@material-ui/icons";
import { Fragment, useState } from "react";

import CarouselItem from "./CarouselItem";

const useStyles = makeStyles(theme => ({
  root: {
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  item: {
    padding: 5,
    margin: 5,
    cursor: "pointer",
    transition: "all ease-in 0.1s",
  },
  active: {
    padding: "5px 15px",
    borderBottom: "5px solid skyblue",
  },
  content: {
    color: "blue",
  },
  box: {
    padding: 20,
    display: "flex",
    height: 120,
  },
}));

const Ribbon = props => {
  const { item, data } = props;

  const [page, setPage] = useState(0);
  const buttonClickHandler = (direction, value = 1) => {
    if (direction === "left") {
      if (page <= 0 || page + 1 - value <= 0) return;
      setPage(page => page - value);
    } else if (direction === "right") {
      if (page + 1 >= data.length || page + value >= data.length) return;
      setPage(page => page + value);
    } else {
      return;
    }
  };

  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <IconButton onClick={() => buttonClickHandler("left", item)}>
          <SkipPrevious color="primary" />
        </IconButton>
        <IconButton
          onClick={() => buttonClickHandler("left")}
          disabled={page === 0 ? true : false}
        >
          <ChevronLeft color="primary" />
        </IconButton>
        <Box className={classes.box}>
          {data.map((elem, index) => (
            <CarouselItem
              key={index}
              className={`${classes.item} ${
                page === index ? classes.active : null
              }`}
              click={() => setPage(index)}
            >
              {elem.value}
            </CarouselItem>
          ))}
        </Box>
        <IconButton
          onClick={() => buttonClickHandler("right")}
          disabled={page + 1 === data.length ? true : false}
        >
          <ChevronRight color="primary" />
        </IconButton>
        <IconButton onClick={() => buttonClickHandler("right", item)}>
          <SkipNext color="primary" />
        </IconButton>
      </div>
      <div style={{ padding: "15px 25px" }}>
        <p className={classes.content}> Content - {data[page].content} </p>
      </div>
    </Fragment>
  );
};

export default Ribbon;
