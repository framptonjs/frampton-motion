import { describe } from 'frampton-motion/transition';

QUnit.module('Frampton.Motion.transition', {
  beforeEach() {
    this.fixture = document.getElementById('qunit-fixture');
    this.div = document.createElement('div');
    this.div.style.setProperty('height', '100px');
    this.fixture.appendChild(this.div);
  },
  afterEach() {
    this.fixture.innerHTML = '';
    this.div = null;
    this.fixture = null;
  }
});

QUnit.test('Should run callback on complete transition', function(assert) {
  const done = assert.async();
  const frame = {
    'height' : '0px',
    'padding-top' : '0px',
    'padding-bottom' : '0px',
    'opacity' : 0,
    'transition-duration' : '500ms'
  };
  const trans = describe(this.div, frame);
  trans.run(() => {
    assert.equal(this.div.offsetHeight, 0);
    done();
  });
});
