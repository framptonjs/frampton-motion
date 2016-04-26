import { describe } from 'frampton-motion/transition';

QUnit.module('Frampton.Motion.transition');

QUnit.test('Should run callback on complete transition', function(assert) {
  const done = assert.async();
  const frame = {
    'height'              : '0px',
    'padding-top'         : '0px',
    'padding-bottom'      : '0px',
    'opacity'             : 0,
    'transition-duration' : '500ms'
  };
  const fixture = document.getElementById('qunit-fixture');
  const trans = describe(fixture, frame);
  trans.run(() => {
    equal(fixture.offsetHeight, 0);
    done();
  });
});