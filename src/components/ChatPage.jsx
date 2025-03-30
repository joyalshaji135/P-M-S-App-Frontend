import React, { useState } from 'react';
import { 
  Avatar, 
  Badge, 
  IconButton, 
  TextField,
  Button,
  Box,
  InputAdornment,
  styled
} from '@mui/material';
import { 
  Search, 
  MoreVert, 
  FilterList, 
  Menu, 
  Reply, 
  Delete, 
  Archive, 
  MarkAsUnread,
  Send,
  Close
} from '@mui/icons-material';

// Custom styled Badge for online status (top position)
const OnlineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      avatar: 'JD',
      content: 'Hey team, just checking in about the project deadline. Are we still on track for Friday? I need to update the client.',
      time: '10:30 AM',
      unread: true,
      status: 'online',
      showActions: false
    },
    {
      id: 2,
      sender: 'Sarah Smith',
      avatar: 'SS',
      content: 'The UX mockups are ready for review. I\'ve shared them in Figma - please add your comments by EOD tomorrow.',
      time: 'Yesterday',
      unread: false,
      status: 'offline',
      showActions: false
    },
    {
      id: 3,
      sender: 'Tech Team',
      avatar: 'TT',
      content: 'REMINDER: System maintenance tonight 11PM-12AM. All services will be unavailable during this window.',
      time: 'Mar 28',
      unread: false,
      status: 'busy',
      showActions: false
    },
    {
      id: 4,
      sender: 'Alex Johnson',
      avatar: 'AJ',
      content: 'Approved the budget for Q2. Finance has processed the allocations to each department.',
      time: 'Mar 27',
      unread: true,
      status: 'online',
      showActions: false
    },
    {
      id: 5,
      sender: 'Marketing',
      avatar: 'MK',
      content: 'New campaign performance metrics are in - we\'re exceeding KPIs by 15% across all channels!',
      time: 'Mar 26',
      unread: false,
      status: 'offline',
      showActions: false
    },
    {
      id: 6,
      sender: 'David Wilson',
      avatar: 'DW',
      content: 'Can someone from design join the client call at 3PM? They have specific questions about the branding.',
      time: 'Mar 25',
      unread: false,
      status: 'online',
      showActions: false
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [replyText, setReplyText] = useState('');
  const [searchText, setSearchText] = useState('');

  const toggleActions = (id) => {
    setMessages(messages.map(msg => ({
      ...msg,
      showActions: msg.id === id ? !msg.showActions : false
    })));
  };

  const handleAction = (id, action) => {
    switch(action) {
      case 'delete':
        setMessages(messages.filter(msg => msg.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
        break;
      case 'archive':
        break;
      case 'reply':
        setSelectedMessage(messages.find(msg => msg.id === id));
        break;
      case 'markUnread':
        setMessages(messages.map(msg => 
          msg.id === id ? {...msg, unread: true} : msg
        ));
        break;
      default:
        break;
    }
    toggleActions(id);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      avatar: 'ME',
      content: replyText,
      time: 'Just now',
      unread: false,
      status: 'online'
    };
    
    setMessages([newMessage, ...messages]);
    setReplyText('');
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const StatusBadge = ({ status }) => {
    if (status === 'online') {
      return (
        <OnlineBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          variant="dot"
        >
          <span></span>
        </OnlineBadge>
      );
    } else if (status === 'busy') {
      return (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          variant="dot"
          color="warning"
        >
          <span></span>
        </Badge>
      );
    }
    return null;
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>
        <Box sx={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Messages</h2>
          <IconButton><Menu /></IconButton>
        </Box>

        <Box sx={styles.searchContainer}>
          <TextField
            fullWidth
            placeholder="Search messages..."
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={styles.searchIcon} />
                </InputAdornment>
              ),
              endAdornment: searchText && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    sx={styles.clearButton}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: styles.searchInput
            }}
          />
        </Box>

        <Box sx={styles.filterContainer}>
          <span style={styles.filterText}>All Messages</span>
          <IconButton size="small"><FilterList fontSize="small" /></IconButton>
        </Box>

        <Box sx={styles.messageList}>
          {messages.map((message) => (
            <Box 
              key={message.id} 
              sx={{
                ...styles.messageCard,
                backgroundColor: message.unread ? 'rgba(99, 102, 241, 0.06)' : '#FFFFFF',
                borderLeft: message.unread ? '4px solid #6366F1' : 'none'
              }}
              onClick={() => setSelectedMessage(message)}
            >
              <Box sx={styles.messageContent}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <StatusBadge status={message.status} />
                  <Avatar sx={styles.avatar}>
                    {message.avatar}
                  </Avatar>
                </Box>

                <Box sx={styles.messageDetails}>
                  <Box sx={styles.messageHeader}>
                    <h3 style={{
                      ...styles.senderName,
                      color: message.unread ? '#6366F1' : '#1F2937',
                      fontWeight: message.unread ? 600 : 500
                    }}>
                      {message.sender}
                    </h3>
                    <Box sx={styles.timeActions}>
                      <span style={styles.timeText}>{message.time}</span>
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleActions(message.id);
                        }}
                        sx={styles.moreButton}
                      >
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <p style={styles.messagePreview}>
                    {message.content}
                  </p>
                </Box>
              </Box>

              {message.showActions && (
                <Box sx={styles.actionsPanel}>
                  <IconButton onClick={() => handleAction(message.id, 'reply')}>
                    <Reply fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleAction(message.id, 'markUnread')}>
                    <MarkAsUnread fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleAction(message.id, 'archive')}>
                    <Archive fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleAction(message.id, 'delete')}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={styles.contentArea}>
        {selectedMessage ? (
          <Box sx={styles.messageDetailContainer}>
            <Box sx={styles.detailHeader}>
              <Box sx={styles.detailSender}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <StatusBadge status={selectedMessage.status} />
                  <Avatar sx={styles.detailAvatar}>
                    {selectedMessage.avatar}
                  </Avatar>
                </Box>
                <Box sx={styles.detailSenderInfo}>
                  <h2 style={styles.detailSenderName}>{selectedMessage.sender}</h2>
                  <span style={styles.detailTime}>{selectedMessage.time}</span>
                </Box>
              </Box>
              <Box>
                <IconButton><Reply /></IconButton>
                <IconButton><Delete /></IconButton>
              </Box>
            </Box>

            <Box sx={styles.detailContent}>
              <Box sx={styles.messageBubble}>
                <p style={styles.messageText}>{selectedMessage.content}</p>
                <span style={styles.messageTime}>{selectedMessage.time}</span>
              </Box>
              
              {selectedMessage.id === 1 && (
                <Box sx={{...styles.messageBubble, ...styles.myMessage}}>
                  <p style={styles.messageText}>Yes, we're on track! The dev team just finished the last features today.</p>
                  <span style={styles.messageTime}>10:45 AM</span>
                </Box>
              )}
            </Box>

            <Box sx={styles.replySection}>
              <TextField
                multiline
                rows={3}
                placeholder="Write your reply..."
                fullWidth
                variant="outlined"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                sx={styles.replyInput}
              />
              <Box sx={styles.replyActions}>
                <Button 
                  variant="contained" 
                  endIcon={<Send />}
                  onClick={handleSendReply}
                  sx={styles.sendButton}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={styles.emptyState}>
            <Box sx={styles.emptyStateContent}>
              <Box sx={styles.emptyStateIcon}>💬</Box>
              <h3 style={styles.emptyStateTitle}>Select a conversation</h3>
              <p style={styles.emptyStateText}>Choose a message from the sidebar to start chatting</p>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    bgcolor: 'background.default',
    fontFamily: 'Inter, sans-serif'
  },
  sidebar: {
    width: 350,
    borderRight: '1px solid',
    borderColor: 'divider',
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.paper'
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3
  },
  sidebarTitle: {
    color: 'primary.main',
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 600
  },
  searchContainer: {
    mb: 3
  },
  searchIcon: {
    color: 'text.secondary'
  },
  clearButton: {
    p: 0.5,
    color: 'text.secondary'
  },
  searchInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      pl: 1.5,
      pr: 1,
      '& fieldset': {
        borderColor: 'divider',
      },
      '&:hover fieldset': {
        borderColor: 'primary.light',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)'
      },
      '& input': {
        py: 1.25,
        fontSize: '0.875rem',
        '&::placeholder': {
          opacity: 1,
          color: 'text.secondary'
        }
      }
    }
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2
  },
  filterText: {
    color: 'text.secondary',
    fontSize: '0.875rem'
  },
  messageList: {
    overflowY: 'auto',
    flex: 1,
    '&::-webkit-scrollbar': {
      width: 6
    },
    '&::-webkit-scrollbar-thumb': {
      bgcolor: 'grey.300',
      borderRadius: 3
    }
  },
  messageCard: {
    borderRadius: 2,
    p: 2,
    mb: 1.5,
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
    '&:hover': {
      bgcolor: 'action.hover'
    }
  },
  messageContent: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    bgcolor: 'secondary.main',
    width: 40,
    height: 40,
    fontSize: 14,
    mr: 2,
    color: 'common.white'
  },
  messageDetails: {
    flex: 1,
    minWidth: 0
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 0.5
  },
  senderName: {
    margin: 0,
    fontSize: '0.9375rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 180
  },
  timeActions: {
    display: 'flex',
    alignItems: 'center'
  },
  timeText: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    mr: 1
  },
  moreButton: {
    p: 0.5,
    color: 'text.secondary'
  },
  messagePreview: {
    m: 0,
    fontSize: '0.8125rem',
    color: 'text.secondary',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  actionsPanel: {
    position: 'absolute',
    right: 16,
    bottom: -40,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 2,
    zIndex: 10,
    display: 'flex',
    p: 0.5
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    p: 3
  },
  messageDetailContainer: {
    bgcolor: 'background.paper',
    borderRadius: 2,
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 1
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    pb: 2,
    mb: 2,
    borderBottom: '1px solid',
    borderColor: 'divider'
  },
  detailSender: {
    display: 'flex',
    alignItems: 'center'
  },
  detailAvatar: {
    bgcolor: 'secondary.main',
    width: 48,
    height: 48,
    fontSize: 16,
    mr: 2,
    color: 'common.white'
  },
  detailSenderInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  detailSenderName: {
    m: 0,
    fontSize: '1.125rem',
    color: 'text.primary'
  },
  detailTime: {
    fontSize: '0.8125rem',
    color: 'text.secondary'
  },
  detailContent: {
    flex: 1,
    overflowY: 'auto',
    mb: 2,
    '&::-webkit-scrollbar': {
      width: 6
    },
    '&::-webkit-scrollbar-thumb': {
      bgcolor: 'grey.300',
      borderRadius: 3
    }
  },
  messageBubble: {
    maxWidth: '70%',
    p: 2,
    mb: 1.5,
    borderRadius: 2,
    bgcolor: 'grey.100',
    position: 'relative',
    '& p': {
      m: 0,
      color: 'text.primary',
      lineHeight: 1.5,
      fontSize: '0.9375rem'
    }
  },
  myMessage: {
    bgcolor: 'primary.light',
    ml: 'auto',
    '& p': {
      color: 'common.white'
    }
  },
  messageTime: {
    display: 'block',
    fontSize: '0.6875rem',
    color: 'text.secondary',
    textAlign: 'right',
    mt: 0.5
  },
  replySection: {
    borderTop: '1px solid',
    borderColor: 'divider',
    pt: 2,
    mt: 'auto'
  },
  replyInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '& textarea': {
        fontSize: '0.9375rem'
      }
    }
  },
  replyActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 1.5
  },
  sendButton: {
    borderRadius: 2,
    px: 3,
    py: 1,
    textTransform: 'none',
    fontWeight: 500
  },
  emptyState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: 'text.secondary',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 1
  },
  emptyStateContent: {
    textAlign: 'center',
    p: 4
  },
  emptyStateIcon: {
    fontSize: '3rem',
    mb: 2,
    lineHeight: 1
  },
  emptyStateTitle: {
    m: 0,
    mb: 1,
    fontSize: '1.25rem',
    color: 'text.primary',
    fontWeight: 500
  },
  emptyStateText: {
    m: 0,
    fontSize: '0.9375rem',
    color: 'text.secondary'
  }
};

export default ChatPage;