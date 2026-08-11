/**
 * One-off: assign filterCategory from existing servicesArray tags.
 * Music Video services → music-videos; everything else → commercials.
 *
 * Usage:
 *   npx sanity exec scripts/assignFilterCategories.cjs --with-user-token
 *   npx sanity exec scripts/assignFilterCategories.cjs --with-user-token -- --dry-run
 */
const { getCliClient } = require('sanity/cli')

const client = getCliClient({ apiVersion: '2024-01-01' })
const dryRun = process.argv.includes('--dry-run')

async function main() {
  const projects = await client.fetch(`*[_type == "projects"]{
    _id,
    title,
    filterCategory,
    servicesArray
  }`)

  const normalize = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim()

  const classify = (project) => {
    const services = (project.servicesArray || []).map(normalize)
    if (services.some((service) => service.includes('music video'))) {
      return 'music-videos'
    }
    return 'commercials'
  }

  const updates = projects
    .map((project) => {
      const next = classify(project)
      return {
        id: project._id,
        title: project.title,
        from: project.filterCategory || null,
        to: next,
        changed: project.filterCategory !== next,
      }
    })
    .filter((row) => row.changed)

  console.log(
    dryRun
      ? `Dry run — would update ${updates.length}/${projects.length} projects:\n`
      : `Updating ${updates.length}/${projects.length} projects:\n`
  )

  for (const row of updates) {
    console.log(`- ${row.title}: ${row.from ?? '(none)'} → ${row.to}`)
  }

  if (dryRun || updates.length === 0) {
    return
  }

  const tx = updates.reduce(
    (transaction, row) =>
      transaction.patch(row.id, { set: { filterCategory: row.to } }),
    client.transaction()
  )

  await tx.commit()
  console.log(`\nDone. Patched ${updates.length} documents.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
