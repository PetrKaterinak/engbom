export interface NavbarConfig {
    colors?: {
        itemActiveBG?: string;
        itemActiveText?: string;
        itemText?: string;
        itemHoverBG?: string;
        itemHoverText?: string;
        navbarBackgroundFrom?: string;
        navbarBackgroundTo?: string;
    };
    site: {
        name: string;
        logo?: any;
    };
    user?: {
        name: string;
        email: string;
        avatar?: string;
    }
    iconSize?: string;
    mobileBreakpoint?: number;
}