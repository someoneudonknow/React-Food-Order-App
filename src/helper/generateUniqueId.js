const generateUniqueId = () => {
  const characters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r"
  ];
  let stringPart = "";
  let numPart;
  for (let i = 0; i < 3; i++) {
    const randomIndex =
      Math.floor(Math.random() * characters.length - 1 - 1 + 1) + 1;
      stringPart += characters[randomIndex];
      numPart = ((Date.now() / 10000 * randomIndex).toFixed());
  }

  const uniqueId = numPart.toString() + stringPart;
  return uniqueId;
};

export default generateUniqueId;
