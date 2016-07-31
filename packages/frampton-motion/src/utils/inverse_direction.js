import { DIRECTION } from 'frampton-motion/data/constants';

export default function inverse_direction(dir) {
  return ((dir === DIRECTION.DIR_IN) ? DIRECTION.DIR_OUT : DIRECTION.DIR_IN);
}
