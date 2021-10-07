// Example class component

class MyComponent extends React.Component {
  render() {
    return <p>Hello, {this.props.name}</p>;
  }
}

// Example function component

function MyComponent(props) {
  return <p>Hello, {props.name}</p>;
}

// ################# //

// The class component needs to extend the React Component class, and must specify a render method.
// Whereas the function component is simply a function, and the render method is simply the return
// value of the function.

// ################# //

// # If you need a constructor
// If you really, really need a constructor, you're gonna have a bad time. A constructor runs
// once and only exactly once, before the first render of the component. Currently, I haven't
// found a hook that will replace this functionality (know of one? Let me know!)

// Most of the time all that's being done in the constructor of a class component anyway is setting
// up state, and binding event listeners. Both these things are handled differently in function
// components so we're good.

// # If you need to extend a component
// In Javascript, classes can extend other classes, thus inheriting the parent's prototype. In
// fact, if you're creating a class component, you have to extend the base component from React.
// This is more or less not possible with function components, so I wouldn't bother trying

// ################# //
// # Higher order components
// You can make a HOC (higher order component) with a function, however it can often be a bit
// easier to use a class. Up to you, just be warned.

// ################# //
// # Side-effects of combined state updates
// this.setState is no longer available in a function component. Instead we use the useState
// hook, which returns a state variable, and an updater function. If you have some peculiar
// pattern where you're updating a couple of state variables at once, and need to run a specific
// side effect, you might find this difficult (not impossible) with a function component.

// As an example, if you do this

class MyComponent extends React.Component {
  onSomeEventHandler(newName) {
    this.setState(
      {
        counter: this.state.counter + 1,
        name: newName,
      },
      () => {
        console.log("Counter AND name have been updated!");
      }
    );
  }
}
// You're going to struggle to exactly replicate that functionality with a function component.


// ################# //

// # 1. Change the class to a function
// # 2. Remove the render method
// # 3. Convert all methods to functions
// # 4. Remove references to this
// # 5. Remove constructor
// # 6. Replace this.setState
// # 7. useEffect for state update side effects
// # 8. Replace lifecycle methods with hooks





// ################# //
// # 1. Change the class to a function

class MyComponent extends React.Component {
    //...
  }

// to

function MyComponent(props) {
  //...
}


// ################# //








// ################# //
// # 2. Remove the render method
// Remove the render method, but keep everything after & including the return. 
// Make this the last statement in your function.


class MyComponent extends React.Component {
    render() {
        return (<p>Hello, World</p>);
      }
  }

// to

function MyComponent(props) {
  return (<p>Hello, World</p>);
} 

// ################# //








// ################# //
// # 3. Convert all methods to functions

class MyComponent extends React.Component {
  
    onClickHandler(e) {
      // ...
    }
    
  }


// to

function MyComponent {
  
    const onClickHandler = (e) => {
      //...
    }
    
  }


// ################# //








// ################# //
// # 4. Remove references to this

  
class MyComponent extends React.Component(props) {
    
    mySpecialFunction() {
      console.log('you clicked the button!')
    }
    
    onClickHandler(e) {
      this.mySpecialFunction();
    }
    
    
    render() {
      return (
        <div>
          <p>Hello, {this.props.name}</p>
          <button onClick={this.onClickHandler}>Click me!</button>
        </div>
      );
    }
    
  }


//   to

function MyComponent(props) {
  
    //...
    
    const mySpecialFunction = () => {
      console.log('you clicked the button!')
    }
    
    const onClickHandler = (e) => {
      mySpecialFunction();
    }
    
    return (
      <div>
        <p>Hello, {props.name}</p>
        <button onClick={onClickHandler}>Click me!</button>
      </div>
    );
    
  }



// ################# //








// ################# //
// # 5. Remove constructor

// 1. useState

constructor(props) {
    super(props);
    //Set initial state
    this.state = {
      counter: 0,
      name: ""
    }
  }


// to


function MyComponent(props) {
  
  const [counter,setCounter] = useState(0);
  const [name,setName] = useState("");
  
}


// 2. Remove event handler bindings
// We don't need to bind event handlers any more with function components. So if you were doing this;
//      You can simply remove these lines. (What a gross, overly verbose syntax anyway).

constructor(props) {
    this.onClickHandler = this.onClickHandler.bind(this);
  }


// ################# //








