import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { contactEmail, FORM_ACCESS_KEY } from '../data/content';
import './ContactModal.css';

const ContactCtx = createContext({ openForm: () => {} });

/** Lets any button anywhere on the page pop the enquiry form open. */
export function useContactForm() {
  return useContext(ContactCtx);
}

export function ContactProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  return (
    <ContactCtx.Provider value={{ open, openForm, closeForm }}>
      {children}
      <ContactModal open={open} onClose={closeForm} />
    </ContactCtx.Provider>
  );
}

const EASE = [0.16, 1, 0.3, 1];

function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | handoff | error
  const [error, setError] = useState('');
  const firstFieldRef = useRef(null);
  const panelRef = useRef(null);

  // Escape closes, and the page behind should not scroll away underneath
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t = setTimeout(() => firstFieldRef.current?.focus(), 120);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, onClose]);

  // start clean the next time it opens, but only once it has finished closing
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStatus('idle');
      setError('');
    }, 400);
    return () => clearTimeout(t);
  }, [open]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    // No key configured yet: hand off to the visitor's mail client with
    // everything already filled in rather than silently dropping the enquiry.
    if (!FORM_ACCESS_KEY) {
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
        `New project enquiry from ${name}`,
      )}&body=${encodeURIComponent(body)}`;
      // 'handoff', not 'sent': the visitor still has to press send themselves
      setStatus('handoff');
      return;
    }

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          subject: `New project enquiry from ${name}`,
          from_name: 'Podium website',
          name,
          email,
          message,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || 'Something went wrong');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(e) => {
            // only a click on the backdrop itself should dismiss it
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            className="cform__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cform-title"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button className="cform__close" onClick={onClose} aria-label="Close form">
              &times;
            </button>

            {status === 'sent' || status === 'handoff' ? (
              <div className="cform__done">
                <h2 className="display h3" id="cform-title">
                  {status === 'sent' ? 'Thanks, that is with me.' : 'Your email is ready to send.'}
                </h2>
                <p>
                  {status === 'sent'
                    ? 'I read every one of these myself and usually reply the same day. If it is urgent, WhatsApp is faster.'
                    : 'I have opened an email with your details already filled in — press send and it comes straight to me.'}
                </p>
                <button className="btn btn--dark" onClick={onClose}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <span className="kicker">Start a project</span>
                <h2 className="display h3" id="cform-title">
                  Tell me what you need.
                </h2>
                <p className="cform__lede">
                  Two boxes and a sentence. It comes straight to my inbox and I answer it myself.
                </p>

                <form className="cform__form" onSubmit={onSubmit}>
                  <label className="cform__field">
                    <span>Your name</span>
                    <input ref={firstFieldRef} name="name" type="text" required autoComplete="name" />
                  </label>

                  <label className="cform__field">
                    <span>Email</span>
                    <input name="email" type="email" required autoComplete="email" />
                  </label>

                  <label className="cform__field">
                    <span>What do you need?</span>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Three motion videos for a product launch, short-form for a new account, something else entirely..."
                    />
                  </label>

                  {status === 'error' && (
                    <p className="cform__error" role="alert">
                      {error}. You can also email me at{' '}
                      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                    </p>
                  )}

                  <button className="btn btn--dark cform__submit" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send it'}
                    <span className="arrow">&rarr;</span>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
