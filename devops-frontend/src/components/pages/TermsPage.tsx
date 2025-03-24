import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
      
      <div className="space-y-8 prose prose-lg">
        <section>
          <p className="text-gray-600 mb-8">
            Last updated: March 15, 2024
          </p>

          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.</li>
            <li>This is the grant of a license, not a transfer of title.</li>
            <li>This license shall automatically terminate if you violate any of these restrictions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>The materials on this website are provided on an 'as is' basis.</li>
            <li>We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
          <p>
            In no event shall we or our suppliers be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption)
            arising out of the use or inability to use the materials on our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Revisions and Errata</h2>
          <p>
            The materials appearing on our website could include technical, typographical, or
            photographic errors. We do not warrant that any of the materials on our website
            are accurate, complete or current.
          </p>
        </section>
      </div>
    </div>
  );
};