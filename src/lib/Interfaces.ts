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
export interface AccountState {
    account: Account | null;
    accounts: Account[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    success: boolean;
    message: string;
    error: string | null;
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
    id: string
}

export interface Category {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null
}

export interface CategoryState {
    category: Category | null;
    categories: Category[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    success: boolean;
    message: string;
    error: string | null;
}

export interface Subcategory {
    id: string;
    name: string;
    categoryId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null
}

export interface SubcategoryState {
    subcategory: Subcategory | null;
    subcategories: Subcategory[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    success: boolean;
    message: string;
    error: string | null;
}

export interface TransactionSummary {
            date: string;
            Income: number
            Expense: number;
}

export interface TotalIncomeAndExpenses{
    Income: number;
    Expense: number;
}

export interface Transaction {
    id: string;
    description: string;
    userId: string;
    accountId: string;
    type: string;
    amount: number;
    categoryId: string;
    subcategoryId: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    category: Category;
    subcategory: Subcategory | null;
    account: Account
}

export interface TransactionState {
    transaction: Transaction | null;
    transactions: Transaction[];
    summary:TransactionSummary[];
    totalIncomeAndExpenses: TotalIncomeAndExpenses;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    success: boolean;
    message: string;
    error: string | null;
}

export interface Budget {
    id: string;
    amount: number;
    startDate: string;
    endDate: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string|null;
}

export interface BudgetState {
    budget: Budget | null;
    budgets: Budget[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    success: boolean;
    message: string;
    error: string | null;
}

//#region Responses
export type UserResponse = ApiResponse<User>
export type UsersResponse = ApiResponse<User[]>
export type LoginResponse = ApiResponse<LoginReturnData>
export type AccountResponse = ApiResponse<Account>
export type AccountsResponse = ApiResponse<Account[]>
export type CategoryResponse = ApiResponse<Category>
export type CategoriesResponse = ApiResponse<Category[]>
export type SubcategoryResponse = ApiResponse<Subcategory>
export type SubcategoriesResponse = ApiResponse<Subcategory[]>
export type TransactionResponse = ApiResponse<Transaction>
export type TransactionsResponse = ApiResponse<Transaction[]>
export type BudgetResponse = ApiResponse<Budget>
export type BudgetsResponse = ApiResponse<Budget[]>
export type TransactionSummaryResponse = ApiResponse<TransactionSummary[]>
export type TotalIncomeAndExpensesResponse = ApiResponse<TotalIncomeAndExpenses>


//#region Payloads

export type UserPayload = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}

export type UpdateUserPayload = {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}

export type LoginPayload = {
    phone: string;
    password: string;
}

export type AccountPayload = {
    name: string;
    type: string;
    balance: number;
}

export type UpdateAccountPayload = {
    id: string;
    name: string;
    type: string;
    balance: number;
}

export type CategoryPayload = {
    name: string;
}
export type UpdateCategoryPayload = {
    id: string;
    name: string;
}

export type SubcategoryPayload = {
    name: string;
    categoryId: string;
}

export type UpdateSubcategoryPayload = {
    id: string;
    name: string;
    categoryId: string;
}

export type TransactionPayload = {
    accountId: string;
    categoryId: string;
    subcategoryId?: string | null | undefined;
    amount: number;
    description: string;
    type: string;
}

export type UpdateTransactionPayload = {
    id: string;
    accountId: string;
    categoryId: string;
    subcategoryId?: string | null | undefined;
    amount: number;
    description: string;
    type: string;
}

export type BudgetPayload = {
    amount:number;
    startDate:string|null;
    endDate:string|null;
}

export type UpdateBudgetPayload = {
    id: string;
    amount:number;
    startDate:string|string[];
    endDate:string|string[];
}

//#region Params
export type UserParams = {
    page?: number;
    limit?: number
}

export type AccountParams = {
    page?: number;
    limit?: number
}

export type CategoryParams = {
    page?: number;
    limit?: number
}

export type SubcategoryParams = {
    page?: number;
    limit?: number
}

export type TransactionParams = {
    page?: number;
    limit?: number
}

export type BudgetParams = {
    page?: number;
    limit?: number
}

export type ReportParams = {
    fromDate:string;
    toDate:string;
}