# Contributing

Contributions are always welcome. Before contributing please read the
[code of conduct](./CODE_OF_CONDUCT.md) and [search the issue tracker](issues); your issue may have already been discussed or fixed in `master`. To contribute,
[fork](https://help.github.com/articles/fork-a-repo/) this repository, commit your changes, and [send a Pull Request](https://help.github.com/articles/using-pull-requests/).

Note that our [code of conduct](./CODE_OF_CONDUCT.md) applies to all platforms and venues related to this project; please follow it in all your interactions with the project and its participants.

## Feature Requests

Feature requests should be submitted in the [Issue tracker](../../issues), with a description of the expected behavior & use case, where they’ll remain closed until sufficient interest, [e.g. :+1: reactions](https://help.github.com/articles/about-discussions-in-issues-and-pull-requests/), has been [shown by the community](../../issues?q=label%3A%22votes+needed%22+sort%3Areactions-%2B1-desc).
Before submitting an Issue, please search for similar ones in the
[closed issues](../../issues?q=is%3Aissue+is%3Aclosed+label%3Aenhancement).

## Pull Requests

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
3. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Publishing next versions to NPM

 A [Github workflow](https://github.com/newrelic/gatsby-plugin-newrelic/blob/main/.github/workflows/release.yml) which uses NPX [semantic-release](https://semantic-release.gitbook.io/semantic-release/usage/configuration#branches) exists to assist in publishing next versions of this plugin to NPM.

 > If you wish to publish a latest version to NPM follow these steps but ensure you change the tag in [package.json](package.json) to latest

 1. Make your changes on a local branch from main.
 2. After pulling down the code, run `git fetch && git pull` to ensure you have the latest code for main.
 3. Commit your changes and submit a PR to the `next` branch.
 4. Ensure that you [bump the version of the package](https://cloudfour.com/thinks/how-to-publish-an-updated-version-of-an-npm-package/#the-standard-release-process) by using semantic versioning using the `NPM version` command.
 5. This will kick off the workflow to publish a next version to NPM.
 6. Go to [NPM](https://www.npmjs.com/package/gatsby-plugin-newrelic) to view the next branch.

## Contributor License Agreement

Keep in mind that when you submit your Pull Request, you'll need to sign the CLA via the click-through using CLA-Assistant. If you'd like to execute our corporate CLA, or if you have any questions, please drop us an email at opensource@newrelic.com.

For more information about CLAs, please check out Alex Russell’s excellent post,
[“Why Do I Need to Sign This?”](https://infrequently.org/2008/06/why-do-i-need-to-sign-this/).

## Slack

We host a public Slack with a dedicated channel for contributors and maintainers of open source projects hosted by New Relic.  If you are contributing to this project, you're welcome to request access to the #oss-contributors channel in the newrelicusers.slack.com workspace.  To request access, see https://newrelicusers-signup.herokuapp.com/.
