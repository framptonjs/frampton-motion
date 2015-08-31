# Frampton-Motion

Managing CSS transitions and animations in JavaScript are a perfect opportunity to flex a little functional muscle. Most code surrounding what transitions and animations should do and how they should behave is pure. It's declarative and doesn't do anything except say what we want to happen. If our descriptions are horrible and have no chance at success, there's still no reason that those descriptions can't be maintained by immutable data structures and a declarative API. The actual performance of the transition or animation is what causes side effects and is what can go horribly wrong. We'll keep that stuff in a corner somewhere so the rest of our code is declarative and beautiful.

This module will add objects and functions to Frampton to manage CSS transitions is a declarative manner.

Just include this file after Frampton.

```
<script src="frampton.js"></script>
<script src="frampton-motion.js"></script>
```

## Transitions

Currently Motion exposes three public methods: transition, when and sequence.

```
var element = document.getElementById('some-id');

// Transitions can be created with a class name to add to cause the transition.
var myTransition = transition(element, 'my-class');

// Transitions can also be created with a hash of properties to apply to the element.
var otherTransition = transition(element, {
  opacity : 0,
  transform : 'scale(0.6)',
  duration : '500ms'
});
```

The transform function will automatically apply any vendor prefixes required by the browser running the code. It also aliases duration to transition-duration and delay to transition-delay to save a few key strokes.

All methods on the Transition object, other than the run method, return a new Transition.

```
var hide = transition(element, { opacity : 0 });
var show = hide.reverse();

var hideThenShow = hide.chain(show);

hideThenShow.run(function() {
  // hide is unchanged. we can use it here
  hide.run();
});
```

The other two methods exported by motion are sequence and when. Sequence runs Transitions in sequence, returning a new Transition that completes when all of it's child Transitions complete. When is similar, but it runs all Transitions in parallel.

```
var showModal = when(fadeInMask, fadeInDialog);
var hideModal = showModal.reverse();
```

### Be Aware

If you chain two transitions together that don't change anything, or do the same thing, there will be nothing for one or both of them to transition, no transition means no transitionend event means the chain is broken.

#### A Known Issue

Where this will most likely come into play is with reverse. When you reverse a Transition you just undo the Transition you called it on. If a Transition adds a class, reversing it removes the class. The same for css properties, the reverse of adding a property is removing it. So if I chain two Transitions that update the same property then reverse that chained Transition, the first Transition will remove the property and the second Transition will have nothing to do.

I plan to update this so that Transitions are more context aware when part of a composition. Just haven't gotten there yet.