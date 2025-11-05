#!/usr/bin/env node
/**
 * VC Database CSV Generator
 * Generates a complete CSV file with VC contact information and personalized messaging
 */

const fs = require('fs');
const path = require('path');

// 15 NEW VCs TO ADD
const newVCs = [
    {'Firm Name': 'Boldstart Ventures', 'Tier': 'Tier 2', 'Priority': 36, 'Target Partner': 'Ed Sim', 'Partner Email': 'ed@boldstart.vc', 'General Email': 'info@boldstart.vc', 'Website': 'boldstart.vc', 'LinkedIn Profile': 'https://linkedin.com/in/edsim', 'Focus Area': 'Enterprise Infrastructure', 'Stage Focus': 'Seed/Series A', 'Typical Check Size': '$1-5M', 'Geographic Focus': 'US (NYC)', 'Relevant Portfolio Companies': 'Snyk, BigID, Kustomer, Front', 'Why Good Fit': 'Day 1 enterprise infrastructure investor, strong in security/data governance', 'Investment Thesis Match': 'Excellent - infrastructure-first investing, security focus'},
    {'Firm Name': 'CRV (Charles River Ventures)', 'Tier': 'Tier 2', 'Priority': 37, 'Target Partner': 'Reid Christian', 'Partner Email': 'reid@crv.com', 'General Email': 'info@crv.com', 'Website': 'crv.com', 'LinkedIn Profile': 'https://linkedin.com/in/reidchristian', 'Focus Area': 'Enterprise SaaS/Infrastructure', 'Stage Focus': 'Series A-B', 'Typical Check Size': '$10-30M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Vercel, Airtable, DoorDash', 'Why Good Fit': 'Platform companies enabling new workflows', 'Investment Thesis Match': 'Strong - infrastructure platforms'},
    {'Firm Name': 'Emergence Capital', 'Tier': 'Tier 2', 'Priority': 38, 'Target Partner': 'Santi Subotovsky', 'Partner Email': 'santi@emcap.com', 'General Email': 'info@emcap.com', 'Website': 'emcap.com', 'LinkedIn Profile': 'https://linkedin.com/in/santisubotovsky', 'Focus Area': 'Enterprise SaaS', 'Stage Focus': 'Series A-B', 'Typical Check Size': '$10-40M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Salesforce, Zoom, Box, Veeva', 'Why Good Fit': 'Category-defining enterprise platforms', 'Investment Thesis Match': 'Excellent - pioneered SaaS investing'},
    {'Firm Name': 'Storm Ventures', 'Tier': 'Tier 3', 'Priority': 39, 'Target Partner': 'Ryan Floyd', 'Partner Email': 'ryan@stormventures.com', 'General Email': 'info@stormventures.com', 'Website': 'stormventures.com', 'LinkedIn Profile': 'https://linkedin.com/in/ryanfloyd', 'Focus Area': 'B2B SaaS', 'Stage Focus': 'Series A', 'Typical Check Size': '$8-20M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Marketo, Responsys, Omniture', 'Why Good Fit': 'B2B infrastructure and data platforms', 'Investment Thesis Match': 'Good - enterprise data focus'},
    {'Firm Name': 'Madrona Venture Group', 'Tier': 'Tier 3', 'Priority': 40, 'Target Partner': 'Tim Porter', 'Partner Email': 'tim@madrona.com', 'General Email': 'info@madrona.com', 'Website': 'madrona.com', 'LinkedIn Profile': 'https://linkedin.com/in/timothyporter', 'Focus Area': 'Intelligent Applications', 'Stage Focus': 'Seed/Series A', 'Typical Check Size': '$5-15M', 'Geographic Focus': 'US (Seattle)', 'Relevant Portfolio Companies': 'Snowflake, Smartsheet, Tableau', 'Why Good Fit': 'Data infrastructure and intelligent apps', 'Investment Thesis Match': 'Strong - data platforms enabling intelligence'},
    {'Firm Name': 'Amplify Partners', 'Tier': 'Tier 2', 'Priority': 41, 'Target Partner': 'Renee Shah', 'Partner Email': 'renee@amplifypartners.com', 'General Email': 'info@amplifypartners.com', 'Website': 'amplifypartners.com', 'LinkedIn Profile': 'https://linkedin.com/in/reneeshah', 'Focus Area': 'Data/Infrastructure', 'Stage Focus': 'Seed/Series A', 'Typical Check Size': '$1-10M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Sentry, Monte Carlo, Chronosphere', 'Why Good Fit': 'Technical founders solving infrastructure problems', 'Investment Thesis Match': 'Excellent - deep technical infrastructure'},
    {'Firm Name': 'Work-Bench', 'Tier': 'Tier 3', 'Priority': 42, 'Target Partner': 'Jonathan Lehr', 'Partner Email': 'jonathan@work-bench.com', 'General Email': 'info@work-bench.com', 'Website': 'work-bench.com', 'LinkedIn Profile': 'https://linkedin.com/in/jonathanlehr', 'Focus Area': 'Enterprise Tech', 'Stage Focus': 'Seed/Series A', 'Typical Check Size': '$1-5M', 'Geographic Focus': 'US (NYC)', 'Relevant Portfolio Companies': 'Datadog, Cockroach Labs, SecurityScorecard', 'Why Good Fit': 'Enterprise infrastructure with F500 focus', 'Investment Thesis Match': 'Good - enterprise sales understanding'},
    {'Firm Name': 'Scale Venture Partners', 'Tier': 'Tier 3', 'Priority': 43, 'Target Partner': 'Ariel Tseitlin', 'Partner Email': 'ariel@scalevp.com', 'General Email': 'info@scalevp.com', 'Website': 'scalevp.com', 'LinkedIn Profile': 'https://linkedin.com/in/arieltseitlin', 'Focus Area': 'Cloud Infrastructure', 'Stage Focus': 'Series A-B', 'Typical Check Size': '$10-30M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Box, DocuSign, HubSpot', 'Why Good Fit': 'Growth stage enterprise infrastructure', 'Investment Thesis Match': 'Good - scaling enterprise platforms'},
    {'Firm Name': 'Costanoa Ventures', 'Tier': 'Tier 3', 'Priority': 44, 'Target Partner': 'Greg Sands', 'Partner Email': 'greg@costanoavc.com', 'General Email': 'info@costanoavc.com', 'Website': 'costanoavc.com', 'LinkedIn Profile': 'https://linkedin.com/in/gregsands', 'Focus Area': 'SaaS Infrastructure', 'Stage Focus': 'Seed/Series A', 'Typical Check Size': '$3-12M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Qumulo, Narvar', 'Why Good Fit': 'Technical infrastructure for enterprises', 'Investment Thesis Match': 'Good - infrastructure platforms'},
    {'Firm Name': 'FirstMark Capital', 'Tier': 'Tier 2', 'Priority': 45, 'Target Partner': 'Matt Turck', 'Partner Email': 'matt@firstmarkcap.com', 'General Email': 'info@firstmarkcap.com', 'Website': 'firstmarkcap.com', 'LinkedIn Profile': 'https://linkedin.com/in/mattturck', 'Focus Area': 'Data/AI Infrastructure', 'Stage Focus': 'Series A-B', 'Typical Check Size': '$10-25M', 'Geographic Focus': 'US (NYC)', 'Relevant Portfolio Companies': 'Airbnb, Pinterest, Shopify', 'Why Good Fit': 'Leading data infrastructure thinker (MAD landscape)', 'Investment Thesis Match': 'Excellent - deep data infrastructure understanding'},
    {'Firm Name': 'Redpoint Ventures', 'Tier': 'Tier 2', 'Priority': 46, 'Target Partner': 'Satish Dharmaraj', 'Partner Email': 'satish@redpoint.com', 'General Email': 'info@redpoint.com', 'Website': 'redpoint.com', 'LinkedIn Profile': 'https://linkedin.com/in/satishdharmaraj', 'Focus Area': 'Infrastructure', 'Stage Focus': 'Seed/Series A', 'Typical Check Size': '$5-20M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Snowflake, HashiCorp, Looker', 'Why Good Fit': 'Infrastructure platforms, former founder', 'Investment Thesis Match': 'Excellent - deep infrastructure expertise'},
    {'Firm Name': 'Sutter Hill Ventures', 'Tier': 'Tier 2', 'Priority': 47, 'Target Partner': 'Mike Speiser', 'Partner Email': 'mike@shv.com', 'General Email': 'info@shv.com', 'Website': 'shv.com', 'LinkedIn Profile': 'https://linkedin.com/in/mikespeiser', 'Focus Area': 'Infrastructure', 'Stage Focus': 'Series A', 'Typical Check Size': '$10-30M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Snowflake, Pure Storage', 'Why Good Fit': 'Deep infrastructure expertise, company building', 'Investment Thesis Match': 'Excellent - category-defining infrastructure'},
    {'Firm Name': 'Khosla Ventures', 'Tier': 'Tier 2', 'Priority': 48, 'Target Partner': 'Vinod Khosla', 'Partner Email': 'vinod@khoslaventures.com', 'General Email': 'info@khoslaventures.com', 'Website': 'khoslaventures.com', 'LinkedIn Profile': 'https://linkedin.com/in/vinodkhosla', 'Focus Area': 'Disruptive Technology', 'Stage Focus': 'Series A-B', 'Typical Check Size': '$10-50M', 'Geographic Focus': 'Global', 'Relevant Portfolio Companies': 'Square, Affirm, DoorDash', 'Why Good Fit': 'Contrarian bets on category-creating companies', 'Investment Thesis Match': 'Strong - big vision, technical depth'},
    {'Firm Name': 'Data Collective (DCVC)', 'Tier': 'Specialized', 'Priority': 49, 'Target Partner': 'Matt Ocko', 'Partner Email': 'matt@dcvc.com', 'General Email': 'info@dcvc.com', 'Website': 'dcvc.com', 'LinkedIn Profile': 'https://linkedin.com/in/mattocko', 'Focus Area': 'Deep Tech/Data', 'Stage Focus': 'Seed/Series A', 'Typical Check Size': '$3-15M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Premise, Orbital Insight, Rigetti', 'Why Good Fit': 'Deep technical understanding, data-centric', 'Investment Thesis Match': 'Excellent - computational technology focus'},
    {'Firm Name': 'GV (Google Ventures)', 'Tier': 'Tier 3', 'Priority': 50, 'Target Partner': 'Karim Faris', 'Partner Email': 'karim@gv.com', 'General Email': 'info@gv.com', 'Website': 'gv.com', 'LinkedIn Profile': 'https://linkedin.com/in/karimfaris', 'Focus Area': 'Enterprise/AI', 'Stage Focus': 'Series A-B', 'Typical Check Size': '$10-50M', 'Geographic Focus': 'US', 'Relevant Portfolio Companies': 'Stripe, Uber, Slack', 'Why Good Fit': 'Strategic value from Google, AI expertise', 'Investment Thesis Match': 'Good - enterprise platforms, strategic value'}
];

