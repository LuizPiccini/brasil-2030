import { buildDateIso } from "../../data/build-info";
import { siteOrigin } from "../../data/publication.mjs";
import narrative from "../../content/scenario-candidate-en.md?raw";
import { candidateIntroduction } from "../../data/candidate-reading-time";

export const GET = () => new Response(
  `---\nedition: public\nsourceRevision: ${buildDateIso}-en\n---\n\n# Brazil 2030: The Cost of Delay in the AI Era\n\n${candidateIntroduction.en.join("\n\n")}\n\n> This is a scenario, not a forecast. The characters are fictional; the future events explore possible choices and consequences. The sources for the starting point are in the notes.\n\nPage: ${siteOrigin()}/en\n\n${narrative}`,
  { headers: {
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Disposition": "inline",
    "Cache-Control": "public, max-age=0, must-revalidate",
  } },
);
