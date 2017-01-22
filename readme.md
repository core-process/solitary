# solitary

Isolates private implementations within classes.

Ever wanted a genuinely private scope within your classes, e.g. to protect methods from being called by derived classes accidentally? This small library offers a convenient approach to isolate private implementations within classes.

## Installation

Install the `solitary` module via

```sh
npm install solitary --save
```

or

```sh
yarn add solitary
```

## Usage

The module provides a single function as default export. Here is the signature:

```js
import solitary from 'solitary';
solitary(Class<PrivateClass>)
  => { pub: PrivateClass => PublicClass,
       priv: PublicClass => PrivateClass
     }
```

### Example

An example is worth a thousand words. This example promotes the decorator library [bindthis](https://github.com/core-process/bindthis) too. Of course you could use `solitary` without it.

```js
import solitary from 'solitary';
import bindthis from 'bindthis';
import React from 'react';

const { priv, pub } = solitary(
  // truly private stuff
  @bindthis
  class {
    onScroll() {
      // get some property
      const someProp = pub(this).props.someProp;
      ...
      // do something with the root node
      if(this._root) {
        ...
      }
    }

    setRoot(node) {
      // store root node for later use
      this._root = node;
    }
  }
);

export default class ExampleComponent extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', priv(this).onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', priv(this).onScroll);
  }

  render() {
    return (<div ref={priv(this).setRoot}>...</div>);
  }
};
```