// MESSAGE GENERATOR
function generateMessaging(vc) {
    const firstName = vc['Target Partner'] ? vc['Target Partner'].split(' ')[0] : 'there';
    const firm = vc['Firm Name'];
    const focus = vc['Focus Area'];
    const portfolio = vc['Relevant Portfolio Companies'] || '';
    const whyFit = vc['Why Good Fit'] || '';

    const subjectMap = {
        'Enterprise Infrastructure': `Breaking the $50B Cross-Org AI Barrier (Patents Granted)`,
        'Data Infrastructure': `GDPR-Compliant Cross-Org AI Infrastructure (Patented)`,
        'AI + Infrastructure': `The SDN Moment for Cross-Org AI`,
        'Enterprise AI': `Category-Defining Enterprise AI Infrastructure`,
        'Cloud Infrastructure': `Infrastructure-as-a-Platform for Cross-Org AI`,
        'Systems Solutions': `The Cross-Organizational Palantir Moment`,
        'Intelligent Applications': `Enabling Intelligence Across Organizational Boundaries`,
        'Enterprise SaaS': `The Missing SaaS Layer: Cross-Org AI Coordination`,
        'Enterprise SaaS/Infrastructure': `Infrastructure-as-a-Platform for Cross-Org AI`,
        'Data/Infrastructure': `Making Data Intelligence Work Across Organizations`,
        'Deep Tech/Data': `Computational Infrastructure for Cross-Org AI`,
        'Disruptive Technology': `Category-Creating Cross-Org AI Infrastructure`,
        'B2B SaaS': `Unlocking B2B Intelligence Across Organizations`,
        'Enterprise Tech': `Enterprise-Grade Cross-Org AI Infrastructure`,
        'SaaS Infrastructure': `The Platform Layer for Cross-Org AI`,
        'Data/AI Infrastructure': `Making Data Intelligence Work Across Organizations`,
        'Infrastructure': `Breaking the $50B Cross-Org AI Barrier`,
        'Enterprise/AI': `Enterprise AI Without Boundaries`
    };

    const subject = subjectMap[focus] || `Unlocking Cross-Organizational Agentic AI`;

    const initial = `${firstName},

Traverso has solved the fundamental blocker preventing cross-organizational agentic AI: atomic data access without data movement.

The problem: Over 90% of Fortune 2000 depend on value chains, but their AI agents can't collaborate because private data can't be shared or moved. This coordination failure costs billions annually.

Our patented Self-Governing Data Mesh enables:
• Zero-trust atomic data access across organizational boundaries
• Real-time agentic AI execution within each partner's security perimeter
• Full regulatory compliance (GDPR, HIPAA, SOX)
• Sub-second latency vs hours/days for alternatives

We're unlocking a $54-99B market with 2 granted patents, 2 more filed, and design partnerships with F500 manufacturers.

${whyFit ? whyFit + '. This' : firm + '\'s ' + focus + ' focus'} aligns perfectly with this infrastructure opportunity. Would love 15 minutes to show you how we're different from federated learning, confidential compute, and clean rooms.

Best,
Randy
CEO, Traverso`;

    const followup1 = `${firstName},

Following up on the cross-org AI infrastructure opportunity.

Quick context on why this matters now: The agentic AI wave is hitting enterprise, but 90%+ of use cases require cross-organizational coordination. Supply chains, healthcare networks, financial ecosystems - all blocked by the same problem.

Existing approaches don't work:
• Federated Learning: Training ≠ operational execution
• Confidential Computing: Data still moves to enclaves
• Clean Rooms: Stale data, coarse permissions, centralized risk
• APIs/EDI: Too slow for real-time agents (1000s of calls/second)

Our stronghold architecture brings computation TO data (not data to computation). Agents execute within each organization's security perimeter with granular, cell-level access control.

One F500 design partner is targeting 30% reduction in supply chain buffer inventory ($2B+ impact) through real-time cross-supplier coordination.

Can I send our technical competitive analysis? It details why alternatives fail for this use case.

Randy`;

    let portfolioHook = '';
    if (portfolio) {
        const firstPortfolio = portfolio.split(',')[0].trim();
        portfolioHook = `Your ${firstPortfolio} investment shows you understand platform shifts that enable new application categories. `;
    }

    const followup2 = `${firstName},

Last note - wanted to share why ${firm}'s insights align with what we're building.

${portfolioHook}We're enabling cross-organizational agentic AI - a category that's theoretically huge but practically blocked today.

Use cases that become possible:
• Supply chains operating as single intelligent systems
• Healthcare networks with real-time care coordination
• Financial ecosystems with instant fraud detection
• Manufacturing networks with predictive maintenance

All require real-time AI coordination across organizational boundaries. All impossible with today's infrastructure.

Market timing is perfect - enterprises are deploying agents internally now and immediately hitting the cross-org wall.

Happy to start with just 15 minutes or send our deck if that's easier.

Randy`;

    return { subject, initial, followup1, followup2 };
}

