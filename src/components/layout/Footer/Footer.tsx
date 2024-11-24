import { useTranslation } from "react-i18next";

import { Typography } from "../../ui/Typography";

const year = new Date().getFullYear();

export const Footer = () => {
  const { t } = useTranslation("common", {
    keyPrefix: "app",
  });

  return (
    <footer className="max-h-[--footer-height] overflow-hidden">
      <hr className="mx-auto" />
      <section className="container p-2 text-center">
        <Typography variant={"p"}>
          {t("copyright", {
            year,
          })}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/singhAmandeep007"
            className="ml-1 border-primary text-primary hover:border-b-2"
          >
            {t("author")}
          </a>
        </Typography>
      </section>
    </footer>
  );
};
