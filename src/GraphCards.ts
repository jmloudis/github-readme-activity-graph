import { createGraph } from "./createChart";
import { colors, graphArgs } from "../interfaces/interface";
import { graphSvg } from "./svgs";

export class Card {
  height: number;
  width: number;
  colors: colors;
  title: string;
  area: boolean;
  constructor(
    height: number,
    width: number,
    colors: colors,
    title: string = "",
    area: boolean = false
  ) {
    this.height = height;
    this.width = width;
    this.colors = colors;
    this.title = title;
    this.area = area;
  }

  async chart(contributions: number[]): Promise<string> {
    const options = {
      width: this.width,
      height: this.height,
      axisY: {
        title: "Contributions",
        onlyInteger: true,
        offset: 70,
        labelOffset: {
          y: 4.5,
        },
      },
      axisX: {
        title: "Days",
        offset: 50,
        labelOffset: {
          x: -4.5,
        },
      },
      chartPadding: {
        top: 80,
        right: 50,
        bottom: 20,
        left: 20,
      },
      showArea: this.area,
      fullWidth: true,
    };

    const line: Promise<string> = await createGraph("line", options, {
      labels: Array.from(Array(contributions.length).keys(), (day) => day + 1),
      series: [{ value: contributions }],
    });

    const args: graphArgs = {
      height: this.height,
      width: this.width,
      colors: this.colors,
      title: this.title,
      line,
    };

    return graphSvg(args);
  }
}
