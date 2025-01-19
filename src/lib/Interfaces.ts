import { ReactNode } from "react";

//#region Interfaces
export interface Children {
    children: ReactNode
}

export interface WalletRoute {
    key: string;
    icon: ReactNode;
    label: ReactNode;
}

export interface BreadCrumbs {
    title: string;
    href?: string;
}
export interface BreadCrumbsData {
    data: BreadCrumbs[]
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;           /**Generic type for the actual data**/
}

export interface ErrorResponse {
    status: string;
    message: string;
    error: {
        statusCode: number;
        message: string;
    }
}

export interface Account {
    id: string;
    name: string;
    type: string;
    balance: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null
}
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    accounts: Account[]
}

export interface UserState {
    user: User | null;
    users: User[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    success: boolean;
    message: string;
    error: string | null;
}

export interface LoginReturnData {
    data: {
        token: string;
    }
}

export interface IdType {
    id:string
}

//#region Responses
export type UserResponse = ApiResponse<User>
export type UsersResponse = ApiResponse<User[]>
export type LoginResponse = ApiResponse<LoginReturnData>



//#region Payloads

export type UserPayload ={
    firstName:string;
    lastName:string;
    phone: string;
    email:string;
    password:string;
}

export type UpdateUserPayload ={
    id:string;
    firstName:string;
    lastName:string;
    phone: string;
    email:string;
    password:string;
}

export type LoginPayload ={
    phone: string;
    password:string;
}

//#region Params

export type UserParams = {
    page?: number;
    limit?:number
}

export type AccountParams = {
    userId: string;
}