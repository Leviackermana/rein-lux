REIN LUX – GA4 installation

1. Copy app/layout.tsx to your existing app/layout.tsx (back up first).
2. Copy both components/*.tsx files into your existing components folder.
3. npm.cmd install @next/third-parties
4. npm.cmd run build
5. Deploy.

IMPORTANT:
- The banner is a starter implementation, not a legal compliance guarantee.
- Update your Datenschutzerklärung with GA4 details and add a visible privacy-policy link to the banner.
- Check whether other analytics/tracking scripts are already installed and remove duplicates.
- For stronger withdrawal behavior, configure Google Consent Mode v2 or a suitable CMP; rejecting after prior acceptance reloads the page, but does not delete existing Google cookies. Implement cookie deletion / consent revocation appropriate to your setup.
- Test accept/reject in a clean browser profile and inspect Network requests to ensure GA4 does not load before acceptance.
