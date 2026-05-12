const hasGtag = (): boolean =>
  typeof window !== "undefined" && typeof window.gtag === "function";

export interface ConsentChoice {
  analytics?: boolean;
  ads?: boolean;
  /** Marketing toggle implies personalization storage in this app */
  personalization?: boolean;
}

export const updateConsent = (granted: ConsentChoice): void => {
  if (!hasGtag()) return;
  const personalization = granted.personalization ?? granted.ads ?? false;
  window.gtag!("consent", "update", {
    analytics_storage: granted.analytics ? "granted" : "denied",
    functionality_storage: granted.analytics ? "granted" : "denied",
    ad_storage: granted.ads ? "granted" : "denied",
    ad_user_data: granted.ads ? "granted" : "denied",
    ad_personalization: granted.ads ? "granted" : "denied",
    personalization_storage: personalization ? "granted" : "denied",
  });
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
): void => {
  if (!hasGtag()) return;
  window.gtag!("event", eventName, params ?? {});
};

export type CalculatorType =
  | "loan"
  | "khondo"
  | "prepayment"
  | "loan-limit"
  | "refinance";

export const Analytics = {
  calculatorUsed: (type: CalculatorType): void =>
    trackEvent("calculator_used", { calculator_type: type }),

  exportPng: (calculatorType: string): void =>
    trackEvent("export_png", { calculator_type: calculatorType }),

  toolBarClicked: (destination: string): void =>
    trackEvent("tools_bar_click", { destination }),

  blogPostRead: (slug: string): void =>
    trackEvent("blog_post_read", { post_slug: slug }),
};
