#!/usr/bin/env node

/**
 * audit-seo.js
 * Comprehensive SEO, Structured Data, Robots.txt & Agentic (llms.txt) Audit Script for knowu.app
 */

const fs = require('fs');
const path = require('path');

const siteDir = path.resolve(__dirname, '../_site');

if (!fs.existsSync(siteDir)) {
  console.error(`Error: _site directory does not exist at ${siteDir}. Run jekyll build first.`);
  process.exit(1);
}

let totalErrors = 0;
let totalWarnings = 0;

function assert(condition, message, isWarning = false) {
  if (!condition) {
    if (isWarning) {
      console.warn(`  ⚠️  WARNING: ${message}`);
      totalWarnings++;
    } else {
      console.error(`  ❌ ERROR: ${message}`);
      totalErrors++;
    }
  }
}

console.log('================================================================');
console.log('🔍 KnowU SEO & AI/Agentic Browsing Audit');
console.log('================================================================\n');

// 1. Audit robots.txt
console.log('--- 1. Auditing robots.txt ---');
const robotsPath = path.join(siteDir, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt must exist in _site');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  assert(!robotsContent.includes('<!DOCTYPE html>'), 'robots.txt must not contain HTML');
  assert(!robotsContent.includes('<html'), 'robots.txt must not contain HTML tags');
  
  // RFC 9309 check: only single User-agent: * block
  const starMatches = robotsContent.match(/^User-agent:\s*\*/gmi) || [];
  assert(starMatches.length === 1, `robots.txt should have exactly 1 'User-agent: *' record block, found ${starMatches.length}`);
  
  // Crawl-delay check: should not use non-standard Crawl-delay
  assert(!robotsContent.toLowerCase().includes('crawl-delay'), 'robots.txt should not use non-standard Crawl-delay');
  
  // Sitemap reference
  assert(/Sitemap:\s*https:\/\/knowu\.app\/sitemap\.xml/i.test(robotsContent), 'robots.txt must reference sitemap.xml');
  
  // AI Crawler directives
  const aiBots = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot-Extended', 'Google-Extended'];
  aiBots.forEach(bot => {
    assert(new RegExp(`User-agent:\\s*${bot}`, 'i').test(robotsContent), `robots.txt should define rules for AI crawler ${bot}`);
  });
  console.log('  ✅ robots.txt verified (RFC 9309 compliant, AI crawler directives present, sitemap linked)');
}
console.log();

// 2. Audit llms.txt and llms-full.txt
console.log('--- 2. Auditing AI / Agentic Standards (llms.txt & llms-full.txt) ---');
const llmsPath = path.join(siteDir, 'llms.txt');
assert(fs.existsSync(llmsPath), 'llms.txt must exist in _site');
if (fs.existsSync(llmsPath)) {
  const llmsContent = fs.readFileSync(llmsPath, 'utf8');
  const lines = llmsContent.split('\n').filter(l => l.trim().length > 0);
  
  // Must start with H1 # Title
  assert(lines[0].startsWith('# KnowU'), 'llms.txt must start with "# KnowU" H1 header');
  
  // Blockquote summary
  assert(lines.some(l => l.startsWith('> ')), 'llms.txt must contain a blockquote summary ("> ...")');
  
  // Markdown links with descriptions
  const linkMatches = llmsContent.match(/- \[(.*?)\]\((.*?)\):\s*(.+)/g) || [];
  assert(linkMatches.length >= 5, `llms.txt must contain structured markdown links (- [Title](url): desc), found ${linkMatches.length}`);
  
  // Must link to llms-full.txt
  assert(llmsContent.includes('llms-full.txt'), 'llms.txt should link to llms-full.txt');
  console.log(`  ✅ llms.txt verified (${linkMatches.length} structured resources found)`);
}

const llmsFullPath = path.join(siteDir, 'llms-full.txt');
assert(fs.existsSync(llmsFullPath), 'llms-full.txt must exist in _site');
if (fs.existsSync(llmsFullPath)) {
  const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf8');
  assert(llmsFullContent.startsWith('# KnowU'), 'llms-full.txt must start with "# KnowU" H1 header');
  assert(llmsFullContent.includes('MBTI'), 'llms-full.txt should describe MBTI');
  assert(llmsFullContent.includes('DISC'), 'llms-full.txt should describe DISC');
  assert(llmsFullContent.includes('Big Five'), 'llms-full.txt should describe Big Five');
  assert(llmsFullContent.includes('Moral Compass'), 'llms-full.txt should describe Moral Compass');
  assert(llmsFullContent.includes('GROW'), 'llms-full.txt should describe GROW coaching');
  assert(llmsFullContent.includes('Glasl'), 'llms-full.txt should describe Glasl conflict model');
  console.log('  ✅ llms-full.txt verified (comprehensive psychological and feature context)');
}
console.log();

