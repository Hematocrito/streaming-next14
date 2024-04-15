import Link from 'next/link';
import { Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { HomeListingTranslations } from '@components/performer/home-listing-translations';

function BecomeAModelButton() {
  const router = useRouter();
  const { locale } = router;

  const translations = locale === '' ? HomeListingTranslations['en-US'] : HomeListingTranslations['es-ES'];

  return (
    <Link legacyBehavior href="/auth/register">
      <Button className="primary">
        {translations.becomeBtn}
      </Button>
    </Link>
  );
}

export default BecomeAModelButton;
