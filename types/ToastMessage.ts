export enum ToastMessageType {
    info = 1,
    success,
    alert,
    error,
}

export interface ToastMessage {
    text:string
    type:ToastMessageType
    timeout?:number
}
