export const classNames = (defaultClasses, classes) => {
  for (let key in classes) {
    if (classes[key]) {
      defaultClasses = defaultClasses + " " + key;
    }
  }
  return defaultClasses;
};
