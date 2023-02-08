import React, { useEffect } from "react";

function AnotherOne() {
  return (
    <h2>i'm the very second element!</h2>
  );
}

ReactDOM.render(
  <>
  <App /> 
  <AnotherOne />
  </>
,  document.getElementById('root')
);

//First letter should be in capital case i.e App, AnotherOne

const navbar = (<navbar>
<h1>logo</h1>
</navbar>); // any JSX object in a variable must be put between two parenthesis 

//JSX returns plain javascript object not recognized by browser dealing with DOM 
// it's only when we use ReactDOM.render() the render method interpret's the jsx object in a way that turns them into real DOM elements

//pascal case is capitlizing the very first letter for the components and the rest goes as the camelcase

// you can access images like this <img alt="" src='./logoinblack.png' /> from projfolder/src/index.js 
// and their location would be in the public folder!

/* ASSET IMPORTING

 if you want to import image so you have relative location wherever you call the react component 
 it's better to put the images inside the src folder and import it (and generally more favorable to import assests into js files ratherthan
 using public folder as you assests source
 make sure the image or the image folder is inside the src folder because imports from outside the src folder aren't supported
 
 */

// that goes only for JSX elements not css files you need to import css files inside of react file using import "./styleesheet.css" and
//it's location should be inside the src folder

//  Babel is a very famous transpiler that basically allows us to use future JavaScript in today's browsers.  is needed for 2 main tasks: To compile JSX into React & createElement API calls
// npx is an npm package runner that can execute any package that you want from the npm registry without even installing that package

const date = new Date().getHours();  // outputs the actual result 

const date1 = new Date().getHours; /// outputs the code within the function itself.it's a native function so it will return ƒ getHours() { [native code] }

// Adding images in the public folder and the src folder both are acceptable methods,
// however, importing images into your component has the benefit that your assets will be handled by the build system,
// and will receive hashes which improves caching/performance. You’ll also have the added benefit that it will throw an error if the file is moved/renamed/deleted.

// just like a paramater is passed into a function props are passed into a component
// helps us make a component more reusable 

//deconstructing props 
export default function MyAwesomeComponent(props) {
  return (
    <h1>this is my awesome component {props.title} </h1>
    <h1>this is my awesome component {props.name} </h1>
    <h1>this is my awesome component {props.rank} </h1>

  );
}

//and turn in to this 
export default function MyAwesomeComponent({title,name,rank}) {
  return (
    <h1>this is my awesome component {title} </h1>
    <h1>this is my awesome component {name} </h1>
    <h1>this is my awesome component {rank} </h1>

  );
}
explicit (return) means the return is visible and written in an arrow function
let myFunc = ( (item) => {
  return item * item; 
})

implicit (return) in an arrow function
let myFunc = (item => item*item) // since it's only one item we can remove the () surronding the paramater `item`

dataArray.map((item) => {
  return ( <Card key={item.id} {...item} );
});

// deconstructing object 
// let (url = obj.url) 
// let {url} = obj;

//anytime you have a changing values that should be saved/displayed, you will likely be using state.

// import react, {useState} from "react"; // this is called object destructing as we can have the method useState ready to use instead of getting it from react object

export default function App() {
  let [variable, SetVariable] = React.useState("NO");  
  
  // react.useState("defaultVal") returns an array ["defaultVal", fn()] you can destruct those 
  // with an array destructor to have the default value into a variable and to change or "set" the value into something else by passing the new value to the 
  //Setvariable setter function
  function clickHandler() {
    variable === "YES" ? SetVariable("NO") : SetVariable("YES");
  }
  return (
    <>
      {<p onClick={clickHandler}>{variable}</p>}
    </>
  );
}

