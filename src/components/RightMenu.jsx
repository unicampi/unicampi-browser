import React from 'react';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';
import gravatar from 'utils/gravatar';
import UserImage from 'components/UserImage';
/**
* Generic Menu
*/
const Menu = props => (
  <li className={`dropdown ${props.menu}-menu`}>
    <a href="" className="dropdown-toggle" data-toggle="dropdown">
      <FontAwesome name={props.icon} />
      {
        props.label.value ?
          <span className={`label label-${props.label.status}`}>{props.label.value}</span>
          :
            <span />
      }
    </a>
    <ul className="dropdown-menu">
      <li className="header">{props.header}</li>
      <li>
        <ul className="menu">
          {props.children}
        </ul>
      </li>
    </ul>
  </li>
);


Menu.propTypes = {
  menu: React.PropTypes.string,
  children: React.PropTypes.node,
  header: React.PropTypes.node,
  icon: React.PropTypes.string,
  label: React.PropTypes.shape({
    status: React.PropTypes.string,
    value: React.PropTypes.any,
  }),
};


/** Message **/
const Message = (props) => {
  const imgSrc = gravatar(props.msg.userImage);
  return (
    <li>
      <a href="#">
        <div className="pull-left">
          <img src={imgSrc} className="img-circle" alt="User" />
        </div>
        <h4>
          {props.msg.from}
          <small>
            <FontAwesome name="clock-o" />{' '}
            <Moment fromNow>{props.msg.createdAt}</Moment>
          </small>
        </h4>
        <p>{props.msg.message}</p>
      </a>
    </li>
  );
};

Message.propTypes = {
  msg: {
    userImage: React.PropTypes.string,
    from: React.PropTypes.string,
    createdAt: React.PropTypes.string,
    message: React.PropTypes.string,
  },

};

export const MessagesMenu = (props) => {
  const header = (
    <p>
      {`You have ${props.messages.length} message(s)`}
      <a className="pull-right" onClick={props.onAllRead}>Mark all as read</a>
    </p>
  );
  return (
    <Menu
      menu="messages"
      icon="envelope-o"
      label={{ status: 'success', value: props.messages.length }}
      header={header}
    >
      { props.messages.map((m, idx) => <Message key={idx} msg={m} />) }
    </Menu>
  );
};

MessagesMenu.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  onAllRead: React.PropTypes.func,
};

/** Notification **/
const Notification = props => (
  <li>
    <a href="#">
      <i className={`fa fa-${props.icon.icon} text-${props.icon.color}`} /> {props.notification}
    </a>
  </li>
);

Notification.propTypes = {
  icon: {
    icon: React.PropTypes.string,
    color: React.PropTypes.string,
  },
  notification: React.PropTypes.string,
};

export const NotificationsMenu = (props) => {
  const header = (
    <p>
      {`You have ${props.notifications.length} notification(s)`}
      <a className="pull-right" onClick={props.onAllRead}>Mark all as read</a>
    </p>
  );
  return (
    <Menu
      menu="notifications"
      icon="bell-o"
      label={{ status: 'warning', value: props.notifications.length }}
      header={header}
    >

      {
        props.notifications
        .map((m, idx) => <Notification key={idx} icon={{ color: 'aqua', icon: 'user' }} notification={m.notification} />,
        )
      }
    </Menu>
  );
};

NotificationsMenu.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.object),
  onAllRead: React.PropTypes.func,
};

/** Tasks **/
const Task = props => (
  <li>
    <a href="#">
      <h3>
        {props.title}
        <small className="pull-right">{props.progress}</small>
      </h3>
      <div className="progress xs">
        <div className="progress-bar progress-bar-aqua" style={{ width: props.progress }} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
          <span className="sr-only">{props.progress} Complete</span>
        </div>
      </div>
    </a>
  </li>
);

Task.propTypes = {
  title: React.PropTypes.string,
  progress: React.PropTypes.string,
};

export const TasksMenu = props => (
  <Menu menu="tasks" icon="flag-o" label={{ value: props.tasks.length, status: 'danger' }} header={`You have ${props.tasks.length} tasks`}>
    {props.tasks.map((t, idx) => <Task key={idx} {...t} />)}
  </Menu>
);

TasksMenu.propTypes = {
  tasks: React.PropTypes.arrayOf(React.PropTypes.object),
};


export const UserAccountMenu = (props) => {
  const imgSrc = gravatar(props.email || '');
  return (
    <li className="dropdown user user-menu">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown">
        <UserImage src={imgSrc} className="user-image" />
        <span className="hidden-xs">User</span>
      </a>
      <ul className="dropdown-menu">
        {/* User image */}
        <li className="user-header">
          <UserImage src={imgSrc} />
          <p>
            User - Type
            <small>Member since Nov. 2012</small>
          </p>
        </li>
        {/* Menu Body */}
        <li className="user-body">
          <div className="row">
            <div className="col-xs-4 text-center">
              <a href="#">Followers</a>
            </div>
            <div className="col-xs-4 text-center">
              <a href="#">Sales</a>
            </div>
            <div className="col-xs-4 text-center">
              <a href="#">Friends</a>
            </div>
          </div>
          {/* /.row */}
        </li>
        {/* Menu Footer*/}
        <li className="user-footer">
          <div className="pull-left">
            <a href="#" className="btn btn-default btn-flat">Profile</a>
          </div>
          <div className="pull-right">
            <a href="#" className="btn btn-default btn-flat">Sign out</a>
          </div>
        </li>
      </ul>
    </li>
  );
};

UserAccountMenu.propTypes = {
  email: React.PropTypes.string,
};
