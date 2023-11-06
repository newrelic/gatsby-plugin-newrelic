import { Agent } from "@newrelic/browser-agent/loaders/agent";
import { Ajax } from '@newrelic/browser-agent/features/ajax';
import { JSErrors } from '@newrelic/browser-agent/features/jserrors';
import { Metrics } from '@newrelic/browser-agent/features/metrics';
import { PageAction } from '@newrelic/browser-agent/features/page_action';
import { PageViewEvent } from '@newrelic/browser-agent/features/page_view_event';
import { PageViewTiming } from '@newrelic/browser-agent/features/page_view_timing';
import { SessionReplay } from '@newrelic/browser-agent/features/session_replay/index'
import { SessionTrace } from '@newrelic/browser-agent/features/session_trace';
import { Spa } from '@newrelic/browser-agent/features/spa';

export const liteAgent = new Agent({
    features: [PageViewEvent, PageViewTiming, Metrics]
})

export const proAgent = new Agent({
    features: [Ajax, JSErrors, Metrics, PageAction, PageViewEvent, PageViewTiming, SessionReplay, SessionTrace]
})

export const proAndSpaAgent = new Agent({
    features: [Ajax, JSErrors, Metrics, PageAction, PageViewEvent, PageViewTiming, SessionReplay, SessionTrace, Spa]
})