"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        id="gtag-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
try {
  var raw = localStorage.getItem('cookie_consent_v1');
  if (raw) {
    var c = JSON.parse(raw);
    if (c && c.version === 'v1') {
      gtag('consent', 'update', {
        'analytics_storage': c.analytics ? 'granted' : 'denied',
        'functionality_storage': c.analytics ? 'granted' : 'denied',
        'ad_storage': c.ads ? 'granted' : 'denied',
        'ad_user_data': c.ads ? 'granted' : 'denied',
        'ad_personalization': c.ads ? 'granted' : 'denied',
        'personalization_storage': c.ads ? 'granted' : 'denied'
      });
    }
  }
} catch (e) {}
gtag('set', 'url_passthrough', true);
gtag('set', 'ads_data_redaction', true);
`.trim(),
        }}
      />

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
gtag('js', new Date());
gtag('config', '${GA_ID}', {
  send_page_view: false,
  anonymize_ip: true
});
`.trim(),
        }}
      />
    </>
  );
}
