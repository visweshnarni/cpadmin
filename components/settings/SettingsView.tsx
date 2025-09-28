
import React from 'react';
import { Theme } from '../../App';
import { UserCircleIcon, LockClosedIcon, BellIcon, SunIcon, MoonIcon, TrashIcon, DownloadIcon } from '../icons/Icons';

const SettingsView: React.FC = () => {
    const [notifications, setNotifications] = React.useState({ email: true, push: false });

    const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
        <button
            type="button"
            className={`${enabled ? 'bg-primary' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            onClick={() => onChange(!enabled)}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    );

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Settings</h2>
                <p className="text-text-secondary dark:text-gray-400 mt-1">Manage your profile, preferences, and account settings.</p>
            </div>

            {/* Profile Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold text-text-primary dark:text-gray-200 flex items-center gap-2 mb-4">
                    <UserCircleIcon /> Profile Settings
                </h3>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                            <input type="text" defaultValue="Admin User" className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                            <input type="email" defaultValue="admin@corporatesaathi.com" className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                     <div className="pt-4 border-t dark:border-gray-700">
                         <h4 className="text-md font-semibold text-text-primary dark:text-gray-200 mb-2 flex items-center gap-2"><LockClosedIcon /> Change Password</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                                <input type="password" placeholder="••••••••" className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                <input type="password" placeholder="••••••••" className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary" />
                            </div>
                         </div>
                    </div>
                    <div className="text-right">
                        <button type="submit" onClick={(e) => e.preventDefault()} className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-700 transition">Save Changes</button>
                    </div>
                </form>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold text-text-primary dark:text-gray-200 flex items-center gap-2 mb-4">
                    <BellIcon /> Notifications
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-text-primary dark:text-gray-200">Email Notifications</p>
                            <p className="text-sm text-text-secondary dark:text-gray-400">Receive updates and alerts via email.</p>
                        </div>
                        <ToggleSwitch enabled={notifications.email} onChange={(val) => setNotifications(p => ({...p, email: val}))} />
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-text-primary dark:text-gray-200">Push Notifications</p>
                            <p className="text-sm text-text-secondary dark:text-gray-400">Get notified directly in your browser.</p>
                        </div>
                        <ToggleSwitch enabled={notifications.push} onChange={(val) => setNotifications(p => ({...p, push: val}))} />
                    </div>
                </div>
            </div>
            
            {/* Account Actions */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold text-red-600 flex items-center gap-2 mb-4">
                   Account Actions
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border dark:border-gray-700 rounded-lg">
                        <div>
                            <p className="font-medium text-text-primary dark:text-gray-200">Export My Data</p>
                            <p className="text-sm text-text-secondary dark:text-gray-400">Download a copy of your personal data.</p>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-semibold text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                            <DownloadIcon /> Export
                        </button>
                    </div>
                    <div className="flex justify-between items-center p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 rounded-lg">
                        <div>
                            <p className="font-medium text-red-800 dark:text-red-300">Delete My Account</p>
                            <p className="text-sm text-red-700 dark:text-red-400">This action is irreversible. All data will be lost.</p>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 bg-red-600 border border-red-700 text-sm font-semibold text-white rounded-lg hover:bg-red-700">
                           <TrashIcon /> Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
