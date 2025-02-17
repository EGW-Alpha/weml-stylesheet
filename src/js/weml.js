const isUppercase = (str) => {
  return /[A-Z]/.test(str);
};

const romanMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const convertRomanToDecimal = (roman) => {
  let sum = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]?.toUpperCase()];
    const next = romanMap[roman[i + 1]?.toUpperCase()];
    if (next === undefined) {
      sum += current;
      continue;
    }
    if (current >= next) {
      sum += current;
      continue;
    }
    sum -= current;
  }
  return sum;
};

const convertLatinToDecimal = (latin) => {
  const start = 96; // "a".charCodeAt(0) - 1
  const len = latin.length;
  const out = [...latin.toLowerCase()].reduce((match, char, pos) => {
    const val = char.charCodeAt(0) - start;
    const pow = 26 ** (len - pos - 1);
    return match + val * pow;
  }, 0);
  return out;
};

const isLatin = (str) => {
  if (!str) {
    return false;
  }
  let code;
  let i;
  let len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      // !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123) // lower alpha (a-z)
    ) {
      return false;
    }
  }
  return true;
};

const parseWLists = () => {
  const wListCollection = document.getElementsByTagName("w-list");
  for (let i = 0; i < wListCollection.length; i++) {
    const wList = wListCollection[i];
    const type = wList.getAttribute("type");
    if (["", null, "unordered"].includes(type)) {
      continue;
    }
    const start = wList.getAttribute("start");
    // const marker = wList.getAttribute("marker") || 1;
    // console.log({
    //   wList,
    //   marker,
    //   start,
    //   isNaN: isNaN(start),
    //   isLatin: isLatin(start),
    // });
    let listCounterStart = 0;
    if (start) {
      if (isLatin(start)) {
        const parsedStart = convertRomanToDecimal(start) - 1;
        if (!isNaN(parsedStart)) {
          listCounterStart = parsedStart;
        } else {
          listCounterStart = convertLatinToDecimal(start) - 1;
        }
      } else {
        listCounterStart = parseInt(start, 10) - 1;
      }
    }
    // wList.style.listStyleType = "none";
    wList.style.setProperty("--wlist-start-value", listCounterStart);

    // const wLiCollection = wList.children;
    // for (let j = 0; j < wLiCollection.length; j++) {
    //   const wLi = wLiCollection[j];
    // }
    // // console.log({
    // //   wList,
    // //   wLiCollection,
    // //   type,
    // //   marker,
    // //   start,
    // //   listCounterStart,
    // // });
  }
};

parseWLists();
