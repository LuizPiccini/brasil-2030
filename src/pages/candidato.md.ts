import candidate from "../content/scenario-candidate-pt.md?raw";

export const GET = () => new Response(
  `# Brasil 2030: Energia para Escolher\n\nA inteligência artificial já está transformando o trabalho, a segurança e as relações entre países. O Brasil não está preparado para essas mudanças, e as decisões dos próximos anos terão consequências permanentes para o país.\n\nEscrevemos este cenário porque a trajetória brasileira nos preocupa. Nele, acompanhamos o Brasil até 2030 para mostrar o que pode acontecer se continuarmos ignorando ou errando as decisões importantes. Queremos reunir brasileiros em torno dessa discussão, entender nossas possibilidades e fazer das escolhas sobre inteligência artificial uma prioridade nacional.\n\n> Este é um cenário, não uma previsão. As personagens são fictícias; os acontecimentos futuros exploram escolhas e consequências possíveis. As fontes do ponto de partida estão nas notas.\n\nPágina: https://brasil-2030.piccini.app/candidato\n\n${candidate}`,
  { headers: {
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Disposition": "inline",
    "Cache-Control": "public, max-age=0, must-revalidate",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  } },
);
