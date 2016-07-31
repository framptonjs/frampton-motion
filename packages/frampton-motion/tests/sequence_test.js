import { describe } from 'frampton-motion/transition';
import sequence from 'frampton-motion/sequence';

QUnit.module('Frampton.Motion.sequence', {
  beforeEach() {
    const cssText =
      '#div-1 { height : 100px; } #div-2 { height : 50px; } ' +
      '#nested-1 { height : 200px; } #nested-2 { height : 30px; }';
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.appendChild(document.createTextNode(cssText));
    this.fixture = document.getElementById('qunit-fixture');
    this.div1 = document.createElement('div');
    this.div2 = document.createElement('div');
    this.div1.setAttribute('id', 'div-1');
    this.div2.setAttribute('id', 'div-2');
    this.nested1 = document.createElement('div');
    this.nested2 = document.createElement('div');
    this.nested1.setAttribute('id', 'nested-1');
    this.nested2.setAttribute('id', 'nested-2');
    this.nested1.appendChild(this.nested2);
    document.body.appendChild(this.style);
    this.fixture.appendChild(this.div1);
    this.fixture.appendChild(this.div2);
    this.fixture.appendChild(this.nested1);
  },
  afterEach() {
    document.body.removeChild(this.style);
    this.fixture.removeChild(this.div1);
    this.fixture.removeChild(this.div2);
    this.fixture.removeChild(this.nested1);
    this.fixture = null;
    this.div1 = null;
    this.div2 = null;
    this.nested1 = null;
    this.nested2 = null;
    this.style = null;
  }
});

QUnit.test('Should run callback on complete transition sequence', function(assert) {
  const done = assert.async();
  const frameOne = {
    'height' : '0px',
    'transition-duration' : '500ms'
  };

  const frameTwo = {
    'height' : '10px',
    'transition-duration' : '200ms'
  };

  const transOne = describe(this.div1, frameOne);
  const transTwo = describe(this.div2, frameTwo);
  const trans = sequence(transOne, transTwo);

  trans.run(() => {
    assert.equal(this.div1.offsetHeight, 0);
    assert.equal(this.div2.offsetHeight, 10);
    done();
  });
});

QUnit.test('Should be reversable', function(assert) {
  const done = assert.async();
  const frameOne = {
    'height' : '0px',
    'transition-duration' : '500ms'
  };

  const frameTwo = {
    'height' : '10px',
    'transition-duration' : '200ms'
  };

  const transOne = describe(this.div1, frameOne);
  const transTwo = describe(this.div2, frameTwo);
  const trans = sequence(transOne, transTwo);
  const reversed = trans.reverse();

  trans.run(() => {
    assert.equal(this.div1.offsetHeight, 0);
    assert.equal(this.div2.offsetHeight, 10);
    reversed.run(() => {
      assert.equal(this.div1.offsetHeight, 100);
      assert.equal(this.div2.offsetHeight, 50);
      done();
    });
  });
});

QUnit.test('Should work with nested elements', function(assert) {
  const done = assert.async();
  const frameOne = {
    'height' : '0px',
    'transition-duration' : '500ms'
  };

  const frameTwo = {
    'height' : '10px',
    'transition-duration' : '200ms'
  };

  const transOne = describe(this.nested1, frameOne);
  const transTwo = describe(this.nested2, frameTwo);
  const trans = sequence(transOne, transTwo);

  trans.run(() => {
    assert.equal(this.nested1.offsetHeight, 0);
    assert.equal(this.nested2.offsetHeight, 10);
    done();
  });
});
