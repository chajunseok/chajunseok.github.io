import { Reveal } from '@/shared/ui';
import { profile } from '../model/profile';

export function ProfileAbout() {
  return (
    <Reveal>
      <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed whitespace-pre-line md:text-xl">
        {profile.description}
      </p>
    </Reveal>
  );
}
