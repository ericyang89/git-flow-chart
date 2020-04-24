import * as React from "react";
import { storiesOf } from "@storybook/react";
import { createGitgraph, templateExtend } from "@gitgraph/js";

import { GraphContainer } from "../helpers";

storiesOf("gitgraph-js/9. 111 usage", module).add("default", () => (
  <GraphContainer>
    {(graphContainer) => {
      const options = {
        orientation: "horizontal",
        mode: "compact",
        template: templateExtend("metro", {
          colors: ["gray", "orange"],

          branch: {
            lineWidth: 2,
            spacing: 200,
          },
          commit: {
            dot: { size: 40, color: "#999999" },
            spacing: 180,
            message: { display: true },
          },
        }),
      };

      // Instantiate the graph.
      const gitgraph = createGitgraph(graphContainer, options);

      const branchOption = {
        style: {
          label: {
            color: "#ffffff",
            strokeColor: "#ffffff",
          },
        },
      };

      // Simulate git commands with Gitgraph API.
      const master = gitgraph.branch({
        name: "any",
        ...branchOption,
      });

      const commitStyle = {
        dot: { color: "#2db8ff" },
      };
      const commitOption = {
        dotText: "通过1",
        body: "this is body",
        // renderMessage: "this is renderMessage",
        style: commitStyle,
      };

      const newCommitOption = {
        dotText: "待审批",
      };

      master.commit({
        subject: "开始",
        ...commitOption,
      });
      master.commit({
        subject: "直接上级审批666 很长的测试",
        ...commitOption,
      });

      const develop = gitgraph.branch({
        name: "d",
        ...branchOption,
      });
      master.commit({
        subject: "业务部门审批",
        ...commitOption,
      });
      develop.commit({
        subject: "提交发票",
        ...commitOption,
      });
      develop.commit({
        subject: "财务审批",
        ...commitOption,
      });
      develop.commit({ ...newCommitOption, subject: "财务审批1" });
      develop.commit({ ...newCommitOption, subject: "部门领导审批2" });
      master.merge({
        branch: develop,
        commitOptions: { ...newCommitOption, subject: "部门领导审批2" },
      });
      master.commit({ ...newCommitOption, subject: "ceo审批" });
      master.commit({ ...newCommitOption, subject: "结束" });
    }}
  </GraphContainer>
));
