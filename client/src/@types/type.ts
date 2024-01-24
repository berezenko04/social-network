export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export type TFormErrors = Record<string, { message: string }>;
