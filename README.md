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

```
const describe = Frampton.Motion.describe;

const element = document.getElementById('some-id');

// The description of a transition is an object. This object can take a few
// different forms. First, it can be a set of properties to transition to.
// Here 'duration' is short-hand for 'transition-duration'. The same works
// with 'delay'. You can use 'delay' or 'transition-delay'.
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

The describe function will automatically apply any vendor prefixes required by the browser running the code. It also aliases duration to transition-duration and delay to transition-delay to save a few key strokes.

All methods on the Transition object, other than the run method, return a new Transition.

```
const hide = describe(element, { opacity : 0 });
const show = hide.reverse();

const hideThenShow = hide.chain(show);

hideThenShow.run(function() {
  // hide is unchanged. we can use it here
  hide.run();
});
```

The other two methods exported by motion are sequence and when. Sequence runs Transitions in sequence, returning a new Transition that completes when all of it's child Transitions complete. When is similar, but it runs all Transitions in parallel.

```
const when = Frampton.Motion.when;
const sequence = Frampton.Motion.sequence;

const showModal = when(fadeInMask, fadeInDialog);
const hideModal = showModal.reverse();

const showThenHide = sequence(showModal, hideModal);
```

### Be Aware

If you chain two transitions together that don't change anything, or do the same thing, there will be nothing for one or both of them to transition, no transition means no transitionend event means the chain is broken.
