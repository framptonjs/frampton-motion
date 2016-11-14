import { describe } from 'frampton-motion/transition';

QUnit.module('Frampton.Motion.describe', {
  beforeEach() {
    const cssText = 'div { height : 100px; }';
    this.fixture = document.getElementById('qunit-fixture');
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.appendChild(document.createTextNode(cssText));
    this.div = document.createElement('div');
    document.body.appendChild(this.style);
    this.fixture.appendChild(this.div);
  },
  afterEach() {
    document.body.removeChild(this.style);
    this.fixture.removeChild(this.div);
    this.div = null;
    this.fixture = null;
    this.style = null;
  }
});

QUnit.test('Should run callback on complete transition', function(assert) {
  const done = assert.async();
  const frame = {
    'height' : '0px',
    'opacity' : '0',
    'transition-duration' : '500ms'
  };

  const trans = describe(this.div, frame);

  trans.run(() => {
    assert.equal(this.div.offsetHeight, 0);
    done();
  });
});

QUnit.test('Reverse method should create a reversed transition', function(assert) {
  const done = assert.async();
  const frame = {
    'height' : '0px',
    'opacity' : '0',
    'transition-duration' : '500ms'
  };

  const trans = describe(this.div, frame);
  const reversed = trans.reverse();

  trans.run((el) => {
    assert.equal(el.offsetHeight, 0);
    reversed.run((el) => {
      assert.equal(el.offsetHeight, 100);
      done();
    });
  });
});

QUnit.test('Height method should specify correct height', function(assert) {
  const done = assert.async();
  const frame = {
    'height' : '0px',
    'opacity' : '0',
    'transition-duration' : '500ms'
  };

  const trans = describe(this.div, frame);

  trans
    .height(10)
    .run((el) => {
      assert.equal(el.offsetHeight, 10);
      done();
    });
});

QUnit.test('Width method should specify correct width', function(assert) {
  const done = assert.async();
  const frame = {
    'height' : '0px',
    'opacity' : '0',
    'transition-duration' : '500ms'
  };

  const trans = describe(this.div, frame);

  trans
    .width(10)
    .run((el) => {
      assert.equal(el.offsetHeight, 0);
      assert.equal(el.offsetWidth, 10);
      done();
    });
});
