import {
  onUserPreRegistrationEvent,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "preRegistration",
  name: "Log auth URL params on pre-registration",
  failurePolicy: {
    action: "continue",
  },
  trigger: WorkflowTrigger.UserPreRegistration,
  bindings: {
    console: {},
  },
};

export default async function onUserPreRegistration(
  event: onUserPreRegistrationEvent
) {
  console.log("authUrlParams:", JSON.stringify(event.request.authUrlParams));
}
