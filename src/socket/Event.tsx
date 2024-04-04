/* eslint-disable react/require-default-props */
import Router from 'next/router';
import { Component } from 'react';
import { SocketContext } from './SocketContext';
import { warning } from './utils';

interface IEventProps {
  event: string;
  handler: Function;
  handleRouterChange?: boolean;
}

class Event extends Component<IEventProps> {
  constructor(props:any) {
    super(props);
  }

  componentDidMount() {
    const { event, handler } = this.props;
    const socket:any = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    socket.on(event, handler);
    Router.events.on('routeChangeComplete', this._handleRouteChangeComplete);
  }

  componentWillUnmount() {
    const { event } = this.props;
    const socket:any = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    socket.off(event);
    Router.events.off('routeChangeComplete', this._handleRouteChangeComplete);
  }

  _handleRouteChangeComplete = () => {
    const { handleRouterChange, event, handler } = this.props;
    const socket:any = this.context;
    handleRouterChange && socket.on(event, handler);
  };

  render() {
    return false;
  }
}

Event.contextType = SocketContext;

export default Event;
