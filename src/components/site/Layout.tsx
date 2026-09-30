import type { ReactNode } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import MobileBar from "@/components/site/MobileBar";
import { PageContext, defaultPage, type PageInfo } from "@/components/site/PageContext";

type Props = {
  children: ReactNode;
  /** "overlay" for pages that open with a full-bleed photo. */
  header?: "overlay" | "solid";
  page?: Partial<PageInfo>;
};

/** Every page: header, content, footer and the phone action bar, all aware of the page's lead route. */
export default function Layout({ children, header = "solid", page }: Props) {
  const info: PageInfo = { ...defaultPage, ...page };
  return (
    <PageContext.Provider value={info}>
      <Header variant={header} />
      <main id="main" className={header === "solid" ? "pt-[68px]" : ""}>
        {children}
      </main>
      <Footer />
      <MobileBar />
    </PageContext.Provider>
  );
}
