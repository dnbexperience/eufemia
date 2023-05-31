// Finds current index name for the Algolia search
const getIndexName = (currentBranch) => {
  if (process.env.NODE_ENV !== 'production' || !global.isCI) {
    return 'dev_eufemia_docs'
  }

  if (/^(alpha|beta|next)/.test(currentBranch)) {
    return 'beta_eufemia_docs'
  }

  return 'prod_eufemia_docs'
}

const runQueriesWhen = (currentBranch) => {
  if ((process.env.ALGOLIA_API_KEY || '').length === 0) {
    console.info(
      'If you want to submit searchable data to Algolia, you need to request access keys and put them in a local .env file.'
    )
    return false
  }

  if (global.isCI) {
    return /^(release|beta|portal)$/.test(currentBranch)
  }

  if (process.env.NODE_ENV === 'production') {
    return true
  }

  return false
}

exports.runQueriesWhen = runQueriesWhen
exports.getIndexName = getIndexName
