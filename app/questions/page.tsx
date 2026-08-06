import type { Metadata } from "next";
import Link from "next/link";
import { questions } from "../lib/questions";

export const metadata: Metadata = {
  title: "Tax Questions, Direct Answers & Calculators",
  description: "Find a direct answer to common 1099, freelance, paycheck, quarterly-tax, sales-tax, and self-employment questions, then run the matching calculator.",
  alternates: { canonical: "/questions" },
};

export default function QuestionsPage() {
  return (
    <div className="shell content-page question-index-page">
      <span className="eyebrow">Search by the question, not the tool name</span>
      <h1>Tax answers that lead straight to the right calculator.</h1>
      <p className="lead">These pages start with the wording people use when they need help, show the short answer and assumptions, then open the matching TaxMathKit calculator.</p>
      <div className="question-card-grid">
        {questions.map((question) => <Link className="question-card" href={`/questions/${question.slug}`} key={question.slug}><span className="eyebrow">{question.category}</span><h2>{question.title}</h2><p>{question.description}</p><strong>Read the answer and calculate →</strong></Link>)}
      </div>
    </div>
  );
}
