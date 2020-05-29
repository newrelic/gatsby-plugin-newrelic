[![Community Project header](https://github.com/newrelic/open-source-office/raw/master/examples/categories/images/Community_Project.png)](https://github.com/newrelic/open-source-office/blob/master/examples/categories/index.md#community-project)

# New Relic Gatsby Plugin

The New Relic Gatsby Plugin provides a simple to use configuration option for instrumenting your Gatsby site with [New Relic's Browser Agent](https://newrelic.com/products/browser-monitoring).

## Installation

1. If you don't already have a New Relic account, [sign-up for our free no credit-card trial/developer tier](https://newrelic.com/signup/?partner=Developer+Edition)
1. Go to [https://rpm.newrelic.com](https://rpm.newrelic.com)
1. Select the "Browser" product from the navigation
1. Click on "Add more" to add your website
1. Select "Copy/Paste Javascript code"
1. Under "Choose your instrumentation" select Lite, Pro, or Pro + SPA
1. Enter your app name
1. Click "Enable"
1. Copy the JS snippet into a text editor or scroll to the bottom for the config information needed for the this plugin
1. You'll need to copy information from a snippet like this:
  ```js
  ;NREUM.loader_config={accountID:"<your account id>",trustKey:"<some integer>",agentID:"<some integer>",licenseKey:"<your license key>",applicationID:"<some integer>"}
  ;NREUM.info={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",licenseKey:"<your license key>",applicationID:"<some integer>",sa:1}
  ```

  and turn it into a `gatsby-config` for this plugin that looks like:
  
  ```js
  {
    resolve: 'gatsby-plugin-newrelic',
    options: {
      instrumentationType: 'proAndSPA', // Options are 'lite', 'pro', 'proAndSPA'
      configs: {
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
1. Add this to your `gatsby-config.js` file for your project

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
[Project Name] is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.
>[If applicable: The [Project Name] also uses source code from third party libraries. Full details on which libraries are used and the terms under which they are licensed can be found in the third party notices document.]
