
import React from 'react';
import { Notification, NotificationType } from '../../types';
import { ProjectIcon, ServiceIcon, LeaveIcon, MegaphoneIcon, BellIcon } from '../icons/Icons';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  onClose: () => void;
}

const NotificationIconMap: Record<NotificationType, React.ReactElement> = {
    project: <ProjectIcon className="w-5 h-5 text-blue-500" />,
    service: <ServiceIcon className="w-5 h-5 text-yellow-500" />,
    leave: <LeaveIcon className="w-5 h-5 text-indigo-500" />,
    announcement: <MegaphoneIcon className="w-5 h-5 text-green-500" />,
    system: <BellIcon className="w-5 h-5 text-gray-500" />,
};

const NotificationsPanel: React.FC<Props> = ({ notifications, setNotifications, onClose }) => {
    
    const handleMarkAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };
    
    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border z-50 animate-fade-in-down">
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-text-primary">Notifications</h3>
                {unreadCount > 0 && (
                    <button onClick={handleMarkAllAsRead} className="text-xs font-medium text-primary hover:underline">
                        Mark all as read
                    </button>
                )}
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div 
                            key={notification.id}
                            onClick={() => handleMarkAsRead(notification.id)}
                            className={`flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${!notification.read ? 'bg-white' : 'bg-gray-100'}`}>
                                {NotificationIconMap[notification.type]}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm ${!notification.read ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                                    {notification.message}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">
                                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                    </span>
                                    {notification.priority === 'Urgent' && (
                                        <span className="text-xs font-bold text-red-500">URGENT</span>
                                    )}
                                </div>
                            </div>
                             {!notification.read && (
                                <div className="flex-shrink-0 mt-1 w-2.5 h-2.5 bg-primary rounded-full" aria-label="Unread"></div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <BellIcon className="w-12 h-12 mx-auto text-gray-300" />
                        <h4 className="mt-2 font-semibold text-text-primary">No notifications</h4>
                        <p className="mt-1 text-sm text-text-secondary">You're all caught up!</p>
                    </div>
                )}
            </div>
            <div className="p-2 bg-gray-50 rounded-b-xl text-center">
                <button onClick={onClose} className="w-full py-2 text-sm font-semibold text-primary hover:bg-gray-100 rounded-md transition">
                    View All Announcements
                </button>
            </div>
        </div>
    );
};

export default NotificationsPanel;