// 3. Audit sitemap.xml
console.log('--- 3. Auditing sitemap.xml ---');
const sitemapPath = path.join(siteDir, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml must exist in _site');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  assert(sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>'), 'sitemap.xml must have standard XML declaration');
  assert(sitemapContent.includes('<loc>https://knowu.app/</loc>'), 'sitemap.xml must include home URL');
  assert(!sitemapContent.includes('<loc>https://knowu.app/404.html</loc>'), 'sitemap.xml must NOT include 404 page');
  console.log('  ✅ sitemap.xml verified');
}
console.log();

// 4. Audit all HTML pages
console.log('--- 4. Auditing Generated HTML Pages ---');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else if (f.endsWith('.html')) {
      callback(fullPath);
    }
  });
}

const htmlPages = [];
walkDir(siteDir, p => htmlPages.push(p));

htmlPages.forEach(filePath => {
  const relPath = path.relative(siteDir, filePath);
  const html = fs.readFileSync(filePath, 'utf8');
  const is404 = relPath === '404.html';
  
  // Document Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/is);
  assert(titleMatch && titleMatch[1].trim().length > 0, `${relPath}: Missing or empty <title>`);
  
  // Meta Description
  const descMatch = html.match(/<meta\s+name=["\x27]description["\x27]\s+content=["\x27](.*?)["\x27]/is) ||
                    html.match(/<meta\s+content=["\x27](.*?)["\x27]\s+name=["\x27]description["\x27]/is);
  assert(descMatch && descMatch[1].trim().length > 0, `${relPath}: Missing or empty <meta name="description">`);
  
  // Canonical URL
  const canonMatch = html.match(/<link\s+rel=["\x27]canonical["\x27]\s+href=["\x27](.*?)["\x27]/is) ||
                     html.match(/<link\s+href=["\x27](.*?)["\x27]\s+rel=["\x27]canonical["\x27]/is);
  assert(canonMatch && canonMatch[1].trim().length > 0, `${relPath}: Missing or empty <link rel="canonical">`);
  
  // Heading Hierarchy: Exactly one H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  assert(h1Matches.length === 1, `${relPath}: Expected exactly 1 <h1>, found ${h1Matches.length} (${h1Matches.map(h => h.replace(/<[^>]+>/g, '').trim()).join(' | ')})`);
  
  // Open Graph and Twitter Card tags
  assert(/<meta\s+property=["\x27]og:title["\x27]/i.test(html), `${relPath}: Missing og:title`);
  assert(/<meta\s+property=["\x27]og:description["\x27]/i.test(html), `${relPath}: Missing og:description`);
  assert(/<meta\s+property=["\x27]og:image["\x27]/i.test(html), `${relPath}: Missing og:image`);
  assert(/<meta\s+property=["\x27]og:url["\x27]/i.test(html), `${relPath}: Missing og:url`);
  assert(/<meta\s+name=["\x27]twitter:card["\x27]/i.test(html), `${relPath}: Missing twitter:card`);
  
  // Agentic link tags in <head>
  assert(html.includes('rel="alternate" type="text/markdown"'), `${relPath}: Missing llms.txt autodiscovery link tag`);
  
  // Robots meta
  if (is404) {
    assert(/<meta\s+name=["\x27]robots["\x27]\s+content=["\x27]noindex,\s*nofollow["\x27]/i.test(html), `${relPath}: 404 page should have noindex robots directive`);
  } else {
    assert(/<meta\s+name=["\x27]robots["\x27]\s+content=["\x27]index,\s*follow["\x27]/i.test(html), `${relPath}: Should have index, follow robots directive`);
  }

  // Schema.org JSON-LD
  const jsonLdMatch = html.match(/<script\s+type=["\x27]application\/ld\+json["\x27]>([\s\S]*?)<\/script>/i);
  assert(jsonLdMatch !== null, `${relPath}: Missing JSON-LD structured data`);
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      assert(parsed['@context'] === 'https://schema.org', `${relPath}: JSON-LD context should be https://schema.org`);
    } catch (e) {
      assert(false, `${relPath}: Malformed JSON-LD structured data: ${e.message}`);
    }
  }

  // Image alt attributes
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  imgMatches.forEach(img => {
    assert(/alt=["\x27][^"\x27]*["\x27]/i.test(img), `${relPath}: Image missing alt: ${img.slice(0, 50)}...`);
  });

  console.log(`  ✅ ${relPath} (H1: "${h1Matches.length === 1 ? h1Matches[0].replace(/<[^>]+>/g, '').trim().slice(0, 40) : 'N/A'}")`);
});

console.log('\n================================================================');
if (totalErrors === 0) {
  console.log(`🎉 ALL AUDITS PASSED! Total Errors: ${totalErrors}, Warnings: ${totalWarnings}`);
  process.exit(0);
} else {
  console.error(`❌ AUDIT FAILED! Total Errors: ${totalErrors}, Warnings: ${totalWarnings}`);
  process.exit(1);
}
