import { Link } from "react-router-dom";
import { company } from "@/data/site";

const wrap = "max-w-7xl mx-auto px-8 sm:px-11 md:px-16 lg:px-22";

type Props = {
  tagline: string;
  /** Snagging carries its own trading details; the calculator adds nav links. */
  variant?: "default" | "snagging" | "calculator";
};

const SiteFooter = ({ tagline, variant = "default" }: Props) => (
  <footer className="py-12 border-t border-border bg-muted/30">
    <div className={wrap}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/assets/mf-logo-DQmhj-jT.jpg"
            alt="MF Project Solutions"
            className="w-10 h-10 object-cover rounded-lg"
          />
          <div>
            <div className="font-semibold text-foreground">MF Project Solutions</div>
            <div className="text-sm text-muted-foreground">{tagline}</div>
          </div>
        </div>

        {variant === "calculator" && (
          <div className="flex items-center gap-4">
            <Link
              to="/landscaping-pergolas"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Landscaping &amp; Pergolas
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
          </div>
        )}

        {variant === "snagging" ? (
          <>
            <div className="text-center md:text-left">
              <div className="text-sm text-muted-foreground mb-2">© {new Date().getFullYear()} Alex Ferreira, Dublin</div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <span>VAT: 3774742UH</span>
                <a
                  href="https://www.instagram.com/mfprojectsolutions"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  @mfprojectsolutions
                </a>
              </div>
            </div>
            <a href="https://mfprojectsolutions.ie" target="_blank" rel="noreferrer">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-primary/20 bg-transparent text-foreground hover:bg-primary/5 h-9 rounded-md px-4">
                Visit main website
              </button>
            </a>
          </>
        ) : variant === "calculator" ? (
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MF Project Solutions. All rights reserved.
          </div>
        ) : (
          <div className="text-center md:text-right space-y-1">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MF Project Solutions. All rights reserved.
            </div>
            <div className="text-xs text-muted-foreground">
              {company.legalName}, trading as MF Project Solutions. Company Reg. {company.companyReg}.
            </div>
            <a
              href={company.reviewUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Leave us a review on Google
            </a>
          </div>
        )}
      </div>
    </div>
  </footer>
);

export default SiteFooter;
