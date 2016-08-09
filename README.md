# Frampton-Motion

Managing CSS transitions and animations in JavaScript are a perfect opportunity to flex a little functional muscle. Most code surrounding what transitions and animations should do and how they should behave is pure. It's declarative and doesn't do anything except say what we want to happen. If our descriptions are horrible and have no chance at success, there's still no reason that those descriptions can't be maintained by immutable data structures and a declarative API. The actual performance of the transition or animation is what causes side effects and is what can go horribly wrong. We'll keep that stuff in a corner somewhere so the rest of our code is declarative and beautiful.

This module will add objects and functions to Frampton to manage CSS transitions in a declarative manner.

### Install

```
npm install --save frampton
npm install --save frampton-motion
```

### Include

```
<script src="frampton.js"></script>
<script src="frampton-motion.js"></script>
```

## Transitions

Currently Motion exposes three public methods: describe, when and sequence.

### Describe

With the describe function you provide a description of the transition you wish to run and you get back a Transition object that can be used to run that transition. The description of a transition always starts with the element that transition is to be run on. The second argument to describe can be either a string, representing classes to apply to the element, or an object representing some combination of styles and/or classes to apply to the element.

The describe function will automatically apply any vendor prefixes required by the browser running the code. It also aliases duration to transition-duration and delay to transition-delay to save a few key strokes.

When we describe a transition we do not run that transition. The Transition object has a method to perform the transition. Transitions can be reused over and over. Each time you call the 'run' method on a Transition object it will apply the described transition to the element.

```
const describe = Frampton.Motion.describe;

const element = document.getElementById('some-id');

// The describe function takes an element and a description of the transition
// to perform on that element. The description can take a few general forms.
// The first is just pass in a hash of CSS properties to apply to the element.
// Here 'duration' is an alias to 'transition-duration'. Either will work. The
// same also works for 'delay'.
const myTransition = describe(element, {
  opacity : 0,
  transform : 'scale(0.6)',
  duration : '500ms'
});

// If you need to reset the properties of an element before starting the
// transition you can use a 'from' block. Often this is useful in situations
// where you have width or height set to 'auto', but need an actual value
// to transition from.
const myTransition = describe(element, {
  from : {
    height : element.offsetHeight,
    opacity : 1,
    transform : 'scale(1.6)'
  },
  to : {
    opacity : 0,
    transform : 'scale(0.6)',
    duration : '500ms'
  }
});

// If you are using classes to apply your transition, use the class parameter
// and supply a space-separated list of classes to add.
const myTransition = describe(element, {
  class : 'apply theses classes'
});

// The above is equivalent to just passing a string as the description
const myTransition = describe(element, 'apply theses classes');

// If you wish to remove and/or add classes, supply arrays to the add and/or
// remove properties
const myTransition = describe(element, {
  class : {
    add : ['add', 'these'],
    remove : ['remove', 'this']
  }
});

// You can also use from/to blocks with classes
const myTransition = describe(element, {
  from : {
    class : {
      remove : ['test-remove']
    }
  },
  to : {
    class : {
      add : ['test-add']
    }
  }
});

// Finally, you can combine classes and styles
const myTransition = describe(element, {
  from : {
    class : {
      remove : ['test-remove']
    },
    style : {
      height : '100px'
    }
  },
  to : {
    class : {
      add : ['test-add']
    },
    style : {
      height : '0px',
      opacity : 0,
      duration : 100
    }
  }
});
```

#### Running a Transition

The run method takes a callback to run when the transition is complete. The callback receives a single argument, a reference to the element that was being transitioned.

```
const hide = describe(element, {
  height : 0,
  opacity : 0,
  duration : 500
});

hide.run((el) => {
  el.remove();
});
```

#### Modifying Transitions

All methods on the Transition object, other than the run method, return a new Transition.

Transitions can be reversed. Reversing a Transition returns a new Transition that removes classes or styles added during the original transition.

```
const hide = describe(element, { opacity : 0 });
const show = hide.reverse();

show.run(() => {
  // hide is unchanged. we can use it here
  hide.run();
});
```

We can also modify properties on an existing Transition to create new Transitions.

```
const myTransition = describe(element, {
  height : 0,
  opacity : 0,
  duration : 500
});

const shrink = myTransition.scale(0.3);

// position takes x and y coordinates. If you pass in numbers they are converted to
// pixels. You can also pass in string values.
const move = myTransition.position(100, 500);

const taller = myTransition.height(600);
```
There are many more methods for creating new Transitions by modifying existing Transitions, they all work essentially the same way. Most are just the name of the CSS property you are modifying.

#### Chaining

Often you will want to sequence Transitions. This can be done with the 'chain' method.

```
const shrink = describe(element, {
  transform : 'scale(0.5)',
  duration : 500
});

const fade = describe(element, {
  opacity : 0.4,
  duration : 200
});

// Run shrink and then run fade.
const shrinkThenFade = shrink.chain(fade);
```

### Sequence and When

The other two methods exported by Motion are sequence and when. Sequence runs Transitions in sequence, returning a new Transition that completes when all of it's child Transitions complete. When is similar, but it runs all Transitions in parallel.

```
const when = Frampton.Motion.when;
const sequence = Frampton.Motion.sequence;

const showModal = when(fadeInMask, fadeInDialog);
const hideModal = showModal.reverse();

const showThenHide = sequence(showModal, hideModal);
const hideThenShow = showThenHide.reverse();
```

### Be Aware

If you chain two transitions together that don't change anything, or do the same thing, there will be nothing for one or both of them to transition, no transition means no transitionend event means the chain is broken.
