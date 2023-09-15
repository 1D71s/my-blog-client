import React, { ReactNode } from 'react';
import { ConfigProvider } from '@vkontakte/vkui';
import { useAppSelector } from './hooks';

interface LightThemeWrapperProps {
  children: ReactNode;
}

const LightThemeWrapper: React.FC<LightThemeWrapperProps> = ({ children }) => {

    const theme = useAppSelector(state => state.auth.theme)

    

    return (
        <ConfigProvider appearance={!theme ? 'dark' : 'light'}>
            {children}
        </ConfigProvider>
    );
};

export default LightThemeWrapper;
