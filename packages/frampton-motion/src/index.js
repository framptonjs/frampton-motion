import Frampton from 'frampton/namespace';
import prepare from 'frampton-motion/prepare';
import { describe } from 'frampton-motion/transition';
import sequence from 'frampton-motion/sequence';
import when from 'frampton-motion/when';
import reflow from 'frampton-motion/reflow';

/**
 * @name Motion
 * @namespace
 * @memberof Frampton
 */
Frampton.Motion          = {};
Frampton.Motion.VERSION  = '0.0.10';
Frampton.Motion.prepare  = prepare;
Frampton.Motion.describe = describe;
Frampton.Motion.sequence = sequence;
Frampton.Motion.reflow   = reflow;
Frampton.Motion.when     = when;
