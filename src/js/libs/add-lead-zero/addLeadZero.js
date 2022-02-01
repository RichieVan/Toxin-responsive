function addLeadZero(num) {
  let result;
  if (String(num).length < 2) {
    result = `0${num}`;
  }
  return result;
}

export default addLeadZero;
