export interface StatItem {
  label: string;
  value: string;
}

export interface HeroConfig {
  titlePrefix: string;
  highlightedText: string;
  titleSuffix?: string;
  description: string;
  heroImage: string; // Main mobile app screenshot image
  playStoreUrl: string; // Actual URL to redirect when user clicks Play Store (e.g., https://play.google.com/...)
  appStoreUrl: string; // Actual URL to redirect when user clicks App Store (e.g., https://apps.apple.com/...)
  playStoreBadge: string; // Image path for Google Play button image (/assets/playStore.png)
  appStoreBadge: string; // Image path for App Store button image (/assets/appStore.png)
  stats: StatItem[];
}

export const HERO_DATA: HeroConfig = {
  titlePrefix: "Take Control of ",
  highlightedText: "Every Expense.",
  titleSuffix: "",
  description:
    "Keep track of your money without making things complicated. ExpenseAll is a personal expense tracker that helps you record daily spending, manage income and plan your budget in one place.",
  heroImage: "/assets/heroImageUpdated.svg", // Main mobile app screenshot image
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.elexoft.expenseall.app", // Click karne par yahan redirect hoga
  appStoreUrl: "https://apps.apple.com", // Click karne par yahan redirect hoga
  playStoreBadge: "/assets/playStore.png", // Play Store ki button image
  appStoreBadge: "/assets/apple.png", // App Store ki button image
  stats: [
    { label: "AI-Powered", value: "Receipt & Voice Entry" },
    { label: "Cloud Sync", value: "100% Secure" },
    { label: "Active Users", value: "25K+" },
  ],
};
