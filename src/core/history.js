import { createBrowserHistory } from 'history';
import { Browser } from '../../config/app.default';
// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
export default Browser && createBrowserHistory();