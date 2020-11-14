import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

/**
 * Source: https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3
 * Allows two animation frames to complete to allow other components to update
 * and re-render before mounting and rendering an expensive `WrappedComponent`.
 */

export default function deferComponentRender<WCProps>(WrappedComponent: React.ComponentType<WCProps>) {
  // class DeferredRenderWrapper extends React.Component {
  //   state = { shouldRender: false };

  //   constructor(props: WCProps, context: any) {
  //     super(props, context);
  //   }

  //   componentDidMount() {
  //     window.requestAnimationFrame(() => {
  //       window.requestAnimationFrame(() => this.setState({ shouldRender: true }));
  //     });
  //   }


  //   render() {
  //     return this.state.shouldRender ? <WrappedComponent {...this.props} /> : null;
  //   }
  // }


  function DeferredRenderWrapper<T extends WCProps>(props: T) {
    const [shouldRender, setShouldRender] = React.useState<boolean>(false);
    const requestRef = React.useRef<any>();


    const makeARender = React.useCallback(() => {
      // Do anything
      setShouldRender(true);
      requestRef.current = requestAnimationFrame(makeARender);
    }, []);

    React.useEffect(() => {
      requestRef.current = requestAnimationFrame(makeARender);
      return () => cancelAnimationFrame(requestRef.current);
    }, [makeARender]);

    return shouldRender ? <WrappedComponent {...props} /> : null;
  }


  return hoistStatics(DeferredRenderWrapper, WrappedComponent);
}