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

// export function se() {
//   const [shouldRender, setShouldRender] = React.useState<boolean>(false);
//   const requestRef = React.useRef<any>();


//   const makeARender = () => {
//     // Do anything
//     setShouldRender(true);
//     requestRef.current = requestAnimationFrame(makeARender);
//   }

//   React.useEffect(() => {
//     requestRef.current = requestAnimationFrame(makeARender);
//     return () => cancelAnimationFrame(requestRef.current);
//   }, []);

//   return shouldRender

// }




// const Counter = () => {
//   const [count, setCount] = React.useState(0)

//   // Use useRef for mutable variables that we want to persist
//   // without triggering a re-render on their change
//   const requestRef = React.useRef();
//   const previousTimeRef = React.useRef();

//   const animate = time => {
//     requestRef.current = requestAnimationFrame(animate);
//   }

//   React.useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(requestRef.current);
//   }, []); // Make sure the effect runs only once

//   return <div>{Math.round(count)}</div>
// }

// ReactDOM.render(<Counter />, document.getElementById('app'))