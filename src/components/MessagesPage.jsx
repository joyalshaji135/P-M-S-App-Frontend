import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
  Divider,
  IconButton,
  Button,
  Chip,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Slide,
  Grow,
  Fade,
  Zoom,
  styled
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle,
  Warning,
  Error,
  Info,
  MoreVert,
  FilterList,
  Menu as MenuIcon,
  Close,
  Search,
  CalendarToday,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { formatDistanceToNow, parseISO } from 'date-fns';

// Custom styled components
const PriorityBadge = styled(Badge)(({ theme, priority }) => ({
  '& .MuiBadge-badge': {
    right: 12,
    top: 12,
    padding: '0 4px',
    backgroundColor: 
      priority === 'high' ? '#ff4d4f' :
      priority === 'medium' ? '#faad14' : '#52c41a',
    color: theme.palette.common.white,
    fontSize: '0.6rem',
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }
}));

const NotificationItem = ({ 
  title, 
  message, 
  time, 
  priority, 
  read, 
  icon,
  date,
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const IconComponent = 
    icon === 'success' ? CheckCircle :
    icon === 'warning' ? Warning :
    icon === 'error' ? Error : Info;

  const iconColor = 
    icon === 'success' ? '#52c41a' :
    icon === 'warning' ? '#faad14' :
    icon === 'error' ? '#ff4d4f' : '#1890ff';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grow in timeout={index * 100}>
      <ListItem 
        sx={{
          bgcolor: read ? 'transparent' : 'rgba(24, 144, 255, 0.08)',
          px: 3,
          py: 2,
          alignItems: 'flex-start',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateX(4px)' : 'none',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ListItemAvatar sx={{ minWidth: 48 }}>
          <PriorityBadge 
            badgeContent={priority[0].toUpperCase()} 
            priority={priority}
          >
            <Zoom in timeout={500 + index * 100}>
              <Avatar sx={{ 
                bgcolor: `${iconColor}10`, 
                color: iconColor,
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.1)' : 'none'
              }}>
                <IconComponent fontSize="small" />
              </Avatar>
            </Zoom>
          </PriorityBadge>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: read ? 400 : 600,
                  color: read ? 'text.secondary' : 'text.primary'
                }}
              >
                {title}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.disabled',
                  ml: 2
                }}
              >
                {formatDistanceToNow(parseISO(date))} ago
              </Typography>
            </Box>
          }
          secondary={
            <>
              <Typography
                variant="body2"
                sx={{
                  color: read ? 'text.secondary' : 'text.primary',
                  mt: 0.5
                }}
              >
                {message}
              </Typography>
              {!read && (
                <Box sx={{ mt: 1 }}>
                  <Fade in>
                    <Chip 
                      label="New" 
                      size="small" 
                      sx={{ 
                        bgcolor: `${iconColor}10`, 
                        color: iconColor,
                        fontSize: '0.65rem',
                        height: 20
                      }} 
                    />
                  </Fade>
                </Box>
              )}
            </>
          }
          secondaryTypographyProps={{ component: 'div' }}
        />
        <IconButton 
          edge="end" 
          size="small" 
          sx={{ ml: 1 }}
          onClick={handleClick}
        >
          <MoreVert fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Mark as read</MenuItem>
          <MenuItem onClick={handleClose}>Archive</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </ListItem>
    </Grow>
  );
};

