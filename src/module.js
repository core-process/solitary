
export default function solitary(privClass) {

  // stores
  const privMap = new WeakMap();
  const pubMap = new WeakMap();

  return {
    priv: (pubObj) => {
      // check if we have privObj in map already
      if(!privMap.has(pubObj)) {
        // create privObj from privClass
        const privObj = new privClass(pubObj);

        // update maps
        privMap.set(pubObj, privObj);
        pubMap.set(privObj, pubObj);
      }

      // get privObj from map
      return privMap.get(pubObj);
    },
    pub: (privObj) => {
      // bail out if there is no public object
      if(!pubMap.has(privObj)) {
        throw new Error('no public object available');
      }

      // get pubObj from map
      return pubMap.get(privObj);
    }
  };
};