// a bad practice when you use the counter++ which means counter = counter +1 which changes the value of the counter instead of letting setCounter changes it
// a better approach is to use counter + 1 that will get the value adds one to that value and pass it to the setCounter to set the value itself
// the best approach is to pass a function the return function for that function is going to be passed to the setCounter and updates the counter value
//when you define a paramater to that function the value being passed by the setter function is actually the current value of the counter 
// you can use that function as a reference for the new value of the counter you want to have

  let [counter, setCounter] = React.useState(0);
  function incCounter() {
    // setCounter(counter++);
    // setCounter(counter + 1);
     setCounter(function(OldValue) {
      return OldValue+1;
    })
  }
  function DecCounter() {
    setCounter(counter - 1);
    console.log(counter);
  }

  let [thingsArray, setThingsArray] = useState(["thing 1", "thing 2"]); // update an array with an element or remove the last element from the array 

  const things = thingsArray.map((thing) => <p key={thing}>{thing}</p>);

  function addItems() {
    setThingsArray(function (prevThings) {
      return [...prevThings, `Thing ${prevThings.length + 1}`];
    });
  }

  function removeItems() {
    setThingsArray(function (prevThings) {
      let temp = [...prevThings];
      temp.pop();
      return [...temp];
    });
  }
return (
  //JSX goes here 
  {things}
) 
Objects in state (UseState)

  const [contact, setContact] = React.useState({
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (719) 555-1212",
    email: "itsmyrealname@example.com",
    isFavorite: true,
  });
  let starIcon = contact.isFavorite ? "star-filled.png" : "star-empty.png";

  function toggleFavorite() {
    setContact((prevContact) => {
      return {...prevContact  , isFavorite: !prevContact.isFavorite };
    });
  }
// anothe way to type the arrow function
  function toggleFavorite() {
    setContact((prevContact) => ({ // this is called implicit return don't forget about it
      ...prevContact,
      isFavorite: !contact.isFavorite,
    }));
  }
// whenever state changes it will rerender the component where the state exists and any child component that may relay on the state to be working correctly

// passing a prop with a value that you are going to put it inside useState and control it inside a component which means you have  2 sources of truth
//isn't the best approach 

export default function Box({on}) {
    let [boxVal,setBoxVal] = useState(on);
    function toggle () {
        setBoxVal((oldState)  => !oldState);
        }

    let styles = {
        backgroundColor: (boxVal ? "#222222" : "transparent" ),
    }
    return <div className="box-container" style={styles} onClick ={toggle} ></div>
}

// another way is to pass a function ex) toggle and that function is going to change in the original state instead of having to create an inner state like the prev exaxmple

    function toggle(id) {
      setSquares(function (oldSquares) {
  const newSquares = [];
        for (let i=0; i<oldSquares.length; i++) {
          const currentSquare = oldSquares[i];
          
            if (currentSquare.id === id) {
              let updatedSquare = {
                ...currentSquare,on:!currentSquare.on,
              }
              newSquares.push(updatedSquare);
              } else {
                newSquares.push(currentSquare);
              }
            }
           return newSquares;
        }

      );
    }

        function toggle(id) {
      setSquares(function (oldSquares) {
       return  oldSquares.map(function(square) {
           return (square.id === id) ? {...square, on:!square.on} : square;
        });
    });
  }

    function handleEvent(e) {
    setFormData(function (prevData) {
      return { ...prevData, [e.target.name]: e.target.value }; // there's a feature in ES6 called computed properties
      // you can turn a dymanic string like something saved in a variable (e.target.name) and use it as the property name for the object
      // by surronding the dynamic string in a square brackets [  ]
    });
  }
  // another example is 

    function handleEvent(e) {
      const name = "firstName";
    setFormData(function (prevData) {
      return { ...prevData, name: e.target.value }; // using name will result in returning the prev object along with a name prop rather than the required firstName
      // you can in this example use ES6 feature computed properties to use a dynamic string that's saved in the name variable as the property name for the object
    }); // notice the color difference after surronding name with []
  }

  // it's own separate closing tag <textarea></textarea> in react it's <textarea value="" />
  // self closing <input />
  // make sure to assign the name of the input the same as it's name in the properties in the object

  //submitting a form is either through <input type="submit" /> and the usual text value is submit
  // if you want to change it you can add an attribute called value and equate it to what you want

  // 2nd option is if there's a button element inside a form it will be automatically treated as a submit button and will be given type="submit" by default
  // if you don't want it to behave that way you can add type="button" 
  // best is to use the button element so you don't have to deal with the value attribute instead <button>send it in!</button>

        // useEffect!

  // the reason why we are using useEffect instead of regular fetch 
  // is because as in the code belows shows when react renders the component for the first time the api call sets starWarsData through setStarWarsData
  // which makes the component render again causing to call the api again and setting starWarsData through setStarWarsData which is going to cause an infinite loop
  export default function App() {

  const [starWarsData, setStarWarsData] = React.useState({});
  console.log("component rendered");
  fetch("https://swapi.dev/api/people/1")
    .then((res) => res.json())
    .then((data) => setStarWarsData(data));
    return (
      <div>
          <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
      </div>
  )
  }
