import * as React from 'react';

declare global {
  namespace JSX {
    type Element = React.ReactElement<any, any>;
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    type LibraryManagedAttributes<C, P> = React.LibraryManagedAttributes<C, P>;
  }
}
