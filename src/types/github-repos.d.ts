export interface GithubRepoBase {
  name: string
  description: string
  category: string
  repo_url: string
  owner: string
  repo_name: string
  twitter: string
  discord: string
  telegram: string
}

export interface GithubRepoRequest extends GithubRepoBase {}

export interface GithubRepoResponse extends GithubRepoBase {
  _id: string
}
