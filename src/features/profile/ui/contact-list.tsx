import { useState, type ComponentType, type SVGProps } from 'react';
import { Check, Copy, ExternalLink, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { logEvent } from '@/shared/analytics';
import { Button, GithubIcon, SpotlightCard } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
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
      <ul className="grid gap-5 md:grid-cols-3">
        {contacts.map((contact) => {
          const Icon = ICONS[contact.kind];
          const external = contact.kind === 'github';
          const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
          return (
            <li key={contact.kind}>
              <SpotlightCard className="flex h-full flex-col gap-4 p-6">
                <Icon className={cn('size-6', contact.kind === 'email' && 'text-primary')} />
                <div>
                  <p className="text-muted-foreground text-xs font-medium">{t(`contact.kind.${contact.kind}`)}</p>
                  <a
                    href={contact.href}
                    className="hover:text-primary mt-1 block text-lg font-semibold break-all"
                    {...externalProps}
                  >
                    {contact.value}
                  </a>
                </div>
                {contact.kind === 'email' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto self-start"
                    onClick={() => handleCopy(contact.value)}
                  >
                    {copyState === 'copied' ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {t('contact.copy')}
                  </Button>
                ) : (
                  <Button asChild variant="outline" size="sm" className="mt-auto self-start">
                    <a href={contact.href} {...externalProps}>
                      {external && <ExternalLink className="size-4" />}
                      {t(`contact.action.${contact.kind}`)}
                    </a>
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
