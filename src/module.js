
export default function solitary(PrivateClass) {

  // stores
  const pvtMap = new WeakMap();
  const pubMap = new WeakMap();

  return {
    pvt: (pubObj) => {
      // check if we have pvtObj in map already
      if(!pvtMap.has(pubObj)) {
        // create pvtObj from PrivateClass
        const pvtObj = new PrivateClass(pubObj);

        // update maps
        pvtMap.set(pubObj, pvtObj);
        pubMap.set(pvtObj, pubObj);
      }

      // get pvtObj from map
      return pvtMap.get(pubObj);
    },
    pub: (pvtObj) => {
      // bail out if there is no public object
      if(!pubMap.has(pvtObj)) {
        throw new Error('no public object available');
      }

      // get pubObj from map
      return pubMap.get(pvtObj);
    }
  };
};
