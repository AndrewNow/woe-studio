/**
 * Backfill filterCategory.sections from legacy `section` string.
 *
 * Usage:
 *   ./node_modules/.bin/sanity exec scripts/backfillFilterSections.cjs --with-user-token
 *   ./node_modules/.bin/sanity exec scripts/backfillFilterSections.cjs --with-user-token -- --dry-run
 */
const {getCliClient} = require('sanity/cli')

const client = getCliClient({apiVersion: '2024-01-01'})
const dryRun = process.argv.includes('--dry-run')

async function main() {
  const docs = await client.fetch(`*[_type == "filterCategory"]{
    _id,
    title,
    section,
    sections
  }`)

  const needing = docs.filter((doc) => {
    const hasSections = Array.isArray(doc.sections) && doc.sections.length > 0
    return !hasSections && (doc.section === 'motion' || doc.section === 'stills')
  })

  if (!needing.length) {
    console.log('Nothing to backfill — all filter categories already have sections.')
    return
  }

  console.log(`Backfilling sections on ${needing.length} categor(ies)…`)
  let tx = client.transaction()
  for (const doc of needing) {
    console.log(`- ${doc.title}: section "${doc.section}" → sections ["${doc.section}"]`)
    if (!dryRun) {
      tx = tx.patch(doc._id, {set: {sections: [doc.section]}})
    }
  }

  if (dryRun) {
    console.log('Dry run — no writes.')
    return
  }

  await tx.commit()
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
