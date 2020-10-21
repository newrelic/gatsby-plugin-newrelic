[![Community Project header](https://github.com/newrelic/open-source-office/raw/master/examples/categories/images/Community_Project.png)](https://github.com/newrelic/open-source-office/blob/master/examples/categories/index.md#community-project)

# New Relic Gatsby Plugin
[![Known Vulnerabilities][3]][4]
[![npm status badge][1]][2]

The New Relic Gatsby Plugin provides a simple to use configuration option for instrumenting your Gatsby site with [New Relic's Browser Agent](https://newrelic.com/products/browser-monitoring).

## Installation

1. If you don't already have a New Relic account, [sign-up for our free forever tier - no credit-card required!](https://newrelic.com/signup)
1. Go to [https://rpm.newrelic.com](https://rpm.newrelic.com)
1. Select the "Browser" product from the navigation
1. Click on "Add more" to add your website
1. Select "Copy/Paste Javascript code" and copy the code
1. Under "Choose your instrumentation" select Lite, Pro, or Pro + SPA
1. Enter your app name
1. Click "Enable"
1. Paste the JS snippet provided into a text editor
1. Open your `gatsby-config.js` file for your project
1. You'll need to copy information from the JS snippet, which looks like this:

    ```js
    ;NREUM.loader_config={accountID:"<your account id>",trustKey:"<some integer>",agentID:"<some integer>",licenseKey:"<your license key>",applicationID:"<some integer>"}
    ;NREUM.info={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",licenseKey:"<your license key>",applicationID:"<some integer>",sa:1}
    ```

    and turn it into a `gatsby-config`, adding it to `gatsby-config.js` as a plugin

    ```js
    {
      resolve: 'gatsby-plugin-newrelic',
      options: {
        configs: {
          dev: {
            instrumentationType: 'proAndSPA',
            accountId: '<some integer>',
            trustKey: '<some integer>',
            agentID: '<some integer>',
            licenseKey: '<the license key>',
            applicationID: '<some integer>',
            beacon: 'bam.nr-data.net',
            errorBeacon: 'bam.nr-data.net'
          },
          staging: {
            instrumentationType: 'proAndSPA',
            accountId: '<some integer>',
            trustKey: '<some integer>',
            agentID: '<some integer>',
            licenseKey: '<the license key>',
            applicationID: '<some integer>',
            beacon: 'bam.nr-data.net',
            errorBeacon: 'bam.nr-data.net'
          },
          production: {
            instrumentationType: 'proAndSPA',
            accountId: '<some integer>',
            trustKey: '<some integer>',
            agentID: '<some integer>',
            licenseKey: '<the license key>',
            applicationID: '<some integer>',
            beacon: 'bam.nr-data.net',
            errorBeacon: 'bam.nr-data.net'
          }
        }
      }
    }
    ```

    If you have no need for multiple environments, you can simply pass a single object like:

    ```js
    {
      resolve: 'gatsby-plugin-newrelic',
      options: {
        configs: {
          instrumentationType: 'proAndSPA',
            accountId: '<some integer>',
            trustKey: '<some integer>',
            agentID: '<some integer>',
            licenseKey: '<the license key>',
            applicationID: '<some integer>',
            beacon: 'bam.nr-data.net',
            errorBeacon: 'bam.nr-data.net'
        }
      }
    }
    ```

    Note - `instrumentationType` can be `lite`, `pro`, `proAndSPA`, corresponding with levels of our browser agent.

1. Set the `GATSBY_NEWRELIC_ENV` to point at the appropriate config. For local dev you would add `GATSBY_NEWRELIC_ENV=dev` to the front of your "develop" script in your project's `package.json`. For "production" you would add `GATSBY_NEWRELIC_ENV=production` to the front of the Gatsby "build" command.
    Ex. `package.json`:

    ```js
      "scripts": {
        "build": "GATSBY_NEWRELIC_ENV=production gatsby build",
        "build:dev": "GATSBY_NEWRELIC_ENV=dev npm run build",
      }
    ```

## Getting Started

Navigate to [https://one.newrelic.com](https://one.newrelic.com), select the _Entity Explorer_ and then select your browser application to monitor metrics of your site.

## Support

New Relic hosts and moderates an online forum where customers can interact with New Relic employees as well as other customers to get help and share best practices. Like all official New Relic open source projects, there's a related Community topic in the New Relic Explorers Hub. You can find this project's topic/threads here:

>Add the url for the support thread here

## Contributing

Full details about how to contribute to
Contributions to improve [Project Name] are encouraged! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.
To execute our corporate CLA, which is required if your contribution is on behalf of a company, or if you have any questions, please drop us an email at opensource@newrelic.com.

## License

`gatsby-plugin-newrelic` is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License. `gatsby-plugin-newrelic` also uses source code from third party libraries. Full details on which libraries are used and the terms under which they are licensed can be found in the third party notices document.

[1]: https://nodei.co/npm/gatsby-plugin-newrelic.png
[2]: https://nodei.co/npm/gatsby-plugin-newrelic
[3]: https://snyk.io/test/github/newrelic/gatsby-plugin-newrelic/badge.svg?targetFile=package.json
[4]: https://snyk.io/test/github/newrelic/gatsby-plugin-newrelic?targetFile=package.json
