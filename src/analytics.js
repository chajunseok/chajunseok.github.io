import ReactGA from 'react-ga4';

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (measurementId) {
    ReactGA.initialize(measurementId);
  } else {
    console.warn('GA4 measurement ID not found');
  }
};

export const logPageView = (path) => {
  ReactGA.send({ 
    hitType: "pageview", 
    page: path || window.location.pathname + window.location.hash
  });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
}; 