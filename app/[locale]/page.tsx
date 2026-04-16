import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

function HomeContent() {
  const t = useTranslations("hero");

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {t("titleLine1")} {t("titleLine2")}
      </h1>
    </main>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}
