import React, { useState } from 'react';
import NavBar from '../Navigation/NavBar';
import { AppBar, Toolbar, Typography, Box, Badge, ClickAwayListener, Tooltip, Button, makeStyles, Divider } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import './Header.css';
import axios from 'axios';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import DeleteIcon from '../DeleteIcon.svg';
import { useHistory } from 'react-router-dom';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import pinIcon from '../pinIcon.svg';

// Define the type for a message
interface Message {
  id: string;
  from: string;
  subject: string;
  read: boolean;
  pinned: boolean;
}

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#333',
    fontSize: '0.75rem',
    padding: '0',
    border: '1px solid #ddd',
    width: '18rem'
  },
  arrow: {
    color: 'white',
  },
}));

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const classes = useStyles();
  const history = useHistory();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleMessages = async () => {
    setOpen(true);
    try {
      const resp = await axios.get<Message[]>('https://mocki.io/v1/377c707e-64a2-40e6-be30-e79c8e950af6');
      setMessages(resp.data || []);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const handleAllNotifications = () => {
    setOpen(false);
    history.push('/messages', { state: { messages } });
  };

  const filteredMessages = messages.slice(0, 4);

  return (
    <div className='dashboard'>
      <AppBar position='static' style={{ backgroundColor: '#035C67' }}>
        <Toolbar style={{ minHeight: '20px' }}>
          <Typography variant='h6' className='logo' style={{ color: '#3EFFC0', marginLeft: '1px' }}>
            EVERNORTH
          </Typography>
          <h5 style={{ paddingTop: '2px' }}>Polaris Client Portal</h5>
          <Box flexGrow={1} />
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                interactive
                title={
                  <div className={classes.tooltip}>
                    <div style={{ color: '#035C67', display: 'flex', justifyContent: 'space-between', margin: '0 1rem' }}>
                      <h3>Notifications</h3>
                      <h3>Mark all as Read</h3>
                    </div>
                    <Divider />
                    {filteredMessages.map((item) => (
                      <React.Fragment key={item.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {item.read ? <DraftsOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                            <div>
                              <p style={{ margin: 0 }}>From {item.from}</p>
                              <p style={{ margin: 0 }}>{item.subject}</p>
                            </div>
                          </div>
                          {item.pinned && <img src={pinIcon} alt="pinIcon" width="auto" height="auto" />}
                          <img src={DeleteIcon} alt="deleteIcon" width="auto" height="auto" />
                        </div>
                        <Divider />
                      </React.Fragment>
                    ))}
                    <Button style={{ textTransform: 'none', backgroundColor: '#035C67', color: 'white', margin: '1rem' }} size='small' onClick={handleAllNotifications}>
                      See All Notifications
                    </Button>
                  </div>
                }
                arrow
                classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
              >
                <Button onClick={handleMessages} style={{ textTransform: 'none' }}>
                  <Typography variant='body1' className='user-info' style={{ color: '#ffff' }}>
                    <Badge badgeContent={4} color="error">
                      <NotificationsNoneOutlinedIcon style={{ color: '#ffff' }} />
                    </Badge>
                    Messages
                  </Typography>
                </Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
          <Typography variant='body1' className='user-info' style={{ color: '#ffff' }}>
            <PersonOutlineOutlinedIcon style={{ color: '#ffff' }} />
            Deepika S
          </Typography>
        </Toolbar>
      </AppBar>

      {/* <NavBar /> */}
    </div>
  );
};

export default Header;
