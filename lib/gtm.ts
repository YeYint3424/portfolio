export const sendGTMEvent = (data: Record<string, any>) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};
