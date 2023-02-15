const makeRandomArray = (arrayLength) => {
  const outArray = [];

  for (let i = 0; i < arrayLength; i++) {
    outArray.push(Math.floor(Math.random() * 10));
  }

  return outArray;
};

const bubbleSort = () => {
  const ogArr = makeRandomArray(6);
  // const ogArr = [5, 4, 3, 2, 1, 0];
  const history = [];
  history.push(Array.from(ogArr));

  let notFinished = true;

  while (notFinished) {
    notFinished = false;
    for (let i = 0; i < ogArr.length - 1; i++) {
      if (ogArr[i] > ogArr[i + 1]) {
        let temp = ogArr[i];
        ogArr[i] = ogArr[i + 1];
        ogArr[i + 1] = temp;
        notFinished = true;
      }
      history.push(Array.from(ogArr));
    }
  }
  
  return history
};

bubbleSort();
