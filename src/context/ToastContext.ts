import { createContext } from 'react';

interface MessageContextType {
    messenger: {
        success: (content: string, duration?: number, onClose?: () => void) => void;
        error: (content: string, duration?: number, onClose?: () => void) => void;
        info: (content: string, duration?: number, onClose?: () => void) => void;
        warning: (content: string, duration?: number, onClose?: () => void) => void;
        loading: (content: string, duration?: number) => void;
    };
}

export const MessageContext = createContext<MessageContextType | undefined>(undefined);
