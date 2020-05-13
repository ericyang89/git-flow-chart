import { Commit } from "@gitgraph/core";

import { createG, createPath, createText } from "./svg-elements";

export { createTooltip, PADDING };

const PADDING = 10;
const OFFSET = 15;
const lineOffset=20



function createTooltip(commit: Commit): SVGElement {
  const path = createPath({ d: "", fill: "#EEE" });
  const commitSize = commit.style.dot.size * 2;
  
  const textSubject = createText({
    translate: { x:commitSize/2, y: 0+commitSize/2+OFFSET },
    content: `${commit.subject}`,
    fill: "#333",
    anchor:"middle",
  });  

  const bodySubject = createText({
    translate: { x:commitSize/2, y: 0+commitSize/2+OFFSET+ lineOffset},
    content: `${commit.body}`,
    fill: "#999",
    anchor:"middle",
  });

  const tooltip = createG({
    translate: { x: 0, y: commitSize / 2 },
    children: [path],
  });

  // const observer = new MutationObserver(() => {
  //   const { width } = text.getBBox();

  //   const radius = 5;
  //   const boxHeight = 50;
  //   const boxWidth = OFFSET + width + 2 * PADDING;

  //   const pathD = [
  //     `M ${OFFSET},${OFFSET}`,
  //     `L ${OFFSET},${OFFSET}`,
  //     `V ${boxHeight / 2 - radius}`,
  //     `Q ${OFFSET},${boxHeight / 2} ${OFFSET + radius},${boxHeight / 2}`,
  //     `H ${boxWidth - radius}`,
  //     `Q ${boxWidth},${boxHeight / 2} ${boxWidth},${boxHeight / 2 - radius}`,
  //     `V -${boxHeight / 2 - radius}`,
  //     `Q ${boxWidth},-${boxHeight / 2} ${boxWidth - radius},-${boxHeight / 2}`,
  //     `H ${OFFSET + radius}`,
  //     `Q ${OFFSET},-${boxHeight / 2} ${OFFSET},-${boxHeight / 2 - radius}`,
  //     `V -${OFFSET}`,
  //     "z",
  //   ].join(" ");

  //   // Ideally, it would be great to refactor these behavior into SVG elements.
  //   // rect.setAttribute("width", boxWidth.toString());
  //   path.setAttribute("d", pathD.toString());
  // });

  // observer.observe(tooltip, {
  //   attributes: false,
  //   subtree: false,
  //   childList: true,
  // });

  tooltip.appendChild(textSubject);
  tooltip.appendChild(bodySubject);

  return tooltip;
}
