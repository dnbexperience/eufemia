/**
 * For, we use our local version
 *
 */

import axios from 'axios'

const Client = opts => {
  const headers = opts.accessToken
    ? {
        Authorization: `Bearer ${opts.accessToken}`
      }
    : {
        'X-Figma-Token': opts.personalAccessToken
      }
  const client = axios.default.create({
    baseURL: `https://${opts.apiRoot || 'api.figma.com'}/v1/`,
    headers
  })
  return {
    client,
    file: (fileId, params = {}) =>
      client.get(`files/${fileId}`, { params }),
    fileImages: (fileId, params) =>
      client.get(`images/${fileId}`, {
        params: Object.assign({}, params, { ids: params.ids.join(',') })
      }),
    comments: fileId => client.get(`files/${fileId}/comments`),
    postComment: (fileId, params) =>
      client.post(`files/${fileId}/comments`, params),
    teamProjects: teamId => client.get(`teams/${teamId}/projects`),
    projectFiles: projectId => client.get(`projects/${projectId}/files`)
  }
}

export { Client }
