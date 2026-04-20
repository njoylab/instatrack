import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InstaTrack API Docs',
  description: 'Public discovery documentation for InstaTrack metadata endpoints and agent-facing static resources.',
};

const baseUrl = 'https://instatrack.njoylab.com';

export default function ApiDocsPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 md:px-8">
      <h1 className="text-4xl font-bold tracking-tight">InstaTrack API Docs</h1>
      <p className="mt-4 text-muted-foreground">
        InstaTrack is a client-side application. The resources below are static discovery documents for agents and developers.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">Static discovery resources</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm sm:text-base">
          <li><code>{baseUrl}/.well-known/api-catalog</code> publishes the API catalog.</li>
          <li><code>{baseUrl}/api/openapi.json</code> publishes the OpenAPI description.</li>
          <li><code>{baseUrl}/api/status.json</code> publishes a static health document.</li>
          <li><code>{baseUrl}/.well-known/agent-skills/index.json</code> publishes the agent skills index.</li>
          <li><code>{baseUrl}/agent/home.md</code> publishes a markdown version of the homepage for static consumers.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">Static hosting note</h2>
        <p className="text-muted-foreground">
          RFC 8288 response headers and true <code>Accept: text/markdown</code> negotiation require CDN or hosting-layer configuration.
          This repo keeps the site static and ships the files those layers can point to.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">WebMCP note</h2>
        <p className="text-muted-foreground">
          InstaTrack includes an experimental browser-side WebMCP integration for opening the import dialog, opening the
          restore dialog, and navigating to the export guide. This is an optional client-side enhancement only: it does
          not expose a standalone MCP server, it works only in compatible browsers or agents, and it is available only
          while the page is open.
        </p>
      </section>
    </main>
  );
}
