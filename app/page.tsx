import { auth } from '@/auth';
import LandingPage from '@/components/Landingpage';

export default async function Page() {
  const session = await auth();
  return <LandingPage session={session} />;
}
