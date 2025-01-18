import { ReactNode } from "react";

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