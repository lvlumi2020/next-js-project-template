"use client";

import { ConfigProvider, message, Modal, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React, { useEffect, useState, ReactNode } from 'react';
import { globalInstances } from '@/services';

interface ThemeConfigProps {
    children: ReactNode
}

const bgColor = (isDarkTheme: boolean) => isDarkTheme ? "black" : "white";

const ThemeConfig: React.FC<ThemeConfigProps> = ({ children }) => {

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
    const [messageInstance, messageContextHolder] = message.useMessage();
    const [modalInstance, modalContextHolder] = Modal.useModal();

    // 将实例注册到全局服务
    useEffect(() => {
        globalInstances.message = messageInstance;
        globalInstances.modal = modalInstance;
    }, [messageInstance, modalInstance]);

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkTheme(darkModeQuery.matches);
        const handler = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
        darkModeQuery.addEventListener('change', handler);
        return () => darkModeQuery.removeEventListener('change', handler);
    }, [])

    useEffect(() => {
        process.env.DEFAULT_BACKGROUND_COLOR = bgColor(isDarkTheme);
    }, [isDarkTheme])

    return (
        <main>
            <ConfigProvider
                locale={zhCN}
                theme={{
                    algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        fontFamily: 'Courier New'
                    },
                    components: {
                        Form: {
                        },
                        Layout: {
                            triggerBg: bgColor(isDarkTheme),
                            siderBg: bgColor(isDarkTheme),
                            lightSiderBg: bgColor(isDarkTheme),
                            lightTriggerBg: bgColor(isDarkTheme),
                            headerBg: bgColor(isDarkTheme),
                        }
                    }
                }} >
                {messageContextHolder}
                {modalContextHolder}
                {children}
            </ConfigProvider>
        </main>
    )
}

export default ThemeConfig;
