import { Box, IconButton, makeStyles } from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  SkipNext,
  SkipPrevious,
} from "@material-ui/icons";
import { Fragment, useEffect, useState } from "react";
import CarouselItem from "./Item";

const useStyles = makeStyles(theme => ({
  root: {
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  item: {
    padding: "auto",
    textAlign: "center",
    margin: 5,
    cursor: "pointer",
    transition: "all ease-in 0.1s",
    maxWidth: 100,
    width: 100,
    position: "relative",
  },
  active: {
    borderBottom: "5px solid skyblue",
  },
  content: {
    color: "blue",
  },
  box: {
    position: "relative",
    boxSizing: "border-box",
    overflow: "hidden",
    width: "600px !important",

    flexWrap: "nowrap",
    display: "box",
    padding: 20,
    height: 120,
  },
}));

const Ribbon = props => {
  const { item, data } = props;

  const [page, setPage] = useState(0);
  const [x, setX] = useState(0);
  // const [transformedArry, setTransformedArry] = useState([]);

  // useEffect(() => {
  //   const chunkArray = (array, chunk_size) => {
  //     let result = [];
  //     while (array.length) {
  //       result.push(array.splice(0, chunk_size));
  //     }
  //     return result;
  //   };
  //   setTransformedArry(chunkArray(data, item));
  // }, [data, item]);

  const buttonClickHandler = (direction, value = 1) => {
    if (direction === "left") {
      if (page <= 0 || page + 1 - value <= 0) return;
      setPage(page => page - value);
      if (value !== 1) {
        setX(x => (x + 100) * value);
      } else {
        setX(x => x + 100);
      }
    } else if (direction === "right") {
      if (page + 1 >= data.length || page + value >= data.length) return;
      setPage(page => page + value);
      if (value !== 1) {
        setX(x => (x - 100) * value);
      } else {
        setX(x => x - 100);
      }
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
              style={{ transform: `translateX(${x}px)` }}
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
