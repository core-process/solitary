
export default function solitary(privImpl) {

  const privMap = new WeakMap();

  return function internal(pubObj) {

    if(!privMap.has(pubObj)) {

      const privObj = Object.create(pubObj);
      for(let prop of Object.keys(privImpl)) {
        privObj[prop] = privImpl[prop];
      }

      privMap.set(pubObj, privObj);
      return privObj;
    }

    return privMap.get(pubObj);
  };
};
