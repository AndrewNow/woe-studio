/**
 * Migrate Motion string filterCategory values to filterCategory document refs.
 * Creates Commercials / Music Videos docs for the motion section if missing.
 *
 * Usage:
 *   npx sanity exec scripts/migrateFilterCategoriesToRefs.cjs --with-user-token
 *   npx sanity exec scripts/migrateFilterCategoriesToRefs.cjs --with-user-token -- --dry-run
 */
const {getCliClient} = require('sanity/cli')

const client = getCliClient({apiVersion: '2024-01-01'})
const dryRun = process.argv.includes('--dry-run')

const SEED = [
  {title: 'Commercials', slug: 'commercials', section: 'motion'},
  {title: 'Music Videos', slug: 'music-videos', section: 'motion'},
]

async function ensureCategory({title, slug, section}) {
  const existing = await client.fetch(
    `*[_type == "filterCategory" && slug.current == $slug && section == $section][0]{ _id }`,
    {slug, section}
  )

  if (existing?._id) {
    return existing._id
  }

  if (dryRun) {
    console.log(`Would create filterCategory: ${title} (${section}/${slug})`)
    return `draft.${slug}`
  }

  const created = await client.create({
    _type: 'filterCategory',
    title,
    section,
    slug: {_type: 'slug', current: slug},
  })
  console.log(`Created filterCategory: ${title} → ${created._id}`)
  return created._id
}

async function main() {
  const idBySlug = {}
  for (const seed of SEED) {
    idBySlug[seed.slug] = await ensureCategory(seed)
  }

  const projects = await client.fetch(`*[_type == "projects"]{
    _id,
    title,
    filterCategory
  }`)

  const updates = []

  for (const project of projects) {
    const raw = project.filterCategory
    // Already a reference
    if (raw && typeof raw === 'object' && raw._ref) {
      continue
    }

    let slug = null
    if (typeof raw === 'string') {
      slug = raw
    } else if (!raw) {
      // Fall back from missing tags using title heuristics later if needed
      slug = null
    }

    if (!slug || !idBySlug[slug]) {
      console.log(`Skipping (no mappable category): ${project.title}`)
      continue
    }

    updates.push({
      id: project._id,
      title: project.title,
      from: slug,
      to: idBySlug[slug],
    })
  }

  console.log(
    dryRun
      ? `\nDry run — would patch ${updates.length} projects:\n`
      : `\nPatching ${updates.length} projects:\n`
  )

  for (const row of updates) {
    console.log(`- ${row.title}: ${row.from} → ref:${row.to}`)
  }

  if (dryRun || updates.length === 0) {
    return
  }

  const tx = updates.reduce(
    (transaction, row) =>
      transaction.patch(row.id, {
        set: {
          filterCategory: {_type: 'reference', _ref: row.to},
        },
      }),
    client.transaction()
  )

  await tx.commit()
  console.log(`\nDone. Patched ${updates.length} documents.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
