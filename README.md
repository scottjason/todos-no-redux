
# Todos No Redux

### Built w/
- React 16, ES6, Browserify, Stylus et al
- [HOC w/ composition patterns for global state management](https://blog.kentcdodds.com/advanced-react-component-patterns-56af2b74bc5f)
- Stylus for styles
- Testing with Jest & Enzyme

---

### Installation

In the root directory:
```bash
$ npm install
```
then to run to the app:
```bash
npm run dev
```
point your browser to `localhost:8080` 

to run tests, open a new terminal window and run:
```bash
npm run test
```

---


### Summary

This is a react app focused on unidirectional data flow, state management and UI.

State is shared throughout the components via HOCs, or higher order components.

The argument as to whether or not to hold state in an HOC is based around how many instances of an HOC you'd need, since each instance is a separate instance of state.

So considering this is just a simple todo app, the way the app works is by rendering a LandingContainer that is alone wrapped in the needed HOCS. This Landing containers serves the two main components: Navbar and Todos, with props serving as both state and callbacks.


---

### Should look like this once loaded:

![versal todos](https://s3-us-west-1.amazonaws.com/sj-portfolio/versal.png)