// `count is ${count}` these are called Template literals (Template strings), `` are called backticks
// and whenever you use a variable it means you interpolate the value inside

  // using useEffect hook
// depending on the depencies array that's provided as the 2nd paramater to useEffect method the function passed as the 1st paramater will be called
// if the values changed using setter function (even it was still the same value from the last re-render) as long as you used the setter function 
// that counts as a change
 // the useEffect function will be triggered if it didn't get changed from the previous render it won't get triggered
// this code doesn't run the useEffect function unless the count value changed

//IMPORTANTTT
// THIS WILL CAUSE AN INFINITE LOOP because starWarsData got chanaged [even it got changed to the same value doesn't from https://swapi.dev/api/people/1
// mean it didn't got changed!!!!

const [starWarsData, setStarWarsData] = React.useState({});
const [count, setCount] = React.useState(1);

React.useEffect(
  function () {
    console.log("component rendered");

    fetch(`https://swapi.dev/api/people/1`)
      .then((res) => res.json())
      .then((data) => setStarWarsData(data));
  },
  [starWarsData]
);
// if you want to run the api on the very first render only put an empty depencies array []
// CONTROLLED WITH COUNT VALUE 
  const [starWarsData, setStarWarsData] = React.useState({});
  const [count, setCount] = React.useState(1);

  React.useEffect(
    function () {
      console.log("component rendered");

      fetch(`https://swapi.dev/api/people/${count}`)
        .then((res) => res.json())
        .then((data) => setStarWarsData(data));
    },
    [count]
  );
  function handleClick() {
    setCount((prevCount) => prevCount + 1);
  }

/*
  1. What is a "side effect" in React? What are some examples?
- Any code that affects an outside system.
- local storage, API, websockets, two states to keep in sync


2. What is NOT a "side effect" in React? Examples?
- Anything that React is in charge of.
- Maintaining state, keeping the UI in sync with the data, 
  render DOM elements


3. When does React run your useEffect function? When does it NOT run
   the effect function?
- As soon as the component loads (first render)
- On every re-render of the component (assuming no dependencies array)
- Will NOT run the effect when the values of the dependencies in the
  array stay the same between renders


4. How would you explain what the "dependecies array" is?
- Second paramter to the useEffect function
- A way for React to know whether it should re-run the effect function
*/

/* what can't react handle (Out)side effects
- localStorage react don't interface with localStorage but you can use regular JS to use
- API/Database interactions
- subscribtions
- syncing 2 different internal states together


*/

/* trying to update a react state on an unmounted component could cause a memory leak and shall throw an error
 so that's why you should do a cleanup 
we setuped an event listener on the window and which registered it on our browser and even removing the component that had the event listener (by toggling it off)
doesn't automatically remove that event listener

useEffect will only run after the dom is painted
 */
// useEffect will only run once as there's nothing in the depencencies array
// an event listener is attached to the window object for a function called adjustWidth which is now registered on our browser
// even removing the component that had the event listener (by toggling it off) won't remove the event listener
// so now the function adjustWidth will still run on winow resize and will try to set the innerWidth state even after it the component got removed from the dom
// return function the useEffect recieves to clean up after the component unmounts (gets removed from the dom) is responsible for removing the event listener
// and it runs once the component unmounts
// 
import React from "react";

