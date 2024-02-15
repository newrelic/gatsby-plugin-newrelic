import React from "react";
import { liteAgent, proAgent, proAndSpaAgent } from "../browser-agents/latest";

export default ({ setHeadComponents }, pluginOptions) => {
  const { configs: userConfigs, config: userConfig } = pluginOptions;

  const requiredConfig = {
    accountId: "",
    trustKey: "",
    agentID: "",
    licenseKey: "",
    applicationID: "",
    beacon: "bam.nr-data.net",
    errorBeacon: "bam.nr-data.net",
    instrumentationType: "lite", // Options are 'lite', 'pro', 'proAndSPA'
  };

  const env = process.env.GATSBY_NEWRELIC_ENV;

  const userEnvConfig = env ? userConfigs[env] : userConfig;
  if (!userEnvConfig) {
    console.warn(
      `gatsby-plugin-newrelic is missing the configuration${
        env ? ` for the ${env} environment` : ""
      }`
    );
    return;
  }

  if (env) {
    console.warn(
      "gatsby-plugin-newrelic has deprecated using GATSBY_NEWRELIC_ENV for multiple environments"
    );
  }

  const allowedInstrumentationTypes = ["lite", "pro", "proAndSPA"];
  const itExists = allowedInstrumentationTypes.find(
    (i) => i === userEnvConfig.instrumentationType
  );
  if (!itExists) {
    // TO DO - Error/Warn about wrong instrumentation type
  }

  const options = { ...requiredConfig, ...userEnvConfig };
  const instrumentationType = options.instrumentationType;

  const emptyOptions = Object.entries(options).filter(([, v]) => v === "");
  if (emptyOptions.length > 0) {
    // TO DO - Warn about missing options
  }

  // --- Possible Browser > Application Settings in the NR1 UI and their options ---
  const { settings } = options;

  // 'Distributed tracing'
  // not present in init string if not enabled
  let distributedTracingInitString = "";

  if (settings.distributed_tracing?.enabled) {
    const dt = settings.distributed_tracing;

    // Agent default settings if they are not provided
    const distributedTracingConfigObject = {
      enabled: dt.enabled ?? false,
      exclude_newrelic_header: dt.exclude_newrelic_header ?? undefined,
      cors_use_newrelic_header: dt.cors_use_newrelic_header ?? undefined,
      cors_use_tracecontext_headers:
        dt.cors_use_tracecontext_headers ?? undefined,
      allowed_origins: dt.allowed_origins
        ? `${JSON.stringify(dt.allowed_origins)}`
        : undefined,
    };

    let distributedTracingConfigString = "";

    for (const key in distributedTracingConfigObject) {
      distributedTracingConfigString = distributedTracingConfigString.concat(
        `${key}:${distributedTracingConfigObject[key]},`
      );
    }

    distributedTracingInitString = `distributed_tracing:{${distributedTracingConfigString}},`;
  }

  // 'Session Replay'
  // not present in init string if not enabled
  let sessionReplayInitString = "";

  if (settings.session_replay?.enabled) {
    const sr = settings.session_replay;
    let maskOptionsString = "";

    // if user selects custom privacy settings:

    // if 'mask_all_inputs' not set, defaults to true and sets these options to its own default values
    if (sr.mask_all_inputs !== true) {
      // if no options set and 'mask_all_inputs' = false, agent defaults all to 'false'
      const maskOptionsObject = {
        color: sr.mask_input_options?.color ?? false,
        date: sr.mask_input_options?.date ?? false,
        datetime_local: sr.mask_input_options?.datetime_local ?? false,
        email: sr.mask_input_options?.email ?? false,
        month: sr.mask_input_options?.month ?? false,
        number: sr.mask_input_options?.number ?? false,
        range: sr.mask_input_options?.range ?? false,
        search: sr.mask_input_options?.search ?? false,
        tel: sr.mask_input_options?.tel ?? false,
        text: sr.mask_input_options?.text ?? false,
        time: sr.mask_input_options?.time ?? false,
        url: sr.mask_input_options?.url ?? false,
        week: sr.mask_input_options?.week ?? false,
        text_area: sr.mask_input_options?.text_area ?? false,
        select: sr.mask_input_options?.select ?? false,
      };

      for (const key in maskOptionsObject) {
        maskOptionsString = maskOptionsString.concat(
          `${key}:${maskOptionsObject[key]},`
        );
      }
    }

    // Agent default settings if they are not provided
    const sessionReplayConfigObject = {
      enabled: `enabled:${sr.enabled ?? false}`,
      block_selector: `block_selector:'${sr.block_selector ?? ""}'`,
      mask_text_selector: `mask_text_selector:'${
        sr.mask_text_selector ?? "*"
      }'`,
      sampling_rate: `sampling_rate:${sr.sampling_rate ?? 50}`,
      error_sampling_rate: `error_sampling_rate:${
        sr.error_sampling_rate ?? 50
      }`,
      mask_all_inputs: `mask_all_inputs:${sr.mask_all_inputs ?? true}`,
      collect_fonts: `collect_fonts:${sr.collect_fonts ?? true}`,
      inline_images: `inline_images:${sr.inline_images ?? false}`,
      inline_stylesheet: `inline_stylesheet:${sr.inline_stylesheet ?? true}`,
      mask_input_options: `mask_input_options:{${maskOptionsString}}`,
    };

    let sessionReplayConfigString = "";

    for (const key in sessionReplayConfigObject) {
      sessionReplayConfigString = sessionReplayConfigString.concat(
        `${sessionReplayConfigObject[key]},`
      );
    }

    sessionReplayInitString = `session_replay:{${sessionReplayConfigString}},`;
  }

  // 'Browser Settings' - defaults to true
  const privacyInitString = `privacy:{cookies_enabled:${
    settings.privacy?.cookies_enabled ?? "true"
  }},`;

  // 'AJAX request deny list' - ajax:{deny_list:["bam-cell.nr-data.net"]} is default for prod accounts
  const ajaxInitString = `ajax:{deny_list:${JSON.stringify(
    settings.ajax?.deny_list ?? ["bam-cell.nr-data.net"]
  )}},`;

  const init = `;window.NREUM||(NREUM={});NREUM.init={${sessionReplayInitString}${distributedTracingInitString}${privacyInitString}${ajaxInitString}};`;

  let agent;
  if (instrumentationType === "lite") {
    agent = liteAgent;
  }

  if (instrumentationType === "pro") {
    agent = proAgent;
  }

  if (instrumentationType === "proAndSPA") {
    agent = proAndSpaAgent;
  }

  const configs = `
    ;NREUM.loader_config={accountID:"${options.accountId}",trustKey:"${options.trustKey}",agentID:"${options.agentID}",licenseKey:"${options.licenseKey}",applicationID:"${options.applicationID}"}
    ;NREUM.info={beacon:"${options.beacon}",errorBeacon:"${options.errorBeacon}",licenseKey:"${options.licenseKey}",applicationID:"${options.applicationID}",sa:1}
  `;

  if (agent && configs) {
    setHeadComponents([
      <script
        key="gatsby-plugin-newrelic"
        dangerouslySetInnerHTML={{
          __html: init + agent + configs,
        }}
      />,
    ]);
  }
};