const MessagePage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call with dummy data
    const dummyData = [
      {
        id: 1,
        title: 'Payment Received',
        message: 'Your payment of $250.00 has been processed successfully.',
        date: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
        priority: 'high',
        read: false,
        icon: 'success'
      },
      {
        id: 2,
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tomorrow from 2:00 AM to 4:00 AM.',
        date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        priority: 'medium',
        read: false,
        icon: 'warning'
      },
      {
        id: 3,
        title: 'New Messages',
        message: 'You have 3 unread messages in your inbox.',
        date: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        priority: 'low',
        read: true,
        icon: 'info'
      },
      {
        id: 4,
        title: 'Order Shipped',
        message: 'Your order #12345 has been shipped and will arrive in 2-3 business days.',
        date: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
        priority: 'medium',
        read: true,
        icon: 'success'
      },
      {
        id: 5,
        title: 'Security Alert',
        message: 'Unusual login attempt detected from a new device.',
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        priority: 'high',
        read: true,
        icon: 'error'
      },
      {
        id: 6,
        title: 'New Feature Available',
        message: 'Check out our latest dashboard features now available in your account.',
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        priority: 'low',
        read: true,
        icon: 'info'
      },
      {
        id: 7,
        title: 'Subscription Renewal',
        message: 'Your premium subscription will renew automatically on June 15.',
        date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        priority: 'medium',
        read: true,
        icon: 'info'
      },
      {
        id: 8,
        title: 'Team Invitation',
        message: 'You have been invited to join the Marketing Team workspace.',
        date: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
        priority: 'high',
        read: true,
        icon: 'success'
      },
      {
        id: 9,
        title: 'Password Updated',
        message: 'Your account password was successfully changed.',
        date: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
        priority: 'low',
        read: true,
        icon: 'success'
      },
      {
        id: 10,
        title: 'Storage Limit',
        message: 'You have used 85% of your available storage. Upgrade now for more space.',
        date: new Date(Date.now() - 2592000000).toISOString(), // 1 month ago
        priority: 'medium',
        read: true,
        icon: 'warning'
      }
    ];
    
    setNotifications(dummyData);
    setFilteredNotifications(dummyData.slice(0, 5));
  }, []);

  useEffect(() => {
    let results = [...notifications];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(notification => 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply date filter
    const now = new Date();
    if (dateFilter !== 'all') {
      results = results.filter(notification => {
        const notificationDate = new Date(notification.date);
        const diffTime = now - notificationDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        switch(dateFilter) {
          case 'today': 
            return diffDays < 1;
          case 'week':
            return diffDays < 7;
          case 'month':
            return diffDays < 30;
          default:
            return true;
        }
      });
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      results = results.filter(notification => notification.priority === priorityFilter);
    }
    
    // Limit to 5 if not in "view all" mode
    if (!viewAll) {
      results = results.slice(0, 5);
    }
    
    setFilteredNotifications(results);
  }, [notifications, searchTerm, dateFilter, priorityFilter, viewAll]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  return (
    <Box sx={{ 
      height: '100vh',
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Slide direction="down" in timeout={300}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsIcon color="primary" sx={{ 
              mr: 1.5, 
              fontSize: 28,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' }
              }
            }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Fade in>
                <Chip 
                  label={unreadCount} 
                  color="primary" 
                  size="small" 
                  sx={{ 
                    ml: 1.5,
                    fontWeight: 600,
                    fontSize: '0.75rem'
                  }} 
                />
              </Fade>
            )}
          </Box>
          <Box>
            <IconButton 
              onClick={() => setShowFilters(!showFilters)}
              sx={{ mr: 1 }}
            >
              <FilterList />
            </IconButton>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Slide>

      {/* Search and Filters */}
      <Slide direction="down" in={showFilters} mountOnEnter unmountOnExit>
        <Box sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 1
        }}>
          <TextField
            fullWidth
            placeholder="Search notifications..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm('')}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: 'background.default'
              }
            }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Date"
              size="small"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              SelectProps={{
                IconComponent: CalendarToday
              }}
              sx={{ flex: 1 }}
            >
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
            </TextField>
            <TextField
              select
              label="Priority"
              size="small"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              sx={{ flex: 1 }}
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </TextField>
          </Box>
        </Box>
      </Slide>

      {/* Actions */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Button 
          size="small" 
          color="inherit"
          startIcon={<CheckCircle fontSize="small" />}
          sx={{ textTransform: 'none' }}
          onClick={handleMarkAllAsRead}
        >
          Mark all as read
        </Button>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {unreadCount} unread • {filteredNotifications.length} shown
        </Typography>
      </Box>

      {/* Notifications List */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {filteredNotifications.length > 0 ? (
          <List sx={{ p: 0 }}>
            {filteredNotifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <NotificationItem {...notification} index={index} />
                {index < filteredNotifications.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Fade in>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              p: 3,
              textAlign: 'center'
            }}>
              <NotificationsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No notifications found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try adjusting your filters or check back later
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'center'
      }}>
        <Button 
          variant="text" 
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={() => setViewAll(!viewAll)}
          endIcon={viewAll ? <ExpandLess /> : <ExpandMore />}
        >
          {viewAll ? 'Show Less' : 'View All Notifications'}
        </Button>
      </Box>
    </Box>
  );
};

export default MessagePage;