export default function WindowTracker() {
  let [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    console.log("effect ran");
    function adjustWidth() {
      setInnerWidth(window.innerWidth);
      console.log("bueno");
    }
    window.addEventListener("resize", adjustWidth);
    return () => {
      console.log("adios");
      window.removeEventListener("resize", adjustWidth);
    };
  }, []);

  return <h1>Window width: {innerWidth}</h1>;
}
  /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

    React.useEffect(() => {
      async function getMemes() {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        setAllMemes(data.data.memes);
      }
      getMemes();
      return function() {
        //cleanup code goes here and runs when the component unmounts
      }
    }, []);

    //  Lazy Initialization | Lazy Initial State
    // if we have a constant value to use as the initial state for a useState it will get assigned the very first time the component renders
    // and then react ignores it and keeps track of it whenever it gets changed however..
// when you have a getter function or a function that's going to return the inital state whenever the component rerenders it will run 
// if it's something like 
 const [state, setState] = React.useState(conosole.log("hamada")); 
 // it will each and everytime the component rerenders if it's an expensive function it needs to be lazy loaded by having a function () => {our function}
    const [notes, setNotes] = React.useState(
      () => JSON.parse(localStorage.getItem("notes")) || []
    );

// the reason why the key prop is important so react can keep the components in order if anything were to be removed or added to the array of components

// CLASS COMPONENTS


// every object that i will create with the class will be able to run any of the methods that i define on the class
// class fields to initialize object properties so they can be the same for every object
// ES6 JS CLASSES

class Character {
  // If you need to initialize values when creating the 
  // object, you must include a constructor
  constructor(initialHp=100) {
      this.hp = initialHp
  }
  
  // If you will always initialize an instance with a hard-coded
  // value, you can declare that without a constructor
  alive = true
  
  // I can refer to the object calling this method as `this`
  // and therefore can access and update the properties of
  // this object with, e.g.: `this.hp = ...`
  updateHp(amount) {
      const updatedval = this.hp + amount
      if (updatedval <= 0) {
          // Trying to avoid any character 
          // having a negative amount of HP
          this.hp = 0
          this.alive = false
      } else {
          this.hp = updatedval
      }
  }
}

const char = new Character();
console.log(char.hp) // 100
char.updateHp(100)
console.log(char.hp) // 200



class Enemy extends Character {
  constructor(hp, lootToDrop) {
      super(hp)
      this.lootToDrop = lootToDrop
  }
}

class Hero extends Character {
  constructor(hp) {
      super(hp)
  }
  inventory = []
  
  defeatEnemy(enemy) {
      if(enemy.lootToDrop) {
          this.inventory.push(enemy.lootToDrop)
      }
      enemy.updateHp(enemy.hp * -1) // enemy.hp + (-enemy.hp)
      enemy.lootToDrop=null;
  }
}


const enemy = new Enemy(200, "Sword of a Thousand Truths")
const me = new Hero(100)

// took shrooms
me.updateHp(200);
console.lg(me.hp); //300 (stronger)
console.log(me.inventory);

me.defeatEnemy(enemy);
console.log("My inventory:", me.inventory)
console.log("Enemy's HP:", enemy.hp) // 200+ 200*-1
console.log("enemy.alive:", enemy.alive)
console.log(enemy.lootToDrop); // null

// REACT COMPONENTS 

class App extends React.Component {
  render() {
    return (
      <div>
        <Header name="ahmad ghoniem" />
      </div>
    );
  }
}
class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>welcome, {this.props.name} !</h1> 
      </header>
    );
  }
}


export default App;

// state value in regular useState hooks could be anything but in react class Component it has to be an object and the 
//state values we are gonna use throughout the app are properties


class App extends React.Component {
  state = {
    count: 0,
  };
  inc = () => {
    // since is going to use this.setState method inheritied from React.Component the function needs to be an arrow function
    // else it will throw an error Cannot read properties of undefined (reading 'setState')
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };
  render() {
    {/* JSX GOES HERE */}
  }
}
//the magic parentheses force the parser to treat the object literal as an expression instead of a block statement

