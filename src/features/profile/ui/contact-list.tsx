import { useState, type ComponentType, type SVGProps } from 'react';
import { Check, Copy, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { logEvent } from '@/shared/analytics';
import { Button, GithubIcon, SpotlightCard } from '@/shared/ui';
import { copyText } from '@/shared/utils/copy-text';
import { contacts } from '../model/profile';
import type { ContactKind } from '../model/profile.types';

const ICONS: Record<ContactKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  email: Mail,
  github: GithubIcon,
  phone: Phone,
};

type CopyState = 'idle' | 'copied' | 'failed';

export function ContactList() {
  const { t } = useTranslation();
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const handleCopy = async (value: string) => {
    const copied = await copyText(value);
    setCopyState(copied ? 'copied' : 'failed');
    if (copied) logEvent('Contact', 'copy', 'email');
  };

  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-3">
        {contacts.map((contact) => {
          const Icon = ICONS[contact.kind];
          const external = contact.kind === 'github';
          return (
            <li key={contact.kind}>
              <SpotlightCard className="flex h-full flex-col gap-4 p-6">
                <Icon className="text-primary size-6" />
                <div>
                  <p className="text-muted-foreground text-sm">{t(`contact.kind.${contact.kind}`)}</p>
                  <a
                    href={contact.href}
                    className="hover:text-primary mt-1 block font-semibold break-all"
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {contact.value}
                  </a>
                </div>
                {contact.kind === 'email' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto self-start"
                    onClick={() => handleCopy(contact.value)}
                  >
                    {copyState === 'copied' ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {t('contact.copy')}
                  </Button>
                )}
              </SpotlightCard>
            </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="text-muted-foreground mt-4 min-h-6 text-sm">
        {copyState === 'copied' && t('contact.copied')}
        {copyState === 'failed' && t('contact.copyFailed')}
      </p>
    </div>
  );
}
