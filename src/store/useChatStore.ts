import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: number;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  participantNames: string[];
  participantAvatars: string[];
  carId: string;
  carName: string;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: number;
}

interface ChatState {
  chats: Chat[];
  createChat: (data: {
    userId: string;
    userName: string;
    userAvatar: string;
    hostId: string;
    hostName: string;
    hostAvatar: string;
    carId: string;
    carName: string;
  }) => string;
  sendMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (chatId: string) => void;
  getChatsByUser: (userId: string) => Chat[];
  getChat: (chatId: string) => Chat | undefined;
  getUnreadCount: (userId: string) => number;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],

      createChat: (data) => {
        const existing = get().chats.find(
          c => c.carId === data.carId &&
            c.participants.includes(data.userId) &&
            c.participants.includes(data.hostId)
        );
        if (existing) return existing.id;

        const chatId = crypto.randomUUID();
        const newChat: Chat = {
          id: chatId,
          participants: [data.userId, data.hostId],
          participantNames: [data.userName, data.hostName],
          participantAvatars: [data.userAvatar, data.hostAvatar],
          carId: data.carId,
          carName: data.carName,
          messages: [],
          lastMessage: '',
          lastMessageTime: Date.now(),
        };
        set((state) => ({ chats: [newChat, ...state.chats] }));
        return chatId;
      },

      sendMessage: (chatId, message) => {
        const newMsg: Message = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          read: false,
        };
        set((state) => ({
          chats: state.chats.map(c =>
            c.id === chatId
              ? {
                  ...c,
                  messages: [...c.messages, newMsg],
                  lastMessage: message.text,
                  lastMessageTime: Date.now(),
                }
              : c
          ),
        }));
      },

      markAsRead: (chatId) => {
        set((state) => ({
          chats: state.chats.map(c =>
            c.id === chatId
              ? {
                  ...c,
                  messages: c.messages.map(m => ({ ...m, read: true })),
                }
              : c
          ),
        }));
      },

      getChatsByUser: (userId) => {
        return get().chats.filter(c => c.participants.includes(userId));
      },

      getChat: (chatId) => {
        return get().chats.find(c => c.id === chatId);
      },

      getUnreadCount: (userId) => {
        return get().chats
          .filter(c => c.participants.includes(userId))
          .reduce((count, chat) => {
            return count + chat.messages.filter(m => !m.read && m.senderId !== userId).length;
          }, 0);
      },
    }),
    { name: 'chat-storage' }
  )
);