this.setState(prevState => {count: prevState.count + 1}); // this won't trigger the implicit return in an arrrow function 
this.setState(prevState => { ({count: prevState.count + 1}) }); // this also won't trigger the implicit return yes we have an object right now with the 
// count property inc +1 but we are not yet returning it 

this.setState(prevState => ({count: prevState.count + 1})); // surrond with parenthesis to trigger the implicit return so that arrow function would return an
// object rather than being a function with something undefined like count: prevState.count + 1

// constructor construct the object that will be created when you create an instane of this class and in react we create instances 
// of this classes everytime we create an instance of our component using JSX like <App />

// anonymous function as it has no name
// usually assigned to a variable
let anonymousFunc = function () {
  return "hello";
}  

// callback function is an anonymous function that's being passed to a function 
setTimeout(function () {
  
}, timeout);

// named function 
// 1) factory function 
function getName (name) {
  return `name is ${name}`;
}
// 2) constructor function
function Person(n) {
  this.name = n;
}
 me  = new Person("ghogho");
console.log(me); // Person {name: 'ghogho'} first letter doesn't have to be capital aswell
// constructor function are not allowed to be arrow functions or else you will get an error person isn't a constructor function

// object methods 
const obj = {
  name:"ahmad",
  getName: function () {
   return `name is ${this.name}`;
  }
}

// arrow function don't get arguments by default...

let myFunc = function () {
  return [...arguments];
}
console.log(myFunc("ahmad","hamada","sheko"));  // ['ahmad', 'hamada', 'sheko']
// while
myFunc = () => {
  return arguments;
}
console.log(myFunc("ahmad","hamada","sheko"));  // Uncaught ReferenceError: arguments is not defined

// a function that accepts a callback function as an argument is a higher order function like setinterval, map, reduce ...
// arrow functions are always anonymous function that can't have a name
// benefits 1) shorter (aesthetics) 2)binding with this

let object = {
  name: "sheko",
  talk: function () {
    return this;
  },
  arrrowTalk: () => {
    return this;
  },
};
object = { 
  name: "sheko",
  talk() { // shorthand for writing a method inside of an object
    return this;
  },
};

console.log(object.talk()); // {name: 'sheko', talk: ƒ, arrrowTalk: ƒ}
console.log(object.arrrowTalk()); //  Window {window: Window, self: Window, document: document, name: '', location: Location, …}
/**
 * a regular function when invoked by an object automatically makes a binding between the this keyword and the object that called it
 * while an arrow function would use this as a reference for the window object 
 * so that's why you shouldn't be using an arrow function inside of object as methods
 * object don't create bindings with this but functions to like the regular function talk binded the this keyword and the object that called it
 * 
*/

// an example of how you can use the arrow function and this into your advantage
object = { 
  name: "sheko",
  talk() { // shorthand for writing a method inside of an object
   setTimeout(() =>{console.log(this.name)},100); // "sheko" 
   // if you are using a higher order function inside of a method you should use this keyword
   //an arrow function's this would be the same as if you were to call it in the surrounding context
   // use this as an answer to what the value of this will be
   // as you can see it's not like a regular function as it doesn't bind itself to the object calling it 
  },
}; 

// another example where it can go wrong 

object = { 
  name: "sheko",
  talk() { // shorthand for writing a method inside of an object
   setTimeout(function () {console.log(this.name)},100); // undefined as we are accessing the window object right now 
   //if you were to use this.crypto (property that lives inside window) you would get a value
  },
}; 
// some callback function should be arrow function and some shouldn't because of the way the higher order function choose to call the callback function
// if it doesn't bind it to an object this will refer to the window object but if it does bind it to an object with 
callbackFunc() {
  console.log(this);
}
higheOrderFunc(callbackFunc,ojb) {
  callbackFunc.call(obj); // this line bind this keyword to the obj we are passing to our higher order function so whenever we invoke the callback func
  // the this value inside it refers to the obj we passed with the method .call
  callbackFunc(); // this line with invoke the function without binding it to anything thus this will refer to the window object
}

