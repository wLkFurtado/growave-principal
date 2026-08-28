import { useEffect, useRef, useState } from 'react';
import PortfolioVideoCard from './PortfolioVideoCard';

const GAP = 16;

// Colunas por largura disponivel — medimos o container, nao a janela,
// porque o grid roda tanto na home quanto na /portfolio, com larguras diferentes.
function colunasPara(largura) {
  if (largura < 560) return 1;
  if (largura < 900) return 2;
  if (largura < 1080) return 3;
  return 4;
}

export default function PortfolioGrid({ videos, onOpen }) {
  const ref = useRef(null);
  const [cols, setCols] = useState(4);
  // A altura da linha e a largura de uma coluna. Com isso, um card 9:16 ocupa
  // 1 coluna x 2 linhas e um 16:9 ocupa 2 colunas x 1 linha — os dois viram
  // blocos que se encaixam sem deixar buraco.
  const [rowH, setRowH] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const medir = () => {
      const largura = el.clientWidth;
      if (!largura) return;
      const c = colunasPara(largura);
      setCols(c);
      setRowH((largura - GAP * (c - 1)) / c);
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridAutoRows: rowH ? `${rowH}px` : 'auto',
        gridAutoFlow: 'dense', // deixa o navegador preencher os vaos
        gap: GAP,
      }}
    >
      {videos.map((video, index) => {
        const deitado = video.width && video.height ? video.width > video.height : false;
        // Deitado ocupa 2 colunas; em tela de 1 coluna nao ha 2 para ocupar.
        const spanCols = deitado ? Math.min(2, cols) : 1;
        const spanRows = deitado ? 1 : 2;

        return (
          <div
            key={video.key}
            style={{ gridColumn: `span ${spanCols}`, gridRow: `span ${spanRows}`, minHeight: 0 }}
          >
            <PortfolioVideoCard video={video} onOpen={() => onOpen(index)} />
          </div>
        );
      })}
    </div>
  );
}
