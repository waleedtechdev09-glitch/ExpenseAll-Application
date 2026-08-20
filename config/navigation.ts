export interface NavItem {
  label: string;
  href: string;
}

export interface BrandConfig {
  name: string;
  logoSrc: string;
  altText?: string;
}

export const BRAND_INFO: BrandConfig = {
  name: "ExpenseAll",
  logoSrc: "/assets/expenselogo.png",
  altText: "Expense All Logo",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
];