class App extends React.Component {
  constructor() {
    super();
    console.log(this); // our App class
  }
  state = {
    count: 0,
  };
  add = () => {
    console.log(this); // our app class
    // this is going to use this.setState method inheritied from React.Component the function needs to be an arrow function
    // else it will throw an error Cannot read properties of undefined (reading 'setState')
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  sub() {
    console.log(this); // undefined as the function isn't bound to an object nor the window object as it's a method inside of a class
    // however when we bind it to the this value that lives inside of the constructor method (this keyword inside of the constructor refers to our App class)
    // it will be working fine also you can bind it to the this value inside of our arrow function add that it's this value refers to the App class
    this.setState((prevState) => {
      return { count: prevState.count + -1 };
    });
  }
}

//what cools and minor benefit about react class components and setState method
class App extends React.Component {
  state = {
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (719) 555-1212",
    email: "itsmy realname@example.com",
    isFavorite: false,
  };

  toggleFavorite = () => {
    this.setState((prevState) => {
      return {
        isFavorite: !prevState.isFavorite 
        /**
         * setState will automatically join the state object you returned that only has the  new isFavorite value with the original object
         * and you don't have to manually copy the rest of the paramaters like you used
         * using function component return {...prevState, isFavorite: !PrevState.isFavorite
         */
        };
    });
  };
}

// react life cycle methods 

state = {
  character: {}
}


componentDidMount() {
  console.log("componentDidMount"); // this function will run only once after the render method is executed and DOM is painted on the screen
  fetch("https://swapi.dev/api/people/1")
      .then(res => res.json())
      .then(data => {
          this.setState({character: data})
      })
}
// this piece of code above is very similar to a useEffect with an empty dependency array

// React.useEffect(() => {
//     // Your code here
// }, [])

render() {
  console.log("render")
  return (
      <h1>{this.state.character.name}</h1>
  )
}

// what you will see in the console is 
/**
 * "render"
 * "componentDidMount"
 * "render" because the state was updated
 */

// instead of using componentDidMount () {} to only set the state based on a simple function like localStorage.getItem you can set it up in the class field 
// which is more efficient
state = JSON.parse(localStorage.getItem("formData")) || {
  firstName: "", 
  lastName: "", 
  email: "", 
  comments: "", 
  isFriendly: true,
  employment: "",
  favColor: ""
}

// 
// react gives us a way that we can tell wether we should update our state (getStarWarsCharacter function invokes a setState function)
// by getting prevProps and prevState we can compare them to the current ones and if they don't match then we can run the function
componentDidUpdate(prevProps, prevState) {
  if(prevState.count !== this.state.count) {
      this.getStarWarsCharacter(this.state.count)
  }
}

// this is very similar to

useEffect(function () {
  this.getStarWarsCharacter(this.state.count)
},[count]);

// an infinite loop would result if we didn't check versus the prevState.count as the component will keep rendering as we run the function 
componentDidUpdate(prevProps, prevState) {
      this.getStarWarsCharacter(this.state.count)
}

// this is similar to a useEffect with no dependecies arrray
useEffect(function () {
  this.getStarWarsCharacter(this.state.count)
});
// componentWillUnmount

componentWillUnmount() {
  window.removeEventListener("resize", this.watchWidth)
}

// is very similar to the cleanup function we pass as a return value inside of the callback function passed to useEffect hook 
useEffect(function () {
  window.addEventListener("resize", this.watchWidth); // in case you want to remove an event listerner later on you should assign the function to a variable
  return () => {
  window.removeEventListener("resize", this.watchWidth); // in case you want to remove an event listerner later on you should assign the function to a variable

  }
}, []);
/*
the mean difference between defining a Component in React using the regular function and the arrow function is hoisting

Function Hoisting
In regular function, function gets hoisting at top. In arrow function,
function get hoisted where you define. So, if you call the function before initialisation you will get referenceError 
* an example would be putting your component in the bottom of the main App component and calling them in the App component
* using regular function won't cause any errors however using arrow function will trigger an error 
*/
const App = () => { // arrow function
  
}

function App () {  // regular function
}