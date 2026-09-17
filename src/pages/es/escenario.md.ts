import { buildDateIso } from "../../data/build-info.mjs";
import { siteOrigin } from "../../data/publication.mjs";
import narrative from "../../content/scenario-candidate-es.md?raw";
import { candidateIntroduction } from "../../data/candidate-reading-time";

export const GET = () => new Response(
  `---\nedition: public\nsourceRevision: ${buildDateIso}-es\n---\n\n# Brasil 2030: El costo del retraso en la era de la IA\n\n${candidateIntroduction.es.join("\n\n")}\n\n> Este es un escenario, no una predicción. Los personajes son ficticios; los acontecimientos futuros exploran decisiones y consecuencias posibles. Las fuentes del punto de partida están en las notas.\n\nPágina: ${siteOrigin()}/es\n\n${narrative}`,
  { headers: {
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Disposition": "inline",
    "Cache-Control": "public, max-age=0, must-revalidate",
  } },
);
