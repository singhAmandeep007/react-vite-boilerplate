import { FC, PropsWithChildren, useMemo } from "react";

import { Trans, useTranslation } from "react-i18next";

import { Button, RouteLink, Typography } from "../../components/ui";

import { ArrowRight, ListTodo, NotebookPen, Repeat, SquareCheckBig } from "lucide-react";

export type THomeProps = Record<string, never>;

type TSequence = {
  icon: JSX.Element;
  name: string;
};

export const Home: FC<PropsWithChildren<THomeProps>> = () => {
  const { t } = useTranslation("homePage");

  const sequence: TSequence[] = useMemo(
    () => [
      {
        icon: (
          <ListTodo
            size={32}
            className="text-primary"
          />
        ),
        name: t("sequence.1"),
      },
      {
        icon: (
          <NotebookPen
            size={32}
            className="text-primary"
          />
        ),
        name: t("sequence.2"),
      },
      {
        icon: (
          <SquareCheckBig
            size={32}
            className="text-primary"
          />
        ),
        name: t("sequence.3"),
      },
      {
        icon: (
          <Repeat
            size={32}
            className="text-primary"
          />
        ),
        name: t("sequence.4"),
      },
    ],
    [t]
  );

  return (
    <article>
      <section className="container grid h-dvh place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
        <div className="space-y-4 text-center lg:text-start">
          <Typography className="max-sm:inline">
            <Trans
              i18nKey="hero.title1"
              ns="homePage"
            >
              We&apos;re here to
              <span className="bg-gradient-to-r from-pink-300 to-pink-500 bg-clip-text text-transparent">boost</span>
            </Trans>
          </Typography>
          <Typography className="max-sm:inline">
            <Trans
              i18nKey="hero.title2"
              ns="homePage"
            >
              your
              <span className="inline bg-gradient-to-r from-blue-300 via-blue-500 to-blue-800 bg-clip-text text-transparent">
                productivity
              </span>
              🚀
            </Trans>
          </Typography>
          <Typography
            variant="p"
            affects="muted"
            className="mx-auto text-xl md:w-10/12 lg:mx-0"
          >
            {t("hero.subtitle")}
          </Typography>

          <div className="space-y-4 md:space-x-4 md:space-y-0">
            <RouteLink to="/auth/login">
              <Button className="w-full md:w-1/3">
                {t("hero.getStarted")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </RouteLink>
          </div>
        </div>

        {/* Shadow effect */}
        <div className="absolute -z-10 h-1/2 w-1/2 animate-shadow-pulse rounded-[50%] blur-[120px]"></div>
      </section>
      <section className="container mb-16 h-full">
        <Typography
          variant="h2"
          className="mb-12 text-center"
        >
          <Trans
            i18nKey="startTask"
            ns="homePage"
          >
            Make the most of your day! <br /> Start with a task.
          </Trans>
        </Typography>

        <div className="flex flex-wrap items-stretch justify-center gap-4 md:gap-8">
          {sequence.map(({ icon, name }) => (
            <div
              key={name}
              className="flex w-32 flex-col items-center gap-4 text-muted-foreground/60"
            >
              <div>{icon}</div>
              <Typography
                variant="h3"
                affects="withoutPMargin"
                className="text-nowrap"
              >
                {name}
              </Typography>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
