
export default function solitary(privImpl) {

  const privMap = new WeakMap();

  return function internal(pubObj) {

    // check if we have privObj in map already
    if(!privMap.has(pubObj)) {

      // get property names
      const properties = Object.getOwnPropertyNames(privImpl);
      if(Object.getOwnPropertySymbols) {
        properties.push(...Object.getOwnPropertySymbols(privImpl));
      }

      // get property descriptors
      const descriptors = properties.reduce(
        (res, descr) => {
          res[descr] = Object.getOwnPropertyDescriptor(privImpl, descr);
          return res;
        },
        { }
      );

      // create privObj with pubObj as prototype
      const privObj = Object.create(pubObj);

      // apply properties to privObj
      for(let property of properties) {
        Object.defineProperty(
          privObj,
          property,
          descriptors[property]
        );
      }

      // store privObj
      privMap.set(pubObj, privObj);
      return privObj;
    }

    // get privObj from map
    return privMap.get(pubObj);
  };
};
