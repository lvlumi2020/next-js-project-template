import { message as antdMessage, Modal as antdModal } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';

// 创建一个全局对象来存储实例
export const globalInstances: {
    message: MessageInstance | null;
    modal: Omit<ModalStaticFunctions, 'warn'> | null;
} = {
    message: null,
    modal: null
};

// 提供代理方法，确保即使实例未初始化也能正常工作
export const message = new Proxy({} as MessageInstance, {
    get: (target, prop) => {
        if (globalInstances.message) {
            return globalInstances.message[prop as keyof MessageInstance];
        }
        return antdMessage[prop as keyof typeof antdMessage];
    }
});

export const modal = new Proxy({} as Omit<ModalStaticFunctions, 'warn'>, {
    get: (target, prop) => {
        if (globalInstances.modal) {
            return globalInstances.modal[prop as keyof Omit<ModalStaticFunctions, 'warn'>];
        }
        return antdModal[prop as keyof typeof antdModal];
    }
});