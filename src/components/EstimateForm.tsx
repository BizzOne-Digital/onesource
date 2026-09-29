import { FormEvent, useRef, useState } from 'react';
import { getFormspreeEndpoint, siteConfig } from '@/config/site';
import { CallNowButton } from './Buttons';
import styles from './EstimateForm.module.css';

type FormFields = {
  name: string;
  phone: string;
  email: string;
  propertyLocation: string;
  serviceNeeded: string;
  projectDetails: string;
  preferredContact: 'phone' | 'email' | 'either';
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const serviceOptions = [
  'Interior Painting',
  'Exterior Painting',
  'Epoxy Flooring',
  'Pressure Washing',
  'House Cleaning',
  'Junk Removal',
  'Handyman Services',
  'Residential & Commercial',
  'Multiple services',
  'Not sure yet',
];

const initial: FormFields = {
  name: '',
  phone: '',
  email: '',
  propertyLocation: '',
  serviceNeeded: '',
  projectDetails: '',
  preferredContact: 'phone',
};

function validate(values: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.phone.trim()) errors.phone = 'Please enter a phone number.';
  else if (!/^[\d\s().+-]{7,}$/.test(values.phone.trim()))
    errors.phone = 'Enter a valid phone number.';
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Enter a valid email address.';
  if (!values.propertyLocation.trim())
    errors.propertyLocation = 'Please enter the property location.';
  if (!values.serviceNeeded) errors.serviceNeeded = 'Please select a service.';
  if (!values.projectDetails.trim())
    errors.projectDetails = 'Please share a few details about your project.';
  return errors;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function EstimateForm() {
  const endpoint = getFormspreeEndpoint();
  const [values, setValues] = useState<FormFields>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const lastSubmitRef = useRef(0);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!endpoint) return;

    const now = Date.now();
    if (now - lastSubmitRef.current < 3000) {
      setSubmitError('Please wait a moment before submitting again.');
      return;
    }
    lastSubmitRef.current = now;

    setSubmitState('loading');
    setSubmitError(null);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          _subject: `Free estimate request — ${siteConfig.businessName}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      setSubmitState('success');
      setValues(initial);
    } catch {
      setSubmitState('error');
      setSubmitError('Something went wrong. Please call us directly and we will help you right away.');
    }
  };

  if (!endpoint) {
    return (
      <div className={styles.fallback} role="status">
        <h3 className={styles.fallbackTitle}>Online form not configured yet</h3>
        <p className={styles.fallbackText}>
          The estimate form will be available once a Formspree endpoint is added to your environment
          variables. For now, call us for a free estimate — we are ready to help.
        </p>
        <CallNowButton size="lg" />
        <p className={styles.hint}>
          Site owners: set <code>VITE_FORMSPREE_ENDPOINT</code> in <code>.env</code> (see{' '}
          <code>.env.example</code>).
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={submitState === 'loading'}>
      {submitState === 'success' && (
        <div className={styles.bannerSuccess} role="status">
          Thank you — your request was sent. We will contact you soon. For urgent questions, call{' '}
          <a href={siteConfig.phoneTel}>{siteConfig.phoneDisplay}</a>.
        </div>
      )}

      {(submitState === 'error' || submitError) && (
        <div className={styles.bannerError} role="alert">
          {submitError ?? 'Unable to send your request.'}{' '}
          <a href={siteConfig.phoneTel}>Call {siteConfig.phoneDisplay}</a>
        </div>
      )}

      <div className={styles.grid}>
        <Field label="Full name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={onChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>

        <Field
          label="Property location"
          htmlFor="propertyLocation"
          error={errors.propertyLocation}
          required
        >
          <input
            id="propertyLocation"
            name="propertyLocation"
            type="text"
            placeholder="City or full address"
            value={values.propertyLocation}
            onChange={onChange}
            aria-invalid={!!errors.propertyLocation}
            aria-describedby={errors.propertyLocation ? 'propertyLocation-error' : undefined}
          />
        </Field>

        <Field label="Service needed" htmlFor="serviceNeeded" error={errors.serviceNeeded} required>
          <select
            id="serviceNeeded"
            name="serviceNeeded"
            value={values.serviceNeeded}
            onChange={onChange}
            aria-invalid={!!errors.serviceNeeded}
            aria-describedby={errors.serviceNeeded ? 'serviceNeeded-error' : undefined}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Preferred contact method</legend>
          <div className={styles.radios}>
            {(
              [
                ['phone', 'Phone'],
                ['email', 'Email'],
                ['either', 'Either'],
              ] as const
            ).map(([val, label]) => (
              <label key={val} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="preferredContact"
                  value={val}
                  checked={values.preferredContact === val}
                  onChange={onChange}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <Field
        label="Project details"
        htmlFor="projectDetails"
        error={errors.projectDetails}
        required
        full
      >
        <textarea
          id="projectDetails"
          name="projectDetails"
          rows={5}
          value={values.projectDetails}
          onChange={onChange}
          placeholder="Tell us about rooms, surfaces, timeline, or any access notes."
          aria-invalid={!!errors.projectDetails}
          aria-describedby={errors.projectDetails ? 'projectDetails-error' : undefined}
        />
      </Field>

      <button type="submit" className={styles.submit} disabled={submitState === 'loading'}>
        {submitState === 'loading' ? 'Sending…' : 'Submit estimate request'}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  full,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.field} ${full ? styles.fieldFull : ''}`}>
      <label htmlFor={htmlFor}>
        {label}
        {required && <span className={styles.req}> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