// ################# //
// # 6. Replace this.setState

class MyComponent extends React.Component {
  
    onClickHandler(e) {
      this.setState({count: this.state.count+1})
    }
    
  }

// to


function MyComponent() {
  
    const [count, setCount] = useState(0)
    
    const onClickHandler = e => {
      
      setCount(count+1);
      
    }
    
  }



// ################# //








// ################# //
// # 7. useEffect for state update side effects
// Remember how this.setState could accept a callback that would run after the state was updated? 
// Well our useState updater function does no such thing. Instead we have to use the useEffect hook.
// It doesn't work exactly the same though! useEffect will trigger whenever one of it's dependencies are changed.


this.setState({counter: this.state.counter+1}, () => {
    console.log('Counter was updated!')
  })
// to

const [counter, setCounter] = useState(0)

useEffect(() => {
  console.log('counter changed!')
}, [counter])


// ################# //








// ################# //
// # 8. Replace lifecycle methods with hooks


// ComponentDidMount
// Instead of using the componentDidMount method, use the useEffect hook with an empty dependency array.

useEffect(()=>{
    console.log('component mounted!')
  },[]) //notice the empty array here



//   ----------
// ComponentWillUnmount
// Instead of using the componentWillUnmount method to do cleanup before a component is 
// removed from the React tree, return a function from the useEffect hook with an empty dependency array;

useEffect(() => {
    console.log('component mounted')
    
    // return a function to execute at unmount
    return () => {
      console.log('component will unmount')
    }
  }, []) // notice the empty array



//   ----------
// ComponentDidUpdate
// If you pass nothing as the second argument to useEffect, it will trigger whenever a 
// component is updated. So instead of using componentDidUpdate, use;

useEffect(() => {
  
    console.log('component updated!')
    
  }) // notice, no second argument


// ################# //









// ################# //
// # Ex.1 - simple state


import React, {Component} from 'react';

class MyComponent extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      count: props.count || 0
    }
    
    this.onClickHandler = this.onClickHandler.bind(this);
    
  }
  
  onClickHandler(e) {
    
    this.setState({
      count: this.state.count + 1;
    })
    
  }
  
  render() {
    return (
      <div>
        <p>Count : {this.state.count}</p>
        <p>Count isis: {this.state.count}</p>
        <button onClick={onClickHandler}>Increase Count</button>
      </div>
    );
  }
}

// ################# //


import React, {useState} from 'react';

function MyComponent(props) {
  
  const [count, setCount] = useState(props.count || 0);
  
  const onClickHandler = () => {
    setCount(count + 1);
  }
  
  return (
    <div>
      <p>Count is: {count}</p>
      <button onClick={onClickHandler}>Increase count</button>
    </div>
  );

}


// ################# //
// # Ex.2 - useEffect

import React, {Component} from 'react';

class MyComponent extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      data: null,
      isLoading: false,
      error: null
    }
    
  }
  
  async loadAsyncData() {
    
    this.setState({isLoading: true, error: null});
    
    try {
      const resp = await fetch('https://...').then(r=>r.json());
      this.setState({isLoading: false, data: resp});
    } catch(e) {
      this.setState({isLoading: false, error: e});
    }
    
  }
  
  componentDidMount() {
    
    loadAsyncData();
    
  }
  
  render() {
    
    if(this.state.isLoading) return (<p>Loading...</p>);
    if(this.state.error) return (<p>Something went wrong</p>);
    if(this.state.data) return (<p>The data is: {data}</p>);
    return (<p>No data yet</p>);
    
  }
}


// ################# //


import React, {useEffect, useState} from 'react';

function MyComponent() {
  
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  
  const loadAsyncData = async () => {
  
    setIsLoading(true);
    setError(null);
    
    try {
      const resp = await fetch('https://...').then(r=>r.json());
      setData(resp);
      setIsLoading(false);
    } catch(e) {
      setError(e);
      setIsLoading(false);
    }
    
  }
  
  useEffect(() => {
    
    loadAsyncData();
    
  }, []);
  
    
  if(this.state.isLoading) return (<p>Loading...</p>);
  if(this.state.error) return (<p>Something went wrong</p>);
  if(this.state.data) return (<p>The data is: {data}</p>);
  return (<p>No data yet</p>);
    
}

// ################# //




// ################# //
// https://nimblewebdeveloper.com/blog/convert-react-class-to-function-component