module.exports = {
  LOG_LEVEL: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') ? 'error' : 'debug',

  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || '',
  CONTENTFUL_CDA_TOKEN: process.env.CONTENTFUL_CDA_TOKEN || '',
  CONTENTFUL_CPA_TOKEN: process.env.CONTENTFUL_CPA_TOKEN || '',
  CONTENTFUL_MGR_TOKEN: process.env.CONTENTFUL_MGR_TOKEN || '',

  AWS_API_GATEWAY_NAME: process.env.AWS_API_GATEWAY_NAME || '',

  CONTENT_API_DEPLOYED_ENDPOINT: process.env.CONTENT_API_DEPLOYED_ENDPOINT || '',

  WEB_HOOK_USERNAME: process.env.WEB_HOOK_USERNAME || '',
  WEB_HOOK_PASSWORD: process.env.WEB_HOOK_PASSWORD || ''
}
