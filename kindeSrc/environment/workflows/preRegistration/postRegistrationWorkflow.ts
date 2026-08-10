import {
  onPostAuthenticationEvent,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "postAuthenticationTest",
  name: "Log post-auth URL params",
  failurePolicy: {
    action: "continue",
  },
  trigger: WorkflowTrigger.PostAuthentication,
  bindings: {
    console: {},
  },
};

export default async function onUserPostAuthentication(
  event: onPostAuthenticationEvent
) {
  console.log(
    "authUrlParams:",
    JSON.stringify(event.request.authUrlParams)
  );

  console.log(
    "event:",
    JSON.stringify(event)
  );
}