import { MapPin } from "lucide-react";
import { areas } from "@/data/site";

const wrap = "max-w-7xl mx-auto px-8 sm:px-11 md:px-16 lg:px-22";

const AreasWeCover = () => (
  <section className="py-16 border-t border-border">
    <div className={wrap}>
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Areas we cover</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We work across Dublin and the surrounding counties, from our base in Drumree, Co. Meath.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {areas.map((a) => (
          <div key={a.county} className="rounded-2xl border border-border shadow-soft p-5 bg-card">
            <div className="flex items-center gap-2 font-semibold text-foreground mb-1">
              <MapPin className="w-4 h-4 text-accent" /> {a.county}
            </div>
            <p className="text-sm text-muted-foreground">{a.towns}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AreasWeCover;
