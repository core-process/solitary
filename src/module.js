
export default function solitary(privImpl) {

  const privMap = new WeakMap();

  return function internal(pubObj) {

    // check if we have privObj in map already
    if(!privMap.has(pubObj)) {

      // get property names
      const properties = Object.getOwnPropertyNames(pubObj);
      if(Object.getOwnPropertySymbols) {
        properties.push(...Object.getOwnPropertySymbols(pubObj));
      }

      // get property descriptors
      const descriptors = properties.reduce(
        (result, descriptor) => {
          result[descriptor] = Object.getOwnPropertyDescriptor(pubObj, descriptor);
          return result;
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
        )
      }

      // store privObj
      privMap.set(pubObj, privObj);
      return privObj;
    }

    // get privObj from map
    return privMap.get(pubObj);
  };
};
