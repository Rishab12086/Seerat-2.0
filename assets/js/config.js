/*
 * Site settings.
 * To connect the enquiry form, replace FORMSPREE_ID below with the form ID
 * from your Formspree dashboard (the part after /f/ in the form endpoint).
 * This is the only place the ID lives.
 */
window.SWT_CONFIG = {
  contactForm: {
    endpoint: "https://formspree.io/f/FORMSPREE_ID",
    fallbackEmail: "swt@seerat.org.in"
  }
};
