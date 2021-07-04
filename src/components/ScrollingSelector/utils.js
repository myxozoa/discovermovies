export const scrollHandler = (setState) => (event) => {
  const element = event.target;
  if (Math.abs(element.scrollLeft + element.offsetWidth - element.scrollWidth) < 50) {
    setState("end");
  } else if (element.scrollLeft < 10) {
    setState("start");
  } else {
    setState("none");
  }
};

export const scroll = (direction, ref) => () => {
  if (direction === "left") {
    ref.current.scrollBy({ left: -330, behavior: "smooth" });
  } else {
    ref.current.scrollBy({ left: 330, behavior: "smooth" });
  }
};