// Function to escape CSV values
function escapeCSV(value) {
    const val = String(value || '');
    // Escape quotes and wrap if contains comma/newline/quote
    if (val.includes(',') || val.includes('\n') || val.includes('"')) {
        return '"' + val.replace(/"/g, '""') + '"';
    }
    return val;
}

// Generate complete data
console.log('Generating VC database with messaging...\n');

const completeData = newVCs.map(vc => {
    const msg = generateMessaging(vc);
    return {
        'Firm Name': vc['Firm Name'],
        'Tier': vc['Tier'],
        'Priority': vc['Priority'],
        'Target Partner': vc['Target Partner'],
        'Partner Email': vc['Partner Email'],
        'General Email': vc['General Email'],
        'Website': vc['Website'],
        'LinkedIn Profile': vc['LinkedIn Profile'],
        'Focus Area': vc['Focus Area'],
        'Stage Focus': vc['Stage Focus'],
        'Typical Check Size': vc['Typical Check Size'],
        'Geographic Focus': vc['Geographic Focus'],
        'Relevant Portfolio Companies': vc['Relevant Portfolio Companies'],
        'Why Good Fit': vc['Why Good Fit'],
        'Investment Thesis Match': vc['Investment Thesis Match'],
        'Email Subject Line': msg.subject,
        'Email Body (Initial)': msg.initial,
        'Email Body (Follow-up 1)': msg.followup1,
        'Email Body (Follow-up 2)': msg.followup2,
        'Contact Status': vc['Contact Status'] || 'Not Contacted',
        'First Outreach Date': vc['First Outreach Date'] || '',
        'Follow Up Date': vc['Follow Up Date'] || '',
        'Response Status': vc['Response Status'] || '',
        'Next Action': vc['Next Action'] || 'Prepare for initial outreach',
        'Notes': vc['Notes'] || ''
    };
});

// Generate CSV
const headers = Object.keys(completeData[0]);
let csv = headers.map(h => escapeCSV(h)).join(',') + '\n';

completeData.forEach(row => {
    const values = headers.map(h => escapeCSV(row[h]));
    csv += values.join(',') + '\n';
});

// Write to file
const outputPath = path.join(__dirname, 'traverso_vc_database_complete.csv');
fs.writeFileSync(outputPath, csv, 'utf8');

console.log('✅ COMPLETE CSV GENERATED');
console.log(`📊 ${completeData.length} VCs with full messaging`);
console.log(`📄 File size: ${csv.length} characters`);
console.log(`💾 Saved to: ${outputPath}\n`);

// Also create a README explaining the output
const readme = `# Traverso VC Database

## Generated Files

- **traverso_vc_database_complete.csv**: Complete VC contact database with personalized messaging

## Database Contents

This CSV contains ${completeData.length} venture capital firms with:
- Contact information (partner names, emails, LinkedIn profiles)
- Firm details (focus area, stage, check size, geography)
- Investment thesis match analysis
- Personalized email templates (initial + 2 follow-ups)
- Tracking fields (contact status, dates, next actions)

## Usage

1. Import the CSV into your CRM or email outreach tool
2. Review personalized messaging for each VC
3. Customize emails as needed based on recent news or portfolio updates
4. Track outreach status using the Contact Status and Response Status fields

## Email Sequence

Each VC has 3 pre-written emails:
1. **Initial Outreach**: Problem statement + solution + call to action
2. **Follow-up 1**: Technical depth + competitive differentiation
3. **Follow-up 2**: Market timing + use cases + soft close

## Prioritization

VCs are categorized by tier:
- **Tier 2**: Strong infrastructure focus, excellent thesis match
- **Tier 3**: Good fit, slightly broader focus
- **Specialized**: Deep tech/specific domain expertise

## Generation Details

- Generated: ${new Date().toISOString()}
- Script: generate-vc-database.js
- Total VCs: ${completeData.length}
`;

fs.writeFileSync(path.join(__dirname, 'VC_DATABASE_README.md'), readme, 'utf8');

console.log('📋 Also created: VC_DATABASE_README.md\n');
console.log('To view the CSV:');
console.log('  cat traverso_vc_database_complete.csv\n');
