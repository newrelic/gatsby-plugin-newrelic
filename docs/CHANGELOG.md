## [1.0.1](https://github.com/newrelic/gatsby-plugin-newrelic/compare/v1.0.0...v1.0.1) (2020-10-23)


### Bug Fixes

* **Issue #16:** Update agent code to work with Gatsby script rendering ([c4702db](https://github.com/newrelic/gatsby-plugin-newrelic/commit/c4702db15f06f8e48b36f2a330712a0bf4043f9f)), closes [#16](https://github.com/newrelic/gatsby-plugin-newrelic/issues/16)

# 1.0.0 (2020-10-22)


### Bug Fixes

* javascript had a bad value in liteAgent causing issues ([8f27ec4](https://github.com/newrelic/gatsby-plugin-newrelic/commit/8f27ec456d5732970a16fb32d585b6c2d0c68cfd))
* main pointer ([80725cb](https://github.com/newrelic/gatsby-plugin-newrelic/commit/80725cb251af2b6f93746ce819fc90fad5583607))
* **release workflow:** Target correct branch ([f7b1dfc](https://github.com/newrelic/gatsby-plugin-newrelic/commit/f7b1dfc21abb96f688506c1f7d2ebcc288bd69c8))
* previously moved under /src ([6935cd3](https://github.com/newrelic/gatsby-plugin-newrelic/commit/6935cd368a7f75dd2a31b1b1abb12392b08cb57f))
* use a different env variable (GATSBY_NEWRELIC_ENV instead of NODE_ENV) for toggling configs ([5cd42e8](https://github.com/newrelic/gatsby-plugin-newrelic/commit/5cd42e832f0588764dc332ce7ebd05794de5106a))
* **release workflow:** Sometimes quotes matter ([3f35594](https://github.com/newrelic/gatsby-plugin-newrelic/commit/3f35594823739990dc5c9ea3d57a9bc92c19de63))
* **release-workflow:** Add npm token for semantic-release ([af0a31f](https://github.com/newrelic/gatsby-plugin-newrelic/commit/af0a31f9e2566bd048968c7d25aa46df504987b7))
* **release-workflow:** steps outputs are job-specific ([254c5e0](https://github.com/newrelic/gatsby-plugin-newrelic/commit/254c5e0962597cfc2c14fa969a503bf43646dbf2))
* **release-workflow:** Update semantic-release config to allow for npm publish from the `next` branch ([7036442](https://github.com/newrelic/gatsby-plugin-newrelic/commit/70364425a00e6db9f37d4e2ae4743fc386ee7700))
* **release-workflow:** Update set-output syntax ([0b6d5ff](https://github.com/newrelic/gatsby-plugin-newrelic/commit/0b6d5ff8283067c0211b978eee58d8e58a7a5556))
* **release-workflow:** Use `env` instead of `with` for variables ([3f2363a](https://github.com/newrelic/gatsby-plugin-newrelic/commit/3f2363a60568e0935224de0c31b60ab4310b7ab9))


### Features

* allow for different configs per environment ([6116b7a](https://github.com/newrelic/gatsby-plugin-newrelic/commit/6116b7a127d3a11dda203b9fcbf9d88640495f81))
* initial POC Newrelic Gatsby plugin ([7c9fb11](https://github.com/newrelic/gatsby-plugin-newrelic/commit/7c9fb11c9aaaa0245dfd346d44c2ad27023bab6f))
* Support general, non-env specific config ([23a033c](https://github.com/newrelic/gatsby-plugin-newrelic/commit/23a033c0c8846c872c9c75e5cd456f434991718f))


### Reverts

* previous changes to build process ([4d90c25](https://github.com/newrelic/gatsby-plugin-newrelic/commit/4d90c25f60d984242be8383622437429b9cf56ae)), closes [/github.com/gatsbyjs/gatsby/issues/20722#issuecomment-576449981](https://github.com//github.com/gatsbyjs/gatsby/issues/20722/issues/issuecomment-576449981)
