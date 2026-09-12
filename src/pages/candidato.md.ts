import candidate from "../content/scenario-candidate-pt.md?raw";

export const GET = () => new Response(
  `# Brasil 2030: Energia para Escolher\n\n> Versão candidata de 12 de setembro de 2026. Baseada na proposta de Danilo; nova redação preparada com assistência de IA a pedido de Luiz Piccini. Aprovação coletiva pendente. Disponível apenas em português.\n\nPágina: https://brasil-2030.piccini.app/candidato\n\n${candidate}`,
  { headers: {
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Disposition": "inline",
    "Cache-Control": "public, max-age=0, must-revalidate",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  } },
);
