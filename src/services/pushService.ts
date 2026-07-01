export interface PushNotification {
  id: string;
  title: string;
  body: string;
  icon?: string;
  url?: string;
  read: boolean;
  timestamp: number;
}

class PushNotificationService {
  private notifications: PushNotification[] = [];
  private listeners: ((notifications: PushNotification[]) => void)[] = [];

  // Request browser notification permission
  async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Send browser notification
  sendBrowserNotification(title: string, body: string, icon?: string) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: icon || '/favicon.svg' });
    }
  }

  // Add to in-app notification list
  addNotification(title: string, body: string, url?: string) {
    const notif: PushNotification = {
      id: crypto.randomUUID(),
      title,
      body,
      url,
      read: false,
      timestamp: Date.now(),
    };
    this.notifications.unshift(notif);
    this.notifyListeners();
    this.sendBrowserNotification(title, body);
    return notif;
  }

  markAsRead(id: string) {
    this.notifications = this.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notifyListeners();
  }

  markAllAsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.notifyListeners();
  }

  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  getNotifications() {
    return [...this.notifications];
  }

  subscribe(listener: (notifications: PushNotification[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(l => l([...this.notifications]));
  }
}

export const pushService = new PushNotificationService();
