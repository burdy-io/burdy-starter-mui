import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

declare var hbspt: any;

export type HubspotFormProps = {} & React.HTMLAttributes<HTMLDivElement>;

const HubspotForm: React.VFC<HubspotFormProps> = (props) => {
  const id = useMemo(() => uuid(), []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const hubspotScript = document.querySelector('#hubspot-form-script');

    if (hubspotScript) {
      setLoaded(true);
      return;
    }

    const scriptElement = document.createElement('script');
    scriptElement.id = 'hubspot-form-script';
    scriptElement.onload = () => setLoaded(true);
    scriptElement.src = 'https://js-eu1.hsforms.net/forms/shell.js';

    document.body.appendChild(scriptElement);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    hbspt.forms.create({
      region: process.env.NEXT_PUBLIC_HB_REGION,
      portalId: process.env.NEXT_PUBLIC_HB_PORTAL_ID,
      formId: process.env.NEXT_PUBLIC_HB_FORM_ID,
      target: `[data-form-uuid="${id}"]`,
    });
  }, [id, loaded]);

  return <div data-form-uuid={id} {...props} />;
};

export default HubspotForm;
