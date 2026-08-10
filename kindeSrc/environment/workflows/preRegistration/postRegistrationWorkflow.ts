import {
  onUserPostAuthenticationEvent,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "postAuthenticationTest",
  name: "Log post-auth URL params",
  failurePolicy: {
    action: "continue",
  },
  trigger: WorkflowTrigger.UserPostAuthentication,
  bindings: {
    console: {},
  },
};

export default async function onUserPostAuthentication(
  event: onUserPostAuthenticationEvent
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