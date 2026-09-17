import { siteOrigin } from "../data/publication.mjs";
import { siteCopy } from "../data/site";

// Generated rather than static: every link here is an absolute URL, so a domain change
// would otherwise leave thirteen stale addresses behind.
export const GET = () => {
  const site = siteOrigin();

  const body = `# ${siteCopy.pt.title}

> A 2026-2030 narrative about Brazil, AI risk and geopolitical dependence. The Portuguese narrative is the current edition. English pages remain an earlier edition. Spanish pages translate the current Portuguese edition.

## Portuguese, default

- [Cenário completo](${site}/cenario.md)
- [Resumo da narrativa atual](${site}/#resumo-do-cenario)
- [Evidências](${site}/evidencias.md)
- [Estratégia](${site}/estrategia.md)
- [Carta e compromissos](${site}/carta-aberta.md)
- [Sobre e método](${site}/sobre.md)

## English, earlier edition, not a translation of the current Portuguese narrative

- [Full scenario](${site}/en/scenario.md)
- [Summary](${site}/en/summary.md)
- [Evidence](${site}/en/evidence.md)
- [Strategy](${site}/en/strategy.md)
- [Open letter](${site}/en/open-letter.md)
- [About and method](${site}/en/about.md)

## Spanish, translation of the current Portuguese edition

- [Escenario completo](${site}/es/escenario.md)
- [Resumen](${site}/es/resumen.md)
- [Evidencias](${site}/es/evidencias.md)
- [Estrategia](${site}/es/estrategia.md)
- [Carta y compromisos](${site}/es/carta-abierta.md)
- [Sobre y método](${site}/es/sobre.md)

## Evidence warning

The current Portuguese narrative distinguishes observed starting conditions from future scenario events in its notes and sources. It is a scenario, not a prediction. The earlier English edition retains two branches and must not be treated as the current translation. The Spanish edition translates the Portuguese narrative. The REDATA advocacy pages were retired; REDATA now appears only as a documented 2026 event inside the narrative and the evidence register.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
};
