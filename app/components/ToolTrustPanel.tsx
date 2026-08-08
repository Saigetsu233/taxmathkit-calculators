import type { TaxTool } from "../lib/tools";
import type { PriorityToolContent } from "../lib/priority-content";

type ToolTrustPanelProps = {
  tool: TaxTool;
  priority?: PriorityToolContent;
};

export function ToolTrustPanel({ tool, priority }: ToolTrustPanelProps) {
  const lead = priority?.searchLead ?? tool.description;

  return (
    <section className="shell tool-trust-panel" aria-label="How to use this calculator">
      <div className="tool-trust-heading">
        <div>
          <span className="eyebrow">One consistent workflow</span>
          <h2>Calculate, inspect, keep a copy.</h2>
        </div>
        <p>{lead} Start with the example, then change only the inputs that match your situation.</p>
      </div>
      <ol className="tool-trust-steps">
        <li>
          <span>01</span>
          <div><strong>Start with a visible example</strong><p>The calculator opens with realistic values so you can see the result before entering personal numbers.</p></div>
        </li>
        <li>
          <span>02</span>
          <div><strong>Check the math and boundaries</strong><p>Formula, assumptions, exclusions, tax year and primary sources stay next to the result.</p></div>
        </li>
        <li>
          <span>03</span>
          <div><strong>Save or share your estimate</strong><p>Copy the result, print it, or save inputs locally. Nothing is uploaded and no account is required.</p></div>
        </li>
      </ol>
      <div className="tool-trust-badges" aria-label="TaxMathKit trust commitments">
        <span>Updated {tool.updated}</span>
        <span>Primary sources linked</span>
        <span>Browser-only inputs</span>
        <span>Planning estimate, not tax advice</span>
      </div>
    </section>
  );
}
