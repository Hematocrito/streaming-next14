import Socket from './Socket';
import Event from './Event';
import { SocketContext } from './SocketContext';

if (typeof window !== 'undefined') {
  //  eslint-disable-next-line no-undef
  if (window) window.ReactSocketIO = { Socket, Event, SocketContext };
}

export { Socket, Event, SocketContext };
