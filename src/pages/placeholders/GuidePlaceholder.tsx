import { guideByRoute } from "@/lib/content";
import Placeholder from "./Placeholder";

export default function GuidePlaceholder({ route }: { route: string }) {
  const guide = guideByRoute(route);
  return (
    <Placeholder name={guide?.title ?? route}>
      {guide?.lead && <p className="mt-4 text-muted-foreground">{guide.lead}</p>}
    </Placeholder>
  );
}
