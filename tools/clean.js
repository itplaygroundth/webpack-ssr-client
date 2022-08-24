import { cleanDir } from './lib/fs';
import {webpackDestination,webpackPublicPath} from '../config/path.default'
/**
 * Cleans up the output (build) directory.
 */
function clean() {
  return Promise.all([
    cleanDir(webpackDestination, {
      nosort: true,
      dot: true,
      ignore: ['build/.git'],
    }),
  ]);
}

export default clean